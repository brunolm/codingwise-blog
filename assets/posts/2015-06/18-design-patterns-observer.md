---
layout: post
title: "Design Patterns: Observer"
date: 2015-06-18 12:00:00 -0300
categories: code
tags:
  - c#
  - design-patterns
  - observer-pattern
---
The observer design pattern can be used when you want objects to know when something happens to an object being observed.

This is achieved by having the `Subject` and an `Observer`.
<!--more-->

For example, lets say we have a Dragon which will be the subject and then have people as observers. When the dragon switch to a flying mode the observers are going to look up instead of forward.

To accomplish that we need a `ISubject` that will have the method to add, remove and notify observers.

```csharp
public interface IDragonSubject
{
    void Subscribe(IDragonObserver observer);
    void Unsubscribe(IDragonObserver observer);
    void Notify();
}
```

And the specification for the observers.

```csharp
public interface IDragonObserver
{
    void Update(Dragon dragon);
}
```

Now we can create our subject.

```csharp
public class Dragon : IDragonSubject
{
    private IList<IDragonObserver> observers;

    private bool flying;
    public bool Flying
    {
        get { return flying; }
        set
        {
            if (flying != value)
            {
                flying = value;
                Notify();
            }
        }
    }

    public Dragon()
    {
        observers = new List<IDragonObserver>();
    }

    // People around will begin to watch this dragon
    public void Subscribe(IDragonObserver observer)
    {
        observers.Add(observer);
    }

    // if they get out of range we could unsubscribe
    public void Unsubscribe(IDragonObserver observer)
    {
        observers.Remove(observer);
    }

    // when something happens we will notify
    // all observers for this instance
    public void Notify()
    {
        foreach (var observer in observers)
        {
            observer.Update(this);
        }
    }
}
```

And our observer:

```csharp
public class Person : IDragonObserver
{
    public enum LookingDirectionTypes
    {
        Foward,
        Up,
        Down,
        Left,
        Right,
    }

    public LookingDirectionTypes LookingDirection { get; set; }

    public void Update(Dragon dragon)
    {
        if (dragon.Flying)
            LookingDirection = Person.LookingDirectionTypes.Up;
        else
            LookingDirection = LookingDirectionTypes.Foward;
    }
}
```

Finally we can put all the pieces together and see the result. In this test there are a couple of people observing the dragon, the third one is elsewhere. So when the dragon start flying person1 and person2 will look up.

```csharp
[TestClass]
public class ObserverTest
{
    [TestMethod]
    public void DragonFlyPeopleLookUp()
    {
        Dragon dragon = new Dragon();

        // default looking direction = Foward
        Person p1 = new Person();
        Person p2 = new Person();
        Person p3 = new Person();

        // p1 and p2 are now watching the dragon
        dragon.Subscribe(p1);
        dragon.Subscribe(p2);

        // the dragon started to fly
        dragon.Flying = true;

        Assert.AreEqual(Person.LookingDirectionTypes.Up, p1.LookingDirection);
        Assert.AreEqual(Person.LookingDirectionTypes.Up, p2.LookingDirection);

        Assert.AreEqual(Person.LookingDirectionTypes.Foward, p3.LookingDirection);
    }
}
```

A real life example is on Assassins Creed, ordinary people are the observers and the assassin is the subject. When the subject toss money all observers are notified that the action happened and if they are in range they will take an action.

[youtube https://www.youtube.com/watch?v=HoA4LZ7a-OI?t=3m30s]
