---
layout: post
title: "Visual Studio Unit Tests with NodeJS and TypeScript"
date: 2015-10-16 12:00:00 -0300
categories: code
tags:
  - node.js
  - typescript
  - unit-tests
---
Visual Studio has the magic window "Test Explorer" which discovers unit tests on your application and list them. It shows information about the tests.

[![img](https://brunolm.files.wordpress.com/2015/10/unittestnodejs.png)](https://brunolm.files.wordpress.com/2015/10/unittestnodejs.png)

It can be used on a NodeJS project.
<!--more-->

To do that, select the file which contains the tests on the solution explorer, click to view the file properties.

[![img](https://brunolm.files.wordpress.com/2015/10/testframework.png)](https://brunolm.files.wordpress.com/2015/10/testframework.png)

Enter a test framework (`ExportRunner` for example). If you are using ExportRunner then your tests will look like:

```js
export function Test1()
{
    throw "fail";
}

export function Test2() { }
export function Test3() { }
export function Test4() { }
export function Test5() { }
```

The test framework is automatically set if you create the file in Visual Studio selecting the right file type. You can also use other test frameworks, like Mocha.

Watch this video to see a complete example:
https://www.youtube.com/watch?v=8-U--ZUZB88
