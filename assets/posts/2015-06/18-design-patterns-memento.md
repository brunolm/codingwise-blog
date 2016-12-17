---
layout: post
title: "Design Patterns: Memento"
date: 2015-06-18 12:00:00 -0300
categories: code
tags:
  - c#
  - design-patterns
  - memento-pattern
---
The memento pattern is about recording state. In a racing game there are sometimes the "ghosts" which is a shadow of your best run. These ghosts could have all their movements recorded by a memento and replayed during the game.
<!--more-->

A memento has a simple implementation, it has a class to store the properties that will be recorded and a recorder that will store the values.

```csharp
public class Car
{
    public int X { get; set; }

    public int Y { get; set; }

    // the class we want to record
    // will have a Memento property
    // returning a new memento every time
    // and setting the class properties
    // from the memento
    public CarMemento Memento
    {
        get { return new CarMemento(X, Y); }
        set
        {
            X = value.X;
            Y = value.Y;
        }
    }
}

// class with the properties that will be recorded
public class CarMemento
{
    public CarMemento(int x, int y)
    {
        X = x;
        Y = y;
    }

    public int X { get; set; }
    public int Y { get; set; }
}
```

And we need a recorder to store a list of mementos.

```csharp
public class CarRecorder
{
    private int currentIndex = -1;

    private IList<CarMemento> mementos = new List<CarMemento>();

    private Car car;

    public CarRecorder(Car car)
    {
        this.car = car;
    }

    public int NextIndex
    {
        get
        {
            if (mementos.Count == 0)
                return -1;

            int index = this.currentIndex + 1;

            return index >= mementos.Count
                ? mementos.Count - 1
                : index;
        }
    }

    public int PreviousIndex
    {
        get
        {
            if (mementos.Count == 0)
                return -1;

            return this.currentIndex - 1;
        }
    }

    public void Record()
    {
        mementos.Add(car.Memento);
        this.currentIndex++;
    }

    public void Forward()
    {
        if (NextIndex > -1)
        {
            car.Memento = mementos[NextIndex];
            this.currentIndex++;
        }
    }

    public void Rewind()
    {
        if (PreviousIndex > -1)
        {
            car.Memento = mementos[PreviousIndex];
            this.currentIndex--;
        }
    }
}
```

Using it:

```csharp
var car = new Car();
var recorder = new CarRecorder(car);

car.X = 10;
car.Y = 10;

recorder.Record();

car.X = 20;
car.Y = 20;

recorder.Record();

car.X = 30;
car.Y = 30;

recorder.Record();
```

At this point we have 3 states saved on the recorder. We can iterate through the states by calling Forward and Rewind. Currently our car is at position ```csharp
recorder.Rewind();
```

Our car instance will now have X and Y set to 20.

```csharp
car.X // 20
car.Y // 20
```

We can call forward and have the values set back to 30, 30.

```csharp
recorder.Forward();
car.X // 30
car.Y // 30
```

In a racing game the position of the car could be recorded every time and afterwards it can be replayed from the list of mementos allowing you to race against your own ghost.
