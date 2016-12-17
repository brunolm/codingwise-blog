---
layout: post
title: "Linq: Deferred Execution"
date: 2015-03-08 12:00:00 -0300
categories: code
tags:
  - c#
  - collection
  - linq
---
Linq queries are build as you call linq methods but they are not executed until you use the collection.<!--more-->

For example:

```csharp
var result = new int[] { 1, 2, 3, 4, 5 }.Where(n => n > 2);
```

`result` does not yet contain the resulting values. But if you iterate through it:

```csharp
foreach (var item in result)
{
}
```

It will run the query and return the resulting values.

There are other ways to run it, you could call `ToList()`, `ToDictionary()`, `Count()`...

This feature allows you to only query when really needed so it wont consume any unnecessary resources.

You just have to be careful when dealing with database. If you defer the execution of a query but then dispose of the DbContext you are going to get an exception. Because the framework cant run your query on a disposed connection. For example:

```csharp
IEnumerable<Person> people;

using (var db = new ApplicationDbContext())
{
    people = db.People;
}

// exception!
foreach (var item in people)
{
}
```

Instead what you have to do is:

```csharp
IEnumerable<Person> people;

using (var db = new ApplicationDbContext())
{
    people = db.People.ToList(); // causes query execution
}

// ok
foreach (var item in people)
{
}
```
