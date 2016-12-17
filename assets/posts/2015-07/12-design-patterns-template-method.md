---
layout: post
title: "Design Patterns: Template Method"
date: 2015-07-12 12:00:00 -0300
categories: code
tags:
  - c#
  - design-patterns
  - template-pattern
---
This method consist in having a Template for your classes. It solves the problem of having multiple classes with duplicated code. Instead we can just create an abstract class and make our classes inherit from it. This way we can implement the common functionality in the parent class and have other classes inherit the unique behavior from a unique place.
<!--more-->

Abstract classes can also declare abstract methods meaning that classes inheriting have to implement that method and virtual methods which are available to be overridden in the derived classes.

An example of this pattern could be something like:

```csharp
public abstract class Character
{
    public string Name { get; set; }

    public int HealthPoints { get; set; }

    public int EnergyPoints { get; set; }

    public string Speak()
    {
        return Name;
    }

    public abstract void Evolve();
}

public class Pikachu : Character
{
    public override void Evolve()
    {
            
    }
}

public class Charmander : Character
{
    public override void Evolve()
    {
            
    }
}
```

Most characters could have the exact same behavior on the Speak method, so instead of duplicating all the logic it is implemented in a single place, the template class. It also declares an abstract method Evolve that all characters must implement this. The logic for this method will be unique for each inheriting class.
