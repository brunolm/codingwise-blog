---
layout: post
title: "Nuget Package: Fody"
date: 2015-03-05 12:00:00 -0300
categories: code
tags:
  - c#
  - fody
  - il-injection
  - nuget-package
  - weaver
---
Fody is a Nuget Packaged that allows you to decorate your code with attributes and from them generate code automatically through IL injection.

From the official project:

<blockquote>Manipulating the IL of an assembly as part of a build requires a significant amount of plumbing code. This plumbing code involves knowledge of both the MSBuild and Visual Studio APIs. Fody attempts to eliminate that plumbing code through an extensible add-in model.</blockquote>

It is also the name of this cute little bird :)

![img](http://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Foudia_madagascariensis_-_W%C3%BCstenhaus_6.jpg/220px-Foudia_madagascariensis_-_W%C3%BCstenhaus_6.jpg)

<!--more-->

[Fody can be found at Github](https://github.com/Fody/Fody). It has loads of modules and you can create your own modules.

There are some particularly interesting modules such as:

[PropertyChanged](https://github.com/Fody/PropertyChanged)

Rather than doing this:

```csharp
public class Foo : INotifyPropertyChanged
{
    private string name;
    public string Name
    {
        get { return name; }
        set
        {
            if (name != value)
            {
                name = value;
                NotifyPropertyChange();
            }
        }
    }

    public event PropertyChangedEventHandler PropertyChanged;

    public void NotifyPropertyChange([CallerMemberName] string propertyName = null)
    {
        if (PropertyChanged != null)
        {
            PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
```

You can simply build it with this:

```csharp
[PropertyChanged.ImplementPropertyChanged]
public class Foo
{
    public string Name { get; set; }
}
```

There is also:
[Anotar](https://github.com/Fody/Anotar) which makes loggin easier.
[MethodTimer](https://github.com/Fody/MethodTimer) which makes method performance tracking easier.

Among others.
