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
```js
const db = {
  product1: {
    name: 'Product 1',
    cost: {
      value: 5,
      quantity: {
        value: 1,
        unit: 'kg',
      },
    },
  },
  product2: {
    name: 'Product 2',
    cost: {
      value: 10,
      quantity: {
        value: 500,
        unit: 'g',
      },
    },
  },
};
```

That's a basic structure. I could have it in a database.

How could I add another product whose cost depends on the cost of the other two?
**product3** would be composed of **product1** and **product2**. The property
*cost* of **product3** is a computed property, it depends on others.

```js{22-42}
const db = {
  product1: {
    name: 'Product 1',
    cost: {
      value: 5,
      quantity: {
        value: 1,
        unit: 'kg',
      },
    },
  },
  product2: {
    name: 'Product 2',
    cost: {
      value: 10,
      quantity: {
        value: 500,
        unit: 'g',
      },
    },
  },
  product3: {
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
};
```

The dependency is indicated through the property `composition`. That means that
**product3** is composed of `2000 g` of **product1** and `0.250 kg` of
**product2**, so its cost will depend on these quantities. I added quantities
and units to make this more interesting.

# First step

asd
