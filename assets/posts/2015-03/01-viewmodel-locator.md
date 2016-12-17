---
layout: post
title: "ViewModel Locator"
date: 2015-03-01 12:00:00 -0300
categories: code
tags:
  - c#
  - locator
  - viewmodel
  - wpf
---
A ViewModelLocator is a class witch is going to map viewmodels to its properties. And on your views you can specify which viewmodel it should use.


It also allows you to use a different viewmodel during design time so you can see mock values while you are building the views.


<!--more-->
An example of a ViewModelLocator would be:


```csharp
public class ViewModelLocator
{
    private DependencyObject dummy = new DependencyObject();

    public IMainViewModel MainViewModel
    {
        get
        {
            if (IsInDesignMode())
            {
                return new MockMainViewModel();
            }

            return MefBootstrap.Container.GetExportedValue<IMainViewModel>();
        }
    }

    private bool IsInDesignMode()
    {
        return DesignerProperties.GetIsInDesignMode(dummy);
    }
}
```



And on App.xaml file you could include as a resource. Define the namespace on the class above and register it on the resources.



```csharp
xmlns:core="clr-namespace:YourNameSpace"

<Application.Resources>
<core:ViewModelLocator x:Key="ViewModelLocator" />
</Application.Resources>
```



With the locator in your application resources you can refer to it as `{StaticResource ViewModelLocator}` anywhere in your application.


On your view you can then bind the DataContext to a property of the locator:



```csharp
<Window x:Class="WpfGuide.Views.MainView"
...
        DataContext="{Binding Path=MainViewModel,
            Source={StaticResource ViewModelLocator}}"
>
```



With the example above I will have a mock viewmodel while Im designing the application:
[![img](https://brunolm.files.wordpress.com/2015/03/011.jpg)](https://brunolm.files.wordpress.com/2015/03/011.jpg)


And real values when Im running it:
[![img](https://brunolm.files.wordpress.com/2015/03/02.jpg)](https://brunolm.files.wordpress.com/2015/03/02.jpg)

