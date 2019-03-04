---
title: Computed properties in Javascript objects
date: 2019-03-02 19:27:32
description: Objects and properties dependent on each other
category: Javascript
tags: [Javascript]
draft: true
---

I know there are some libraries to compute properties value of Javascript
objects. But I didn't find a good one.

The following code is merely demonstrative but it's based on a real case.

Let's say I have a main object containing all the data. There are products and
relations between them.

```js{24-44}
let db = [
  {
    id: 'product1',
    name: 'Product 1',
    cost: {
      value: 5,
      quantity: {
        value: 1,
        unit: 'kg',
      },
    },
  },
  {
    id: 'product2',
    name: 'Product 2',
    cost: {
      value: 10,
      quantity: {
        value: 500,
        unit: 'g',
      },
    },
  },
  {
    id: 'product3',
    name: 'Product 3',
    cost: 0, // dependent
    composition: [
      {
        of: 'product1',
        quantity: {
          value: 2000,
          unit: 'g',
        },
      },
      {
        of: 'product2',
        quantity: {
          value: 0.250,
          unit: 'kg',
        },
      },
    ],
  },
];

```

That's a basic structure. It could be in a database.

How could **product3** cost be calculated? **product3** is composed of
**product1** and **product2**. The property *cost* of **product3** is a computed
property, it depends on other values.


The dependency is indicated through the property `composition`. That means that
**product3** is composed of `2000 g` of **product1** and `0.250 kg` of
**product2**, so its cost will depend on these quantities. I added quantities
and units to make this more interesting.

## First step

```js
const findProductById = id => db.find(item => item.id === id);

const units = {
  kg: 1000,
  g: 1,
  mg: 0.001
  u: 1, // dimensionless unit
}

const normalize = (value, unitName) => value * units[unitName];

const calculateCost = (quantity, cost) => {
  // normalized quantity value
  const nQuantityValue = normalize(
    quantity.value, 
    quantity.unit
  );
  // normalized cost quantity value
  const nCostQuantityValue = normalize(
    cost.quantity.value,
    cost.quantity.unit
  );
  
  return nQuantityValue * (cost.value / nCostQuantityValue);
}

const calculateCosts = () =>
  db.map(product => {    
    if (!product.composition) {
      return product;
    }
    
    const costValue = product.composition
      .reduce((cost, comp) => {
        const prodComposition = findProductById(comp.of);
        return cost + calculateCost(comp.quantity, prodComposition.cost);
      }, 0);
    
    return {
      ...product,
      cost: {
        value: costValue,
        quantity: {
          value: 1,
          unit: 'u',
        },
      },
    };
  });

console.log("Cost should be:", 2000 * (5 / 1000) + (250 * (10 / 500)));

const mappedDb = calculateCosts();
console.log(JSON.stringify(mappedDb, null, 2));
```

*See it in [action](https://jsbin.com/gazufad/4/edit?js,console).*

### Units, normalization and cost calculation

The following explanation is only to understand the *normalization* and the
basic mathematics behind cost calculation. You can skip this part.

`units` is just an object containing all the units and their equivalences. Each
unit has a *multiplier*, its purpose is to normalize it. To calculate the
cost using quantities it's necessary to convert all the involved units to the
base unit (gram, meter, liter) whose value is 1. For example, *2.5 kg* is
normalized to *2500 g*.

In our code we have **product3** composed of:
```
2000 [g] (product1) => 2000 * 1 [g] = 2000 [g]
0.250 [kg] (product2) => 0.250 * 1000 [g] = 250 [g]
```

1000 is the corresponding multiplier to convert kilograms into grams.

Now using [rule of three](https://www.smartickmethod.com/blog/math/rule-of-3/)
we can calculate the cost with:

```
cost = composition_quantity * (cost / cost_quantity)
total_cost = 2000 [g] * ($5 / 1000 [g]) + 250 [g] * ($10 / 500 [g]) = $15
```

Our function `calculateCosts` is responsible for iterating over the product list
and calculating the costs of those who have *compositions*.

## Watching for changes

Here comes the interesting part...

We have some options to solve the cost calculation problem. The first one and
the least optimal is to calculate it each time changes are made on any product.
But it includes simple changes on any property such as the `name`.

```javascript
const updateProduct = (productId, newData ) => (
  return db.map(product => {
    if (product.id !== productId) {
      return product;
    }
    
    return {
      ...product,
      ...newData,
    };
  });
);

db = updateProduct('product1', {
  cost: { 
    value: 8, 
    quantity: {
      value: 1.2,
      unit: 'kg',
    },
  },
});

// recalculate cost
db = calculateCosts()
```

Let's use a *flag* to indicate when a cost has changed:

```javascript{9-11,30-33}
let costChanged = false;

const updateProduct = (productId, newData ) => (
  return db.map(product => {
    if (product.id !== productId) {
      return product;
    }
    
    if (newData.cost) {
      costChanged = true;
    }
    
    return {
      ...product,
      ...newData,
    };
  });
);

db = updateProduct('product1', {
  cost: { 
    value: 8, 
    quantity: {
      value: 1.2,
      unit: 'kg',
    },
  },
});

if (costChanged) {
  db = calculateCosts();
  costChanged = false;
}
```

So cost is recalculated only when `cost` property has changed. But this still
has a problem: if `db` stores many composite products and I changed a cost from
a product used only in one composite product (as *product1* in *product3*), why
would all other costs need to be recalculated?

The first thing that comes to my mind is that product compositions can be
complex, that is, a product composed of another composite product.

Suppose we have the following structure:

- **product3**: cost $15
  - product1: x 2000 g *(has own cost)*
  - product2: x 250 g *(has own cost)*
- **product4**: cost $35
  - product2: x 250 g
  - product3: x 2 u
- **product5**: cost $77.5
  - product3: x 0.5 u
  - product4: x 2 u

**product1** and **product2** have a defined cost. The others require computing
the cost. The order of calculations should be product3, product4 and after all
product5. Here we start to complicate things with the dependencies.

Our example is no longer useful. Sorry.

### Getters and setters to the rescue

We have to focus on the moment the cost is modified. Each time that property is
changed we are going to trigger a new calculation but only in involved products,
optimizing the process.

Old options are
[Object.watch](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/watch)
and
[Object.observe](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/observe)
to trigger actions when an object property is changed. But let them die in
peace. We can craft our own tools!

Let's play with [getters and
setters](https://www.w3schools.com/js/js_object_accessors.asp):

```javascript
const obj = {
  _cost: { // private
    value: 5,
    quantity: {
      value: 1,
      unit: 'kg',
    },
  },
  get cost() { // getter
    return this._cost;
  },
  set cost(value) { //setter
    console.log(`New value: $${value.value} x ${value.quantity.value} ${value.quantity.unit}`);
    this._cost = value;
  },
};
```

*[Run](https://jsbin.com/vupajif/edit?js,console) in jsbin*

That's right, we can call functions when accessing or modifying a property
value. We can even define these getters and setters after the object creation.

```javascript
Object.defineProperty(
  obj, // target
  'cost',
  {
    enumerable: true,
    configurable: true,
    get cost() {
      return this._cost;
    },
    set cost(value) {
      this._cost =  value
    },
  }
);
```

[Object.\_\_defineGetter\_\_](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/__defineGetter__)
is another old option. Don't use it!

Now we are ready to *trigger* calculations in a fancier way. First, let's create
a factory function.

```javascript
const newProduct = ({ cost, ...data }) => ({
  ...data,
  _cost: cost,
  get cost() {
    return this._cost;
  },
  set cost(value) {
    console.log('value', value);
    this._cost = value;
  },                            
});

let db = [
  // ...
  newProduct({
    id: 'product3',
    name: 'Product 3',
    cost: null, // dependent
    composition: [
      {
        of: 'product1',
        quantity: {
          value: 2000,
          unit: 'g',
        },
      },
      {
        of: 'product2',
        quantity: {
          value: 0.250,
          unit: 'kg',
        },
      },
    ],
  }),
  // ...
];
```

In this way it's easier to create objects with predefined getters and setters.
And our `calculateCosts` looks like:

```javascript{22-32}
const calculateCosts = db =>
  db.map(product => {    
    if (!product.composition) {
      return product;
    }
    
    const costValue = product.composition
      .reduce((cost, comp) => {
        const prodComposition = findProductById(comp.of);
        return cost + calculateCost(comp.quantity, prodComposition.cost);
      }, 0);
    
    product.cost = {
      value: costValue,
      quantity: {
        value: 1,
        unit: 'u',
      },
    };
    
    
    // Be careful!
    // product = {
    //   ...product,
    //   cost: {
    //     value: costValue,
    //     quantity: {
    //       value: 1,
    //       unit: 'u',
    //     },
    //   },
    // };
    
    return product;
  });
```

Be careful! To call the setter it's necessary to assign the property directly
through the dot (`product.cost = ...`). In the previous example we created a new
product object merging its properties and the new `cost`, but this would
overwrite the setter and we would lose the possibility of executing custom
functions. You know, it's mandatory to keep the same instance of the object.

Another problem is accessing sub-properties: `product1.cost.value = 10`, because
this won't activate the *setter*.

Maybe we could create another function to update the object safely. But...
better [KISS](https://en.wikipedia.org/wiki/KISS_principle) it for the moment.

It's time to decide where we are going to calculate the costs: in the *getter*
or in the *setter*. Reading is more frequent than writing. Also we don't want to
be calculating the value every time we access the property because with many
products it can become very heavy.

The strategy is simple: activate *set cost()* setting a new value, find the
dependent products and recalculate their costs. First of all let's code a
function to calculate costs by product id.

**product4** and **product5** have been added
[here](https://jsbin.com/nucazal/edit?js,console).

```javascript

```
