---
layout: post
title: "Design Patterns: Composite"
date: 2015-07-08 12:00:00 -0300
categories: code
tags:
  - c#
  - composite-pattern
  - design-patterns
---
The composite design pattern consist in allowing the software execute an operation in a collection of primitive and composite objects. The easiest example to think of is a file system, you can have a directory and it may have more directories and also files on them...
<!--more-->

One example of a Composite pattern structure would be:

[![img](https://brunolm.files.wordpress.com/2015/07/2015-48-08-10-48-55-314.png)](https://brunolm.files.wordpress.com/2015/07/2015-48-08-10-48-55-314.png)

The following code prints elements on the screen in a hierarchical format without having to worry about the type of the object (ex: you could print directory and file names without worrying if the object is a directory or a file).

```csharp
public interface Component
{
    void DoStuff(int indent);
}

public class Item : Component
{
    public string Name { get; set; }

    public void DoStuff(int indent)
    {
        Console.Write(new String( , indent));
        Console.WriteLine(Name);
    }
}

public class Composite : Component
{
    public Composite()
    {
        Components = new List<Component>();
    }

    public IList<Component> Components { get; set; }

    public void DoStuff(int indent)
    {
        Console.Write(new String( , indent));
        Console.WriteLine("<Group>");
        foreach (var component in Components)
        {
            component.DoStuff(indent + 2);
        }
    }
}
```

Results in:

```
<Group>
  First
  Second
  <Group>
    Third
    <Group>
      Fourth
```

In games it could be used to generate a skill tree or used to calculate some sort of composite attack. I found one example of it being [used in the attributes system of a RPG game](http://gamedevelopment.tutsplus.com/tutorials/using-the-composite-design-pattern-for-an-rpg-attributes-system--gamedev-243).
