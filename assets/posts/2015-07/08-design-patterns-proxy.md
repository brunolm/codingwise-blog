---
layout: post
title: "Design Patterns: Proxy"
date: 2015-07-08 12:00:00 -0300
categories: code
tags:
  - c#
  - design-patterns
  - proxy-pattern
---
The proxy design pattern is a layer that prevents you from instantiating heavy objects that are not going to be needed at a certain time.
<!--more-->

The proxy pattern could be used to:

  - prevent loading unnecessary resources
  - access real data in a remote location
  - prevent control from accessing non-declared members/methods


One example of the proxy structure could be the following:

[![img](https://brunolm.files.wordpress.com/2015/07/2015-46-08-11-46-24-093.png)](https://brunolm.files.wordpress.com/2015/07/2015-46-08-11-46-24-093.png)

I can have a proxy to access a store, if the store is closed it shouldnt even bother in loading unnecessary resources.

```csharp
public interface IStore
{
    void ListItems();
}

public class ProxyStore : IStore
{
    private RealStore realStore;

    public void ListItems()
    {
        if (DateTime.Now.Hour >= 6 && DateTime.Now.Hour <= 10)
        {
            if (realStore == null)
            {
                realStore = new RealStore();
            }

            realStore.ListItems();
        }
        else
        {
            Console.WriteLine("Were closed!");
        }
    }
}
public class RealStore : IStore
{
    public void ListItems()
    {
        Console.WriteLine("Heavy graphics Weapon 1");
        Console.WriteLine("Heavy graphics Weapon 2");
        Console.WriteLine("Heavy graphics Weapon 3");
        Console.WriteLine("Heavy graphics Weapon 4");
        Console.WriteLine("Heavy graphics Weapon 5");
    }
}
```

This example is something we can see in Assassinss Creed where this pattern might have been used. In early game there is a shop that has many unavailable options. Instead of loading all the resources required for the items it uses a proxy saying there is nothing available, so it saves lots of resources.

http://www.youtube.com/watch?v=whJi3fhwbW0
