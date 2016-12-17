---
layout: post
title: "Design Patterns: Bridge"
date: 2015-05-29 12:00:00 -0300
categories: code
tags:
  - bridge-pattern
  - c#
  - design-patterns
---
The Bridge Design Pattern allows you to decouple the implementation from the abstraction. It means that we can have the implementation separated from our classes and reuse them rather than implementing another hierarchy level.

One simple example [mentioned on Stack Overflow](http://stackoverflow.com/a/319757/340760) is this structure:

[![img](https://brunolm.files.wordpress.com/2015/05/2015-35-29-01-35-51-227.png)](https://brunolm.files.wordpress.com/2015/05/2015-35-29-01-35-51-227.png)
<!--more-->

Implementing the Bridge Pattern it becomes:

[![img](https://brunolm.files.wordpress.com/2015/05/2015-45-29-01-45-22-908.png)](https://brunolm.files.wordpress.com/2015/05/2015-45-29-01-45-22-908.png)

This simple example explains what it is and shows you why would you want it. But what about a more real world example? Well, we could for example rename the "Color" stuff to "DrawingApi".

```csharp
namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            var hotApi = new HotDrawingImplementor();
            var coolApi = new CoolDrawingImplementor();

            var hotRectangle = new Rectangle(hotApi);
            var coolRectangle = new Rectangle(coolApi);

            hotRectangle.Draw();
            coolRectangle.Draw();

            Console.ReadKey(true);
        }
    }

    public abstract class Shape
    {
        protected DrawingImplementor implementor;

        public Shape(DrawingImplementor implementor)
        {
            this.implementor = implementor;
        }

        public void Draw()
        {
            implementor.Draw();
        }
    }

    public class Rectangle : Shape
    {
        public Rectangle(DrawingImplementor implementor)
            : base(implementor)
        {

        }
    }

    public class Circle : Shape
    {
        public Circle(DrawingImplementor implementor)
            : base(implementor)
        {
        }
    }

    public abstract class DrawingImplementor
    {
        public abstract void Draw();
    }

    public class CoolDrawingImplementor : DrawingImplementor
    {
        public override void Draw()
        {
            Console.WriteLine("Drawing cool!");
        }
    }

    public class HotDrawingImplementor : DrawingImplementor
    {
        public override void Draw()
        {
            Console.WriteLine("Drawing hot!");
        }
    }
}
```

Output:

```
Drawing hot!
Drawing cool!
```

If you have a hierarchy like that you might want to consider applying this pattern.
