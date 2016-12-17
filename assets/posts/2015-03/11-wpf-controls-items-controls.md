---
layout: post
title: "WPF Controls: Items controls"
date: 2015-03-11 12:00:00 -0300
categories: code
tags:
  - c#
  - controls
  - itemscontrols
  - wpf
---
The controls that inherit from [`ItemsControl`](https://msdn.microsoft.com/en-us/library/system.windows.controls.itemscontrol%28v=vs.110%29.aspx#inheritanceContinued) are controls that support a collection of objects.

These controls can be used to display a collection of objects on the screen. For example, controls like `ListBox` and `ComboBox` can be used to allow the user to select an object from a collection.

[![img](https://brunolm.files.wordpress.com/2015/03/listbox.png)](https://brunolm.files.wordpress.com/2015/03/listbox.png)

<!--more-->

## Items Controls

Items controls are everything that derives from [System.Windows.Controls.ItemsControl](https://msdn.microsoft.com/en-us/library/system.windows.controls.itemscontrol%28v=vs.110%29.aspx#inheritanceContinued).


  - <small>System.Windows.Controls.</small>**HeaderedItemsControl**
  - <small>System.Windows.Controls.Primitives.</small>**DataGridCellsPresenter**
  - <small>System.Windows.Controls.Primitives.</small>**DataGridColumnHeadersPresenter**
  - <small>System.Windows.Controls.Primitives.</small>**MenuBase**
  - <small>System.Windows.Controls.Primitives.</small>**Selector**
  - <small>System.Windows.Controls.Primitives.</small>**StatusBar**
  - <small>System.Windows.Controls.Ribbon.</small>**RibbonContextualTabGroupItemsControl**
  - <small>System.Windows.Controls.Ribbon.</small>**RibbonControlGroup**
  - <small>System.Windows.Controls.Ribbon.</small>**RibbonGallery**
  - <small>System.Windows.Controls.Ribbon.</small>**RibbonQuickAccessToolBar**
  - <small>System.Windows.Controls.Ribbon.</small>**RibbonTabHeaderItemsControl**
  - <small>System.Windows.Controls.</small>**TreeView**


### HeaderedItemsControl

The [HeaderedItemsControl control](https://msdn.microsoft.com/en-us/library/system.windows.controls.headereditemscontrol(v=vs.110).aspx) is a control that supports a collection of items with headers.

### DataGridCellsPresenter

The [DataGridCellsPresenter control](https://msdn.microsoft.com/en-us/library/system.windows.controls.primitives.datagridcellspresenter%28v=vs.110%29.aspx) is used by the Grid control template to display the cells.

### DataGridColumnHeadersPresenter

The [DataGridCellsPresenter control](https://msdn.microsoft.com/en-us/library/system.windows.controls.primitives.datagridcolumnheaderspresenter%28v=vs.110%29.aspx) is used by the Grid control template to display the header cells.

### MenuBase

The [MenuBase control](https://msdn.microsoft.com/en-us/library/system.windows.controls.primitives.menubase%28v=vs.110%29.aspx) is the base class for the [Menu](https://msdn.microsoft.com/en-us/library/system.windows.controls.menu(v=vs.110).aspx) and [ContextMenu](https://msdn.microsoft.com/en-us/library/system.windows.controls.contextmenu(v=vs.110).aspx) controls.

#### ContextMenu

The [ContextMenu control](https://msdn.microsoft.com/en-us/library/system.windows.controls.contextmenu(v=vs.110).aspx) is the menu that shows up when you right-click the element.

```
<Label Content="red">
    <Label.ContextMenu>
        <ContextMenu>
            <MenuItem Header="_Copy" Command="{Binding CopyCommand}" />
        </ContextMenu>
    </Label.ContextMenu>
</Label>
```

#### Menu

The [Menu control](https://msdn.microsoft.com/en-us/library/system.windows.controls.menu(v=vs.110).aspx) allows you to nest MenuItems forming a menu that can run commands.

```
<Menu>
    <MenuItem Header="_File">
        <MenuItem Header="Quit" Command="{Binding QuitCommand}" />
    </MenuItem>
</Menu>
```

### Selector

The [Selector control](https://msdn.microsoft.com/en-us/library/system.windows.controls.primitives.selector%28v=vs.110%29.aspx) is the base class for:


  - <small>System.Windows.Controls.</small>**ComboBox**
  - <small>System.Windows.Controls.</small>**ListBox**
  - <small>System.Windows.Controls.Primitives.</small>**MultiSelector**
  - <small>System.Windows.Controls.</small>**DataGrid**
  - <small>System.Windows.Controls.Ribbon.</small>**Ribbon**
  - <small>System.Windows.Controls.</small>**TabControl**


#### ComboBox

The [ComboBox control](https://msdn.microsoft.com/en-us/library/system.windows.controls.combobox(v=vs.110).aspx) allows you to select a single option from the collection.

```
<ComboBox>
    <ComboBoxItem Content="Development" />
    <ComboBoxItem Content="Test" />
</ComboBox>
```

To bind an enum to a `ComboBox` you can use [this approach posted on Stack Overflow](http://stackoverflow.com/a/4398752/340760).

#### ListBox

The [ListBox control](https://msdn.microsoft.com/en-us/library/system.windows.controls.listbox(v=vs.110).aspx) allows you to select one or more items from a collection.

```
<ListBox SelectionMode="Multiple">
    <ListBoxItem Content="Dev" />
    <ListBoxItem Content="Test" />
</ListBox>
```


#### DataGrid

The [DataGrid control](https://msdn.microsoft.com/en-us/library/system.windows.controls.datagrid(v=vs.110).aspx) can be used to show tabular data. By default it auto generate columns by reading the public properties of the object.

```
<DataGrid AutoGenerateColumns="True" ItemsSource="{Binding Items}" />
```

#### TabControl
The [TabControl control](https://msdn.microsoft.com/en-us/library/system.windows.controls.tabcontrol(v=vs.110).aspx) allows you to place controls in different tabs.

```
<TabControl>
    <TabItem Header="Home">
        Home Content
    </TabItem>
    <TabItem Header="Second">
        Second Content
    </TabItem>
</TabControl>
```

### StatusBar
The [StatusBar control](https://msdn.microsoft.com/en-us/library/system.windows.controls.primitives.statusbar%28v=vs.110%29.aspx) can contain a collection of controls that will be displayed.

```
<StatusBar>
    <StatusBarItem>
        <Label Content="Status..." />
    </StatusBarItem>
    <StatusBarItem>
        <Label Content="10/10/2020 10:10" />
    </StatusBarItem>
</StatusBar>
```

### TreeView

The [TreeView control](https://msdn.microsoft.com/en-us/library/system.windows.forms.treeview%28v=vs.110%29.aspx) allows to bind items with hierarchy.

```
<TreeView ItemsSource="{Binding Games}">
    <TreeView.ItemTemplate>
        <HierarchicalDataTemplate ItemsSource="{Binding Characters}">
            <TextBlock Text="{Binding Name}" />
        </HierarchicalDataTemplate>
    </TreeView.ItemTemplate>
</TreeView>
```

[![img](https://brunolm.files.wordpress.com/2015/03/treeview.png)](https://brunolm.files.wordpress.com/2015/03/treeview.png)
