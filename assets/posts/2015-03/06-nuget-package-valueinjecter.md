---
layout: post
title: "Nuget Package: ValueInjecter"
date: 2015-03-06 12:00:00 -0300
categories: code
tags:
  - asp.net-mvc
  - c#
  - nuget-package
  - valueinjecter
  - wpf
---
[ValueInjecter](https://www.nuget.org/packages/ValueInjecter/) is a nuget package that allows you to inject values from one object to another.

<blockquote>ValueInjecter lets you define your own convention-based matching algorithms (ValueInjections) in order to match up (inject) source values to destination values. It is used for mapping Dto to Entity and back also for mapping IDataReader to objects, windows forms to object, basically anything. Also has support for flattening and unflattening.</blockquote>

One good use for ValueInjecter is when you are working with models and viewmodels. With it you can build models from viewmodels and viewmodels from models.
<!--more-->

ValueInjecter uses conventions to map properties. The default convention map properties by type and name, when they match the values are copied.

## WPF Example

Given that I have a ViewModel called `EditGameViewModel` and a Model called `Game` as follows:

```csharp
public class EditGameViewModel : INotifyPropertyChanged
{
    private string name;
    public string Name
    {
        get { return name; }
        set { name = value; NotifyProp(); }
    }

    private decimal price;
    public decimal Price
    {
        get { return price; }
        set { price = value; NotifyProp(); }
    }

    private ICommand saveCommand;
    public ICommand SaveCommand
    {
        get { return saveCommand; }
        set { saveCommand = value; NotifyProp(); }
    }

    public event PropertyChangedEventHandler PropertyChanged;
    public void NotifyProp([CallerMemberName] string caller = null)
    {
        if (PropertyChanged != null)
            PropertyChanged(this,
                new PropertyChangedEventArgs(caller));
    }
}

public class Game
{
    public int ID { get; set; }

    public string Name { get; set; }

    public decimal Price { get; set; }
}
```

I can inject values from the ViewModel to the Model:

```csharp
public void ViewModel_to_Model_Example()
{
    var editGameViewModel = new EditGameViewModel
    {
        Name = "Breath of Fire IV",
        Price = 1337.00M,
        SaveCommand = new RelayCommand(() => { })
    };

    var game = new Game();

    game.InjectFrom(editGameViewModel);
}
```
[![img](https://brunolm.files.wordpress.com/2015/03/beforeinjecter.png)](https://brunolm.files.wordpress.com/2015/03/beforeinjecter.png)

And I can also inject from the Model to the ViewModel:

```csharp
public void Model_to_ViewModel_Example()
{
    var game = new Game
    {
        Name = "Breath of Fire IV",
        Price = 1337.00M,
    };

    var editGameViewModel = new EditGameViewModel();

    editGameViewModel.InjectFrom(game);
}
```
[![img](https://brunolm.files.wordpress.com/2015/03/beforeinjecter1.png)](https://brunolm.files.wordpress.com/2015/03/beforeinjecter1.png)

## MVC example

In MVC we can use ValueInjecter to easily get posted values and map to our model. By having the ViewModel on the client-side you can annotate your model properties with any required validations you need, even custom validations and you do not have to worry about transferring from the ViewModel to the Model because ValueInjecter does that for you.

```csharp
[HttpPost]
public async Task<ActionResult> Index(GameViewModel gameViewModel)
{
    var game = new Game();
    game.InjectFrom(gameViewModel);

    bool saved = await SaveGameAsync(game);
    return View(game);
}
```

You can also retrieve an object from the database and transfer its values to a ViewModel and give it to the View, so the user can edit the values:

```csharp
public ActionResult Index(int id)
{
    var game = GameService.Get(id);
    var gameViewModel = new GameViewModel();

    gameViewModel.InjectFrom(game);

    return View(gameViewModel);
}
```

## Conventions

As I mentioned before, the default convention is by type and name. But this can be changed at will by calling the inject method passing the type of the convention as the generic type parameter.

```csharp
game.InjectFrom<SomethingConvention>(editGameViewModel);
```

To implement a custom convention you have to inherit from `ConventionInjection` class.

I am going to implement a convention that only copy properties when they have the same name and are of the string.

```csharp
public class StringOnlyConvention : ConventionInjection
{
    // abstract: you must implement
    // determines when values should be copied
    protected override bool Match(ConventionInfo c)
    {
        return c.SourceProp.Type == c.TargetProp.Type
            && c.SourceProp.Name == c.TargetProp.Name
            && c.SourceProp.Type == typeof(string);
    }

    // virtual: you can change
    protected override void Inject(object source, object target)
    {
        base.Inject(source, target);
    }

    // virtual: you can change
    protected override object SetValue(ConventionInfo c)
    {
        return base.SetValue(c);
    }
}
```

```csharp
public static void ViewModel_to_Model_Convention_Example()
{
    var editGameViewModel = new EditGameViewModel
    {
        Name = "Breath of Fire IV",
        Price = 1337.00M,
        SaveCommand = new RelayCommand(() => { })
    };

    var game = new Game();

    game.InjectFrom<StringOnlyConvention>(editGameViewModel);
}
```

[![img](https://brunolm.files.wordpress.com/2015/03/2015-30-06-07-30-49-797.png)](https://brunolm.files.wordpress.com/2015/03/2015-30-06-07-30-49-797.png)
