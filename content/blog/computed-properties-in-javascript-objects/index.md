---
title: Computed properties in Javascript objects
date: 2019-03-02 19:27:32
description: Objects and properties dependent on each each other
category: Javascript
tags: [Javascript]
draft: true
---

I know there are some libraries to compute properties value of Javascript
objects. But I didn't find a good one.

Let's say I have a main object containing all the data.

```js{24-44}
const db = [
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

That's a basic structure. I could have it in a database.

How could **product3** cost be calculated? **product3** is composed of
**product1** and **product2**. The property *cost* of **product3** is a computed
property, it depends on others.


The dependency is indicated through the property `composition`. That means that
**product3** is composed of `2000 g` of **product1** and `0.250 kg` of
**product2**, so its cost will depend on these quantities. I added quantities
and units to make this more interesting.

# First step

```js
const findProductById = id => db.find(item => item.id === id);

const units = {
  kg: 1000,
  g: 1,
}

const normalize = (value, unitName) => value * units[unitName];

const calculateCost = (quantity, cost) => {
  // normalized quantity value
  const nQuantityValue = normalize(quantity.value, quantity.unit);
  // normalized cost quantity value
  const nCostQuantityValue = normalize(cost.quantity.value, cost.quantity.unit);
  
  return nQuantityValue * (cost.value / nCostQuantityValue);
}

const calculateCosts = db =>
  db.map(product => {    
    if (!product.composition) {
      return product;
    }
    
    const cost = product.composition
      .reduce((cost, comp) => {
        const prodComposition = findProductById(comp.of);
        return cost + calculateCost(comp.quantity, prodComposition.cost);
      }, 0);
    
    return {
      ...product,
      cost
    };
  });

console.log("Cost should be:", 2000 * (5 / 1000) + (250 * (10 / 500)));

const mappedDb = calculateCosts(db);
console.log(JSON.stringify(mappedDb, null, 2));
```

*See it in [action](https://jsbin.com/gazufad/1/edit?js,console).*
