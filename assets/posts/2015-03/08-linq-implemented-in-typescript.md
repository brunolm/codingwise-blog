---
layout: post
title: "Linq implemented in TypeScript"
date: 2015-03-08 12:00:00 -0300
categories: code
tags:
  - linq
  - typescript
---
[Linq, the powerful system introduced on .NET 3.5](https://brunolm.wordpress.com/2015/03/08/the-power-of-linq/) is a set of methods that allows you to manipulate collections and data.

I brought [those methods to TypeScript, the source code is on my Github](https://github.com/brunolm/TSLinq).
<!--more-->

[![img](https://brunolm.files.wordpress.com/2015/03/2015-06-08-06-06-32-819.png)](https://brunolm.files.wordpress.com/2015/03/2015-06-08-06-06-32-819.png)

The syntax is quite similar and the usage is essentially the same.

```
var three = [1, 2, 3].AsLinq().FirstOrDefault(o => o == 3);
```

I also created a [Visual Studio Extension to enable TypeScript in Unit Tests](https://visualstudiogallery.msdn.microsoft.com/34b2cc77-971a-4226-8f93-54518a7917ae).
