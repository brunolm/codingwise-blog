---
layout: post
title: "Design Patterns: Factory"
date: 2015-06-04 12:00:00 -0300
categories: code
tags:
  - c#
  - design-patterns
  - factory-pattern
---
The factory design pattern consists in a class responsible for creating instances of the requested types. It solves the problem of having decisions all over the place to decide what type it should create.

For example, if we have an application that needs different logic depending on a configuration we can isolate the place where the decision is made:
<!--more-->

```csharp
using System;
using System.Collections.Generic;

namespace ConsoleApplication1
{
    public static class AppConfig
    {
        public static string SiteName = "MangaFox";
                                   // or MangaAccess
    }

    class Program
    {
        static void Main(string[] args)
        {
            var factory = new MangaReaderFactory();

            // request an instance for the current config
            MangaReader reader = factory.Create();

            // no decision taking, just plain logic
            reader.GetChapters();
            reader.GetPages(0);

            Console.ReadKey(true);
        }
    }

    public class MangaReaderFactory
    {
        public MangaReader Create()
        {
            // an instance will be chosen accordingly to the config
            switch (AppConfig.SiteName)
            {
                case "MangaFox":
                    return new MangaFox();
                case "MangaAccess":
                    return new MangaAccess();
            }

            throw new ArgumentException("Invalid site name"
                , "SiteName");
        }
    }

    public abstract class MangaReader
    {
        public abstract IEnumerable<string> GetChapters();
        public abstract IEnumerable<string> GetPages(int ch);
    }

    // specific logic for MangaFox
    public class MangaFox : MangaReader
    {
        public override IEnumerable<string> GetChapters()
        {
            throw new NotImplementedException();
        }

        public override IEnumerable<string> GetPages(int ch)
        {
            throw new NotImplementedException();
        }
    }

    // specific logic for MangaAccess
    public class MangaAccess : MangaReader
    {
        public override IEnumerable<string> GetChapters()
        {
            throw new NotImplementedException();
        }

        public override IEnumerable<string> GetPages(int ch)
        {
            throw new NotImplementedException();
        }
    }

}
```

Without the Factory you would have to take decisions directly on your code, or decide which instance to create without a central place to take care of that for you.
