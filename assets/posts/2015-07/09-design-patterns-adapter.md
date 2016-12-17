---
layout: post
title: "Design Patterns: Adapter"
date: 2015-07-09 12:00:00 -0300
categories: code
tags:
  - adapter-pattern
  - c#
  - design-patterns
---
[![img](https://brunolm.files.wordpress.com/2015/07/2015-43-09-10-43-09-063.png)](https://brunolm.files.wordpress.com/2015/07/2015-43-09-10-43-09-063.png) The adapter is used when you want to integrate a class from another source into your code.

It could also be used to enable the use of legacy classes into your new architecture. It can also be used with classes that needs very specific methods to complete some work, like database access classes, and then they could be adapted to use a common interface.
<!--more-->

Imagine the following situation: you have a game where all your characters inherit from the abstract class Character.

```csharp
public abstract class Character
{
    public int Health { get; set; }

    public int Mana { get; set; }

    public abstract string Attack();
}

public class Link : Character
{
    public override string Attack()
    {
        return "Link Attack";
    }
}

public class Zelda : Character
{
    public override string Attack()
    {
        return "Zelda Attack";
    }
}
```

You then need to include a character from another game into your game, but you cant change the original class. So you can create an adapter for it:

```csharp
public class Mario
{
    public string JumpAttack()
    {
        return "Mario Attack";
    }
}

public class MarioAdapter : Character
{
    private Mario mario = new Mario();

    public override string Attack()
    {
        return mario.JumpAttack();
    }
}
```

This way you can use the new character as if it were just another normal character in your game.

```csharp
Character link = new Link();
Character zelda = new Zelda();
Character mario = new MarioAdapter();

Console.WriteLine(link.Attack());
Console.WriteLine(zelda.Attack());
Console.WriteLine(mario.Attack());
```

Outputs:

```
Link Attack
Zelda Attack
Mario Attack
```

This way it is possible to adapt different classes to use the same interface or abstract class, so your application doesnt need specific handling for different types.
