---
layout: post
title: "Design Patterns: Abstract Factory"
date: 2015-06-18 12:00:00 -0300
categories: code
tags:
  - abstract-factory-pattern
  - c#
  - design-patterns
---
The abstract factory design pattern is a way for you to be able to get different types or setups for objects by calling the same factory. The result returned from the create method is going to be determined by the factory type.
<!--more-->

For example, lets say we have a factory that create items to build a house. So we need material to build the floor, walls... But then imagine that those items could be made of different materials and have perhaps unique characteristics. To accomplish that with the abstract factory we can do like this:

```csharp
public interface IItemFactory
{
    IItem CreateWall();

    IItem CreateFloor();
}
```

And we would have two factories:

```csharp

public class MetalFactory : IItemFactory
{
    public IItem CreateWall()
    {
        return new MetalWall();
    }

    public IItem CreateFloor()
    {
        return new MetalFloor();
    }
}

public class WoodFactory : IItemFactory
{
    public IItem CreateWall()
    {
        return new WoodWall();
    }

    public IItem CreateFloor()
    {
        return new WoodFloor();
    }
}
```

And different types of material:

```csharp
public class MetalWall : IItem { }
public class MetalFloor : IItem { }

public class WoodWall : IItem { }
public class WoodFloor : IItem { }
```

Now we can use this structure. We could have a builder that is going to build a part of a house and we could determine what materials he is going to use by passing a factory to it.

```csharp
public class Builder
{
    private IItemFactory itemFactory;

    public Builder(IItemFactory itemFactory)
    {
        this.itemFactory = itemFactory;
    }

    public void BuildFloor()
    {
        this.itemFactory.CreateFloor();
    }

    public void BuildWall()
    {
        this.itemFactory.CreateWall();
    }
}
```

We can decide what the house is going to be built of by specifying which factory the builder is going to use:

```csharp
var metalBuilder = new Builder(new MetalFactory());
var woodBuilder = new Builder(new WoodFactory());
```

In a real life example, we could think of Starcraft using this pattern to create a base for each race. So calling:

```csharp
player.CreateBase();
```

Would create a Nexus, Command Center or Hatchet accordingly to the players race.

[![img](https://brunolm.files.wordpress.com/2015/06/nexus_sc2_devrend3.jpg?w=296)](https://brunolm.files.wordpress.com/2015/06/nexus_sc2_devrend3.jpg)

[![img](https://brunolm.files.wordpress.com/2015/06/command_center_sc2_rend1.jpg?w=300)](https://brunolm.files.wordpress.com/2015/06/command_center_sc2_rend1.jpg)
