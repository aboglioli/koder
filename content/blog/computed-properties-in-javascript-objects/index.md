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

The following code is merely demonstrative but it's based on a real case. And
I'm crafting a new library while I write this post.

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

-----

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

-----

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

Previous example is no longer useful. Sorry.

### Getters and setters to the rescue

We have to focus on the moment the cost is modified. Each time that property is
changed we are going to trigger a new calculation but only in involved products,
optimizing the process.

Old options are
[Object.watch](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/watch)
and
[Object.observe](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/observe)
to trigger actions when an object property is changed. We have
[Object.\_\_defineGetter\_\_](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/__defineGetter__)
too. But let them die in peace. We can craft our own tools!

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
through the dot notation (`product.cost = ...`). In the previous example we
created a new product object merging its properties and the new `cost` using the
[spread
operator](https://zendev.com/2018/05/09/understanding-spread-operator-in-javascript.html),
but this would overwrite the setter and we would lose the possibility of
executing custom functions. You know, it's mandatory to keep the same instance
of the object or [clone](https://stackoverflow.com/a/34481052/7388853) the
object properly.

Another problem is accessing sub-properties: `product1.cost.value = 10`, because
this won't activate the *setter*. We aren't alone in
[this](https://stackoverflow.com/a/25342668/7388853).

Maybe we could create another function to update the object safely. But...
better [KISS](https://en.wikipedia.org/wiki/KISS_principle) it for the moment.

It's time to decide where we are going to calculate the costs: in the *getter*
or in the *setter*. Reading is more frequent than writing. Also we don't want to
be calculating the value every time we access the property because with many
products it can become very heavy. So I lied to you because **computed
properties** are processed at the moment they are accessed (reading). Here we
are looking for a more complex solution. [Take a
look](https://vuejs.org/v2/guide/computed.html) at VueJS support for computed
properties.

The strategy is simple: activate `set cost()` by setting a new value, find the
dependent products and recalculate their costs, and repeat. First of all let's
code a function to calculate costs and other future properties.

**product4** and **product5** have been added
[here](https://jsbin.com/nucazal/edit?js,console). There you can see the
complete example.

```javascript
const newProduct = ({ cost, ...data }) => ({
  ...data,
  _cost: cost,
  get cost() {
    return this._cost;
  },
  set cost(value) {
    this._cost = value; // it's important to set the value first
  
    // Find dependent products and update their costs
    db.filter(
      item => item.composition &&
        item.composition.some(comp => comp.of === this.id)
    ).forEach(product => updateProduct(product));
  },                            
});

const updateProduct = product => {
  if (!product.composition) {
    return product;
  }
  
  const costValue = product.composition
    .map(comp => ({
      comp,
      prodComposition: findProductById(comp.of)
    }))
    .reduce((cost, { comp, prodComposition }) =>
      cost + calculateCost(comp.quantity, prodComposition.cost),
      0,
    );
  
  // Trigger calculation of products dependent on this
  product.cost = {
    value: costValue,
    quantity: {
      value: 1,
      unit: 'u',
    },
  };
  
  return product;
}
```

Setting cost on **product1**:

```javascript
const product1 = db[0];
product1.cost = {
  value: 10,
  quantity: {
    value: 1,
    unit: 'kg',
  },
};
```

That will activate the entire chain of updates.

```
// => means "update"
product1 => product3
product3 => product4 & product5
product4 => product5
```

Do you see the new problem? **product5** cost is calculated twice. It can be
avoided by caching or making a list of products to be updated (without
repetitions) before updating. At least we don't need to update all the products,
it's an advance.

### [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy): the fanciest way

Let's make the previous example useless. We have to automate the process.

> The Proxy object is used to define custom behavior for fundamental operations
> (e.g. property lookup, assignment, enumeration, function invocation, etc).

**Proxy** is a new feature in Javascript. It allows us to wrap an object to
modify its behavior.

> Proxy is an object in javascript which wraps an object or a function and
> monitors it via something called target. Irrespective of the wrapped object or
> function existence. Proxy are similar to meta programming in other languages.

There are three key terms we have to understand:

- **handler**: placeholder object which contains traps. Functions that do
  something on Object or Function that is proxied.
- **traps**: the methods that provide property access.
- **target**: object which the proxy virtualizes. It is often used as storage
  backend for the proxy. Invariants (semantics that remain unchanged) regarding
  object non-extensibility or non-configurable properties are verified against
  the target.
  
![What?](https://media.giphy.com/media/glmRyiSI3v5E4/giphy.gif)

[Here](http://exploringjs.com/es6/ch_proxies.html#sec_proxy-use-cases) are some
use cases. An example for you, my dear reader:

```javascript
const obj = {
  message: 'This is the example, my dear reader',
};

const handler = {
  get: (target, key) => {
    console.log(`Reading property ${key}`); // key === 'message'
    return target[key];
  },
  set: (target, key, value) => {
    console.log(`Writing property ${key}`); // key === 'message'
    target[key] = value;
    return true;
  },
};

const pObj = new Proxy(obj, handler);

console.log(pObj.message);
```

Can you see the possibilities? Proxy allows us to intercept any call or
interaction with the object (*target*).

So do you think it is similar to the previous example using *getters* and
*setters*? I'll save you the efforts of searching: [differences between
getters/setters and
Proxy](https://forum.kirupa.com/t/es6-proxy-vs-getters-setters/638547).

## Rising a new library

asd
