---
layout: post
title: "Unit Tests: When and How"
date: 2015-06-20 12:00:00 -0300
categories: code
tags:
  - c#
  - unit-tests
---
Unit Tests are a way to ensure the logic of your classes are producing the expected results. Those tests can be run from Visual Studio without having to load up the entire application manually navigating to a specific section and trying to reproduce different scenarios.
<!--more-->

There are some widely used naming conventions, for the assembly name it is often used as:

<blockquote>[AssemblyName].Tests</blockquote>

The test files are often named as:

<blockquote>[ClassName]Tests</blockquote>

And finally the methods are named as:

<blockquote>UnitOfWork_StateUnderTest_ExpectedBehavior</blockquote>

So if I have for example:

```csharp
[TestClass]
public class RomanConverterTests
{
    [TestMethod]
    public void ConvertFrom_Decimal1_ReturnsI()
    {
        Assert.AreEqual("I", Roman.ConvertFrom(1));
    }
}
```

Assert provides several methods to compare actual results to expected results and if it fails it is going to throw an notification on the Test Explorer window. Asserts shouldnt be overused on a single method. [It is ok to use more than one Assert](http://programmers.stackexchange.com/a/7829/1451) but you have to be careful not to test multiple things in the same method.

There are four other attributes for methods that are not mandatory but they can be pretty useful:

```csharp
[TestClass]
public class UserServiceTests
{
    private ApplicationContext db;

    [TestInitialize]
    public void TestInitialize()
    {
        db = new ApplicationContext();
        db.Database.BeginTransaction();
    }

    [TestCleanup]
    public void TestCleanUp()
    {
        db.Database.CurrentTransaction.Rollback();
        db.Dispose();
    }

    [TestMethod]
    public void Save_AllFields_Completes()
    {
        var userService = new UserService { Context = db };
        var user = new User();

        user.Username = "brunolm";
        user.Name = "BrunoLM";
        user.Email = "brunolm@codingwise.com";

        userService.Save(user);
    }
}
```

There is also the "Mocks". The purpose of mocks is providing external information to your test so you can complete a unit of work. In the following example Im mocking an ```csharp
public class CartService
{
    public ApplicationContext Context { get; set; }

    public IList<IItem> Items { get; set; }

    public CartService()
    {
        Items = new List<IItem>();
    }

    public void Add(IItem item)
    {
        if (!item.Buyable)
            throw new ArgumentException("This item cant be bought.", "item");

        Items.Add(item);
    }
}

public interface IItem
{
    bool Buyable { get; set; }
}

[TestClass]
public class CartServiceTests
{
    [TestMethod]
    [ExpectedException(typeof(ArgumentException))]
    public void Add_NonBuyable_Throws()
    {
        var cartService = new CartService();

        var mock = new Mock<IItem>();
        mock.SetupProperty<bool>(item => item.Buyable, false);

        cartService.Add(mock.Object);
    }

    [TestMethod]
    public void Add_Buyable_Includes()
    {
        var cartService = new CartService();

        var mock = new Mock<IItem>();
        mock.SetupProperty<bool>(item => item.Buyable, true);

        cartService.Add(mock.Object);

        Assert.AreEqual(1, cartService.Items.Count);
    }
}
```

Mocks are sometimes overused, **be careful not to fall on "Unit Test Only Tests the Mock" situation**. Mocks exists so eliminate external dependencies and allow your code to focus on a single unit of work.

On MVC you will find examples of mocks for controller contexts, http contexts and so on...

So always remember: choose good names, limit the scope of your test, use mocks with responsibility.
