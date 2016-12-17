---
layout: post
title: "Design Patterns: Iterator"
date: 2015-06-20 12:00:00 -0300
categories: code
tags:
  - c#
  - design-patterns
  - iterator-pattern
---
The Iterator design pattern separates the logic to navigate a collection in a different layer, so your collections wont need to know how to iterate through its elements.

This pattern consist in a class that is going to hold the elements and another class that will navigate.
<!--more-->

An example from scratch could be a collection of stories that are iterated through a StoryIterator and not by the collection itself:

```csharp
public class StoryCollection
{
    private ArrayList items = new ArrayList();

    public int Count
    {
        get
        {
            return items.Count;
        }
    }

    public Story this[int index]
    {
        get
        {
            return items[index] as Story;
        }
        set
        {
            items.Insert(index, value);
        }
    }

    public StoryEnumerator GetEnumerator()
    {
        return new StoryEnumerator(this);
    }
}

public class StoryEnumerator
{
    private int currentIndex = -1;

    private StoryCollection collection;

    public StoryEnumerator(StoryCollection collection)
    {
        this.collection = collection;
    }

    public Story Current
    {
        get
        {
            if (currentIndex < 0 || collection.Count <= currentIndex)
                return null;

            return collection[currentIndex];
        }
    }

    public bool MoveNext()
    {
        if (collection.Count == (currentIndex + 1))
            return false;

        ++currentIndex;

        return true;
    }

    public void Reset()
    {
        currentIndex = -1;
    }
}
```

And to use it we could test several scenarios:

```csharp
[TestClass]
public class IteratorTest
{
    [TestMethod]
    public void MoveNext_EmptyArray_DoesNothing()
    {
        var collection = new StoryCollection();
        var iterator = collection.GetEnumerator();

        while (iterator.MoveNext())
        {
            Assert.Fail();
        }
    }

    [TestMethod]
    public void MoveNext_TwoElements_AddsTwo()
    {
        int sum = 0;
            
        var collection = new StoryCollection();
        collection[0] = new Story();
        collection[1] = new Story();

        var iterator = collection.GetEnumerator();

        while (iterator.MoveNext())
        {
            sum++;
        }

        Assert.AreEqual(2, sum);
    }

    [TestMethod]
    public void MoveNextTwice_TwoElements_AddsTwo()
    {
        int sum = 0;

        var collection = new StoryCollection();
        collection[0] = new Story();
        collection[1] = new Story();

        var iterator = collection.GetEnumerator();

        while (iterator.MoveNext())
        {
            sum++;
        }

        while (iterator.MoveNext())
        {
            sum++;
        }

        Assert.AreEqual(2, sum);
    }

    [TestMethod]
    public void MoveNextTwiceThenReset_TwoElements_AddsFour()
    {
        int sum = 0;

        var collection = new StoryCollection();
        collection[0] = new Story();
        collection[1] = new Story();

        var iterator = collection.GetEnumerator();

        while (iterator.MoveNext())
        {
            sum++;
        }

        iterator.Reset();

        while (iterator.MoveNext())
        {
            sum++;
        }

        Assert.AreEqual(4, sum);
    }


    [TestMethod]
    public void MoveNext_TwoElements_GetsCurrent()
    {
        int i = 0;

        var collection = new StoryCollection();
        collection[0] = new Story { Title = "0" };
        collection[1] = new Story { Title = "1" };

        var iterator = collection.GetEnumerator();

        while (iterator.MoveNext())
        {
            Assert.AreEqual(i.ToString(), iterator.Current.Title);
            ++i;
        }

        Assert.AreEqual(2, i);
    }
}
```

The only thing the collection does it worry about storing items. This example shows how it would look like from scratch, **but in .NET we already have the `IEnumerable` and `IEnumerator` interfaces for that purpose**. All commonly used collection already implement those interfaces. If a class implements these interfaces then the collection will be available on a foreach loop.
