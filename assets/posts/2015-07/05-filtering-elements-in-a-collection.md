---
layout: post
title: "Filtering elements in a collection"
date: 2015-07-05 12:00:00 -0300
categories: code
tags:
  - c#
  - filter
  - wpf
---
In WPF we have the `CollectionView` which is the instance type that are bound to Items controls. The CollectionView allows the use of filters, sorting and other features.

To filter the results shown in a items control we can take advantage of the collection view and add a `Filter` method to it.
<!--more-->

Consider the following scenario:

```csharp
public ObservableCollection<Dragon> Items { get; set; }

public ICollectionView ItemsView
{
    get { return CollectionViewSource.GetDefaultView(Items); }
}
```


```csharp
ItemsView.Filter = new Predicate<object>(o => Filter(o as Dragon));
```

Ive set it so when the view calls filter it is going to call my filter method passing each object in the collection. And then I filter the results I want with my custom logic.

```csharp
private bool Filter(Dragon dragon)
{
    return Search == null
        || dragon.Name.IndexOf(Search, StringComparison.OrdinalIgnoreCase) != -1
        || dragon.OriginalName.IndexOf(Search, StringComparison.OrdinalIgnoreCase) != -1
        || dragon.RomajiName.IndexOf(Search, StringComparison.OrdinalIgnoreCase) != -1;
}
```

In the method above Im using `Search`, that is a property I will be binding to the screen to grab text from a textbox.

```csharp
private string search;

public string Search
{
    get { return search; }
    set
    {
        search = value;
        NotifyPropertyChanged("Search");
        ItemsView.Refresh(); // required
    }
}
```

When I set the Search property Im telling the collection view to refresh. That causes the filter to be applied. If you dont call it then the list will remain the same.

Now if we change the text to be searched the data grid will automatically filter the results.

[![img](https://brunolm.files.wordpress.com/2015/07/2015-19-05-02-19-25-842.png)](https://brunolm.files.wordpress.com/2015/07/2015-19-05-02-19-25-842.png)

[![img](https://brunolm.files.wordpress.com/2015/07/2015-20-05-02-20-46-590.png)](https://brunolm.files.wordpress.com/2015/07/2015-20-05-02-20-46-590.png)

It is possible to have the collection view refresh automatically, to achieve that you need to inherit from a collection view and change the logic there. In the example bellow Im saying that if my model implements INotifyPropertyChanged and a property named "Search" triggers a change then it will refresh itself.

```csharp
public class NotifiableCollectionView : ListCollectionView
{
    public NotifiableCollectionView(IList sourceCollection, object model)
        : base(sourceCollection)
    {
        if (model is INotifyPropertyChanged)
            (model as INotifyPropertyChanged).PropertyChanged += NotifiableCollectionView_PropertyChanged;
    }

    void NotifiableCollectionView_PropertyChanged(object sender, PropertyChangedEventArgs e)
    {
        if (e.PropertyName == "Search")
            this.Refresh();
    }
}
```

Our ICollectionView will be a NotifiableCollectionView instead of the default.

```csharp
private ICollectionView itemsView;

public ICollectionView ItemsView
{
    get
    {
        if (itemsView == null)
        {
            itemsView = new NotifiableCollectionView(Items, this);
        }
        return itemsView;
    }
}
```

So we can remove the refresh call:

```csharp
private string search;

public string Search
{
    get { return search; }
    set
    {
        search = value;
        NotifyPropertyChanged("Search");
        // ItemsView.Refresh(); // no longer required
    }
}
```

And if we add [Fody](https://brunolm.wordpress.com/2015/03/05/nuget-package-fody/) then we can simplify to:

```csharp
public string Search { get; set; }
```

