---
layout: post
title: "The async and await in ASP.NET MVC"
date: 2015-03-05 12:00:00 -0300
categories: code
tags:
  - asp.net-mvc
  - async
  - await
  - c#
---
The `async` and `await` combination allows you to have non-blocking methods.

In ASP.NET MVC you can have asynchronous actions. It might sound a good idea to make all your actions `async`, but it is not. Light operations like returning a view, handling a post, will likely get slower because the cost of creating a thread will be much higher.

But you can benefit from it by using it against I/O operations.
<!--more-->

You should consider using `async` in these cases, so the worker thread is not jeopardized.

For example, if I am posting a model to the controller and then saving it to the database:

```csharp
public ActionResult Index()
{
    Game game = new Game();
    return View(game);
}

[HttpPost]
public async Task<ActionResult> Index(Game game)
{
    bool saved = await SaveGameAsync(game);
    return View(game);
}

public async Task<bool> SaveGameAsync(Game game)
{
    using (var db = ApplicationDbContext.Create())
    {
        db.Games.Add(game);
        return await db.SaveChangesAsync() > 0;
    }
}
```

On the default template ASP.NET MVC creates for you there is the `AccountController` which is full of `async` actions that deals with database.
