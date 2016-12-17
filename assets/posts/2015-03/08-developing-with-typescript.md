---
layout: post
title: "Developing with TypeScript"
date: 2015-03-08 12:00:00 -0300
categories: code
tags:
  - javascript
  - typescript
---
[TypeScript](http://www.typescriptlang.org/) is a programming language that is compiled to Javascript. It works on anything, so you can use it on any project.
<blockquote>TypeScript lets you write JavaScript the way you really want to.
TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
Any browser. Any host. Any OS. Open Source.</blockquote>
<!--more-->

TypeScript is built in TypeScript which compiles to Javascript code that compiles TypeScript to Javascript.

![img](http://images4.fanpop.com/image/photos/17900000/Leonardo-DiCaprio-as-Dom-Cobb-in-Inception-leonardo-dicaprio-17976642-1364-768.jpg)

TypeScript brings lots of advantages. With the typed system it is impossible to make mistakes sending wrong types. By being a typed language it allows IDEs to add powerful auto-completion, reference finding, refactoring mechanisms.

In TypeScript you can easily define interfaces, classes, enums, namespaces... You can use types, generics...

```
class Foo
{
    Bar<T>(something: T): T
    {
        return something;
    }
}

interface IEntity
{
    Name: string;
}

var foo = new Foo();

var e: IEntity;
var n: number = 0;

n = foo.Bar(10);
e = foo.Bar({ Name: "Bruno Michels" });

alert(n);
alert(e.Name);
```

Generates:

```
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.Bar = function (something) {
        return something;
    };
    return Foo;
})();
var foo = new Foo();
var e;
var n = 0;
n = foo.Bar(10);
e = foo.Bar({ Name: "Bruno Michels" });
alert(n);
alert(e.Name);
```

For more check the links at the end of the post.

### Who uses TypeScript today?


  - Azure
  - XBox Music (over half million lines of code)
  - Bing
  - Adobe
  - Starling JS
  - turbulenz
  - HeliosJS
  - zud.io


TypeScript was introduced late on XBox Music development. They already had a large code base. So you can too, it is never too late to start using TypeScript.

And the newest one, [Angular2 is going to use TypeScript](http://blogs.msdn.com/b/typescript/archive/2015/03/05/angular-2-0-built-on-typescript.aspx).

## See also

[TypeScript Playground](http://www.typescriptlang.org/Playground/#tut=ex5)
[TypeScript Samples](http://www.typescriptlang.org/Samples)
[TypeScript Specification](http://www.typescriptlang.org/Content/TypeScript%20Language%20Specification.pdf)
[TypeScript source code](https://github.com/Microsoft/TypeScript)
