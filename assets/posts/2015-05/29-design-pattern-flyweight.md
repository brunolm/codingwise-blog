---
layout: post
title: "Design Patterns: Flyweight"
date: 2015-05-29 12:00:00 -0300
categories: code
tags:
  - c#
  - design-patterns
  - flyweight-pattern
---
The Flyweight Design Pattern allows you to share instances of the same object across multiple calls.

In the example on this post Im reusing a rectangle with the same color, that makes the color property "intrinsic". But Im not sharing position and size across the instances, so those characteristics are "extrinsic".
<!--more-->

```csharp
namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            var r = FlyweightFactory.Create("Red");
            var g = FlyweightFactory.Create("Green");
            var b = FlyweightFactory.Create("Blue");

            r.Draw(0, 0, 10, 10);
            r.Draw(0, 0, 20, 30);

            g.Draw(0, 0, 20, 30);
            FlyweightFactory.Create("Green").Draw(10, 20, 50, 70);

            b.Draw(0, 0, 20, 30);

            FlyweightFactory.Create("Purple").Draw(10, 20, 50, 70);

            Console.ReadKey(true);
        }
    }

    public class FlyweightFactory
    {
        private static ConcurrentDictionary<string, Rectangle> cache
            = new ConcurrentDictionary<string, Rectangle>();

        public static Rectangle Create(string key)
        {
            return cache.GetOrAdd(key, new Rectangle(key));
        }
    }

    public class Rectangle
    {
        public Guid ID { get; set; }

        public string ColorName { get; set; }

        public Rectangle(string name)
        {
            ID = Guid.NewGuid();
            ColorName = name;
        }

        public void Draw(int x, int y, int width, int height)
        {
            Console.WriteLine("Rectangle ({0}) instance: {1}"
                              , ColorName, ID);
            Console.WriteLine("X: {0} Y: {1} W: {2} H: {3}"
                              , x, y, width, height);
            Console.WriteLine();
        }
    }
}
```

Output:
[![img](https://brunolm.files.wordpress.com/2015/05/flyweight.png)](https://brunolm.files.wordpress.com/2015/05/flyweight.png)

In a real world example: You could use it in game development. Imagine that you have a system to change a characters clothes, you dont need to create an instance of the character itself entirely, having to load expensive resources every time. You could just use a shared instance of the characters model and have the clothes as the extrinsic part. (And hey, you could have another Flyweight system to reuse clothes instances as well).
