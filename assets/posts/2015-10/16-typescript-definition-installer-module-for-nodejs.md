---
layout: post
title: "TypeScript definition installer module for NodeJS"
date: 2015-10-16 12:00:00 -0300
categories: code
tags:
  - node.js
  - typescript
---
When developing a NodeJS application in TypeScript you need the definition files for the modules you are going to use. To make it easier to download them there is a module you can install called tsd.

To install tsd:

```npm i -g tsd```
<!--more-->

With `tsd` you can type:

```tsd install express```

The above will create folders and a file in your project:

```
typings
|- express
   |- express.d.ts
```

You can watch how to do it here:
https://www.youtube.com/watch?v=FDW1UyyXVuM
