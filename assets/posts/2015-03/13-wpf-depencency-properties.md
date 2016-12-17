---
layout: post
title: "WPF: Depencency Properties"
date: 2015-03-13 12:00:00 -0300
categories: code
tags:
  - c#
  - dependency-property
  - wpf
---
Dependency Properties allows you to extend a functionality, [from MSDN](https://msdn.microsoft.com/en-us/library/ms752914%28v=vs.110%29.aspx):

<blockquote>A dependency property provides functionality that extends the functionality of a property as opposed to a property that is backed by a field.</blockquote>

It is used to create bindable properties on objects deriving from `DependencyObject`, for example in controls. It is used all across WPF.

You can use it as well to create your own bindable properties.

For example:

[![img](https://brunolm.files.wordpress.com/2015/03/2015-31-13-05-31-24-043.png)](https://brunolm.files.wordpress.com/2015/03/2015-31-13-05-31-24-043.png)

```csharp
public class ExtendedButton : Button
{
    public static readonly DependencyProperty DisplayInRedProperty =
        DependencyProperty.Register(nameof(DisplayInRed)
            , typeof(bool)
            , typeof(ExtendedButton)
            , new PropertyMetadata(DisplayInRedChanged));

    protected static void DisplayInRedChanged(DependencyObject d,
        DependencyPropertyChangedEventArgs ev)
    {
        bool displayInRed = (bool)ev.NewValue;

        if (displayInRed)
        {
            (d as Button).Background =
                new SolidColorBrush(
                    (Color)ColorConverter.ConvertFromString("red"));
        }
    }

    public bool DisplayInRed
    {
        get { return (Boolean)this.GetValue(DisplayInRedProperty); }
        set { this.SetValue(DisplayInRedProperty, value); }
    }
}
```

```csharp
// this way it doesnt work with bindings
public class ExtendedButton2 : Button
{
    private bool displayInRed;
    public bool DisplayInRed
    {
        get
        {
            return displayInRed;
        }
        set
        {
            displayInRed = value;

            if (displayInRed)
            {
                Background =
                    new SolidColorBrush(
                        (Color)ColorConverter.ConvertFromString("red"));
            }
        }
    }
}
```

The [DependencyProperty Register](https://msdn.microsoft.com/en-us/library/ms597501(v=vs.110).aspx) complete method has the following signature:

```csharp
public static DependencyProperty Register(
    string name,
    Type propertyType,
    Type ownerType,
    PropertyMetadata typeMetadata,
    ValidateValueCallback validateValueCallback
)
```


  - name: defines the name of the property it will access
  - propertyType: defines the type of the property it will access
  - ownerType: defines the type of the object owner of the property it will access
  - typeMetadata: can define default value; property changed callback; coerce value callback (adjust data; e.g. if value goes over the maximum allowed return the maximum allowed)
  - validateValueCallback: callback to define if property value is valid or not (returning false throws an `ArgumentException`)


The naming convention is `Property` for the static definition of the DependencyProperty and then just `` for the actual property.

So if you want to create a custom control and have bindable properties this is the way to do it.
