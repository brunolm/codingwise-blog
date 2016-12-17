---
layout: post
title: "Design Patterns: Decorator"
date: 2015-06-18 12:00:00 -0300
categories: code
tags:
  - c#
  - decorator-pattern
  - design-patterns
---
The decorator design pattern comes in handy when we need to add behavior or state to an object during run-time. It allows you to change the behavior of a class at run-time without having to change the core code.

It can be used, for example, to add logging capabilities to an instance. It works by wrapping the original class in the decorator class, invoking the methods where applicable and invoking the custom behavior at the same time.
<!--more-->

I could have class with methods that counts how many times it has been called:

```csharp
public interface IDeveloper
{
    int TotalClasses { get; set; }
    int TotalMethods { get; set; }

    void CreateClass();

    void CreateMethod();
}

public class Developer : IDeveloper
{
    public int TotalClasses { get; set; }

    public int TotalMethods { get; set; }

    public void CreateClass()
    {
        TotalClasses++;
    }

    public void CreateMethod()
    {
        TotalMethods++;
    }
}
```

Then I could add an optinal behavior of loggin messages on the console.

```csharp
public class DeveloperDecorator : IDeveloper
{
    private IDeveloper developer;

    public DeveloperDecorator(IDeveloper developer)
    {
        this.developer = developer;
    }

    public int TotalClasses
    {
        get
        {
            return this.developer.TotalClasses;
        }

        set
        {
            this.developer.TotalClasses = value;
        }
    }

    public int TotalMethods
    {
        get
        {
            return this.developer.TotalMethods;
        }

        set
        {
            this.developer.TotalMethods = value;
        }
    }

    public void CreateClass()
    {
        Console.WriteLine("Creating a class");
        developer.CreateClass();
    }

    public void CreateMethod()
    {
        Console.WriteLine("Creating a method");
        developer.CreateMethod();
    }
}
```

Without changing the main class.

```csharp
var dev = new DeveloperDecorator(new Developer());

dev.CreateClass();
dev.CreateMethod();
```

If we are developing a game it could be used to handle item upgrades. In the following example there is a simple Sword. From this simple item we can upgrade it and add more damage to it.

```csharp
public interface IWeapon
{
    int Damage { get; }
}

public class Sword : IWeapon
{
    public int Damage
    {
        get
        {
            return 10;
        }
    }
}
```

We now have a simple sword. To add the decorator pattern we need to create the upgrades. The decorator class will take the weapon and increment its values.

```csharp
// Decorator
public abstract class WeaponUpgrade : IWeapon
{
    protected IWeapon weapon;

    public WeaponUpgrade(IWeapon weapon)
    {
        this.weapon = weapon;
    }

    public virtual int Damage
    {
        get
        {
            return this.weapon.Damage;
        }
    }
}


public class SteelSwordDecorator : WeaponUpgrade
{
    public SteelSwordDecorator(IWeapon weapon)
        : base(weapon)
    {

    }

    // 100 damage from Steel + original weapon damage
    public override int Damage
    {
        get
        {
            return 100 + base.Damage;
        }
    }
}
```

To use this structure we just need to instantiate a decorator class and "put on top off" our previous class:

```csharp
// sword.Damage = 10
IWeapon sword = new Sword();

// sword.Damage = 110
sword = new SteelSwordDecorator(sword);

// sword.Damage = 210
sword = new SteelSwordDecorator(sword);
```

We of course could have multiple different types of decorators (diamond sword, flame sword, and so on).

One example in Starcraft is the weapon upgrades, John Lindquist explains about it in a pattern craft video: https://youtu.be/17XTOODeWQE
