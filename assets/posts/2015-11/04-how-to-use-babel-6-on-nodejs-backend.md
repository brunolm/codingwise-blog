---
layout: post
title: "How to use Babel 6 on NodeJS backend"
date: 2015-11-04 12:00:00 -0300
categories: code
tags:
  - babel
  - node.js
---
[Babel](https://babeljs.io/) supports future versions of Javascript and compile it to currently supported versions of Javascript. Very similar to [TypeScript](http://www.typescriptlang.org/).

To use Babel 6 on your project:
<!--more-->

```js
npm install babel-core --save-dev
npm install babel-preset-es2015 --save-dev
```

And then on your start file:

```js
require("babel-core/register");
```

From this line all further requires are going to be compiled with Babel.

You also need to tell Babel what preset to use. On the root create a file `.babelrc` and configure like this:

```js
{
    presets: [ "es2015" ]
}
```

Done. Now you can use es6 on your modules.
