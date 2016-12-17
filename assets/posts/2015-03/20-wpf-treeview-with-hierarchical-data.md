---
layout: post
title: "WPF TreeView with hierarchical data"
date: 2015-03-20 12:00:00 -0300
categories: code
tags:
  - c#
  - treeview
  - wpf
---
[TreeView control](https://msdn.microsoft.com/en-us/library/system.windows.controls.treeview%28v=vs.110%29.aspx) allows you to create an hierarchical structure. You can tell it to bind elements and also how it should bind the children, grandchildren and so on.

One simple example is as follows:

```csharp
public class Tag
{
    public string Name { get; set; }

    public ObservableCollection<Tag> Children { get; set; }
}
```

Having this structure you can bind the hierarchical data in a TreeView:

```csharp
public class Game
{
    public string Name { get; set; }

    public ObservableCollection<Character> Characters { get; set; }
}

public class Character
{
    public string Name { get; set; }
}
```

One issue that comes along with the hierarchical binding is that the context inside does not have access to the context of your window. It means that if you have an `ICommand` in your view model you cannot access it directly.

Imagine that you have an `ICommand` called `ShowInfoCommand`. You can set the ContextMenu DataContext through a reference, like this:

```csharp
// relative
Tag="{Binding RelativeSource={RelativeSource Mode=FindAncestor, AncestorType={x:Type Window}}}"
// or by name
Tag="{Binding ElementName=wndName}"
```

Having that we can bind in the context menu items. In the menu items we can refer to the context menu by using

```
RelativeSource={RelativeSource Mode=FindAncestor, AncestorType=ContextMenu}
```

From the context menu we can refer to the element where it is set by using `PlacementTarget`.

From the element that contains the context menu we can access the window which was bound to the Tag property.

And finally from the window access our command.

Putting it all together:

```
<TreeView ItemsSource="{Binding Games}">
    <TreeView.ItemTemplate>
        <HierarchicalDataTemplate ItemsSource="{Binding Characters}">
            <TextBlock Text="{Binding Name}" Tag="{Binding RelativeSource={RelativeSource Mode=FindAncestor, AncestorType={x:Type Window}}}">
                <TextBlock.ContextMenu>
                    <ContextMenu>
                        <MenuItem Header="Show info"
                            Command="{Binding Path=PlacementTarget.Tag.DataContext.ShowInfoCommand, RelativeSource={RelativeSource Mode=FindAncestor, AncestorType=ContextMenu}}"
                            CommandParameter="{Binding}"
                        />
                    </ContextMenu>
                </TextBlock.ContextMenu>
            </TextBlock>
        </HierarchicalDataTemplate>
    </TreeView.ItemTemplate>
</TreeView>
```
