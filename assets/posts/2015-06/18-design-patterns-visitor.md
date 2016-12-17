---
layout: post
title: "Design Patterns: Visitor"
date: 2015-06-18 12:00:00 -0300
categories: code
tags:
  - c#
  - design-patterns
  - visitor-pattern
---
The visitor design pattern can be used when you need to perform an action on the object but the logic isnt semantically correct to be placed in that object. So we can have an external object "visit" that instance and call an action to be performed.

In games we could use this pattern on attacks. In the game Breath of Fire IV, for example, there are many different types of attacks and different types of creatures. One might recover life instead of taking damage depending on the type of attack. The logic to determine what happens after an attack happen can be isolated on a visitor.
<!--more-->

To accomplish that we will need the visitor. The visitor declares a method that requires an object which it is going to visit. In this example I made one visitor that can access `Unit`s.

```csharp
public interface IVisitor<T> where T: Unit
{
    void Visit(T unit);
}

public class GigaFlare : IVisitor<Unit>
{
    public int Damage { get; private set; }

    public GigaFlare()
    {
        Damage = 100;
    }

    // when we access the unit it will perform action on
    // the instance that accepts the visit
    public void Visit(Unit unit)
    {
        if (unit.AbsorbsFire)
        {
            unit.HealthPoints += Damage;
        }
        else
        {
            unit.HealthPoints -= Damage - unit.DefensePoints;
        }
    }
}
```

And we also need the Unit. The unit has an method that accepts the visitor and allows the visitor to visit the instance accepting it.

```csharp


public abstract class Unit
{
    public int HealthPoints { get; set; }

    public int DefensePoints { get; set; }

    public bool AbsorbsFire { get; set; }

    // when we accept the instance being visited
    // is sent to the visitor to perform changes
    public void Accept(IVisitor<Unit> visitor)
    {
        visitor.Visit(this);
    }
}

public class Goo : Unit
{
    public Goo()
    {
        HealthPoints = 100;
        DefensePoints = 50;
    }
}

public class FireGoo : Goo
{
    public FireGoo()
    {
        AbsorbsFire = true;
    }
}
```

In short what is happening is:

```csharp
var goo = new Goo();
var fgoo = new FireGoo();

var gigaFlare = new GigaFlare();

goo.Accept(gigaFlare);
fgoo.Accept(gigaFlare);
```

The result will be:

```
50   // Goo had 50 def and took half the damage
200  // FireGoo could absorb fire so it doubled its health
```

Another example, similar to this one, is on Starcraft where a siege tank does different amounts of damage to different units. The projectile visit units and handles damage appropriately. A Pattern Craft video from John Lindquist demonstrates it: http://youtu.be/KSEyIXnknoY

