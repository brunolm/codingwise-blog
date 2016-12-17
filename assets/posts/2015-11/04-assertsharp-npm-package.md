---
layout: post
title: "AssertSharp npm package"
date: 2015-11-04 12:00:00 -0300
categories: code
tags:
  - assertsharp
  - javascript
  - npm
  - typescript
---
[AssertSharp](https://www.npmjs.com/package/assertsharp) is a .NET like Assert class that you can use on your unit tests.

```js
npm install assertsharp --save-dev
```
<!--more-->

When the assertion fails it throws a `new Error`.

A TypeScript definition for this class is:

```js
declare module "assertsharp" {
    export default class Assert {
        static AreEqual<T>(expected: T, actual: T, message?: string): void;
        static AreNotEqual<T>(notExpected: T, actual: T, message?: string): void;
        static AreNotSame<T>(notExpected: T, actual: T, message?: string): void;
        static AreSequenceEqual<T>(expected: T[], actual: T[], equals?: (x, y) => boolean, message?: string): void;
        static Fail(message?: string): void;
        static IsFalse(actual: boolean, message?: string): void;
        static IsInstanceOfType(actual: any, expectedType: Function, message?: string): void;
        static IsNotInstanceOfType(actual: any, wrongType: Function, message?: string): void;
        static IsNotNull(actual: any, message?: string): void;
        static IsNull(actual: any, message?: string): void;
        static IsTrue(actual: boolean, message?: string): void;
        static Throws(fn: () => void, message?: string): void;
    }
}
```
