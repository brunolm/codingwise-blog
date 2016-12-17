---
layout: post
title: "WPF Controls: Panels"
date: 2015-03-10 12:00:00 -0300
categories: code
tags:
  - c#
  - controls
  - panel-controls
  - wpf
---
Windows Presentation Foundation (WPF) has the called Panel controls. Those are controls that can contain a set of child controls.

Each Panel has its own particular way of organizing controls.

[![img](https://brunolm.files.wordpress.com/2015/03/2015-57-10-10-57-21-365.png)](https://brunolm.files.wordpress.com/2015/03/2015-57-10-10-57-21-365.png)

<!--more-->

## Panel Controls

Panel controls are everything that derives from `System.Windows.Controls.Panel`. Their main purpose is to group a set of controls in a container.

  - <small>System.Windows.Controls.</small>**Canvas**
  - <small>System.Windows.Controls.</small>**DockPanel**
  - <small>System.Windows.Controls.</small>**Grid**
  - <small>System.Windows.Controls.Primitives.</small>**TabPanel**
  - <small>System.Windows.Controls.Primitives.</small>**ToolBarOverflowPanel**
  - <small>System.Windows.Controls.Primitives.</small>**UniformGrid**
  - <small>System.Windows.Controls.Ribbon.Primitives.</small>**RibbonContextualTabGroupsPanel**
  - <small>System.Windows.Controls.Ribbon.Primitives.</small>**RibbonGalleryCategoriesPanel**
  - <small>System.Windows.Controls.Ribbon.Primitives.</small>**RibbonGalleryItemsPanel**
  - <small>System.Windows.Controls.Ribbon.Primitives.</small>**RibbonGroupItemsPanel**
  - <small>System.Windows.Controls.Ribbon.Primitives.</small>**RibbonQuickAccessToolBarOverflowPanel**
  - <small>System.Windows.Controls.Ribbon.Primitives.</small>**RibbonTabHeadersPanel**
  - <small>System.Windows.Controls.Ribbon.Primitives.</small>**RibbonTabsPanel**
  - <small>System.Windows.Controls.Ribbon.Primitives.</small>**RibbonTitlePanel**
  - <small>System.Windows.Controls.</small>**StackPanel**
  - <small>System.Windows.Controls.</small>**VirtualizingPanel**
  - <small>System.Windows.Controls.</small>**WrapPanel**


Note: This post doesnt cover [Ribbon](https://msdn.microsoft.com/en-us/library/system.windows.controls.ribbon.primitives(v=vs.110).aspx) Panels, but basically they are all the panel types that compose a ribbon bar.

### Canvas

The [Canvas control](https://msdn.microsoft.com/en-us/library/system.windows.controls.canvas(v=vs.110).aspx) allows you to add controls to any position on the screen by informing the coordinates. This is the control you want when developing a game, because you can draw on it.

```
<Canvas>
    <TextBlock Text="Coord =" Canvas.Top="10" Canvas.Left="50" />
</Canvas>
```

### DockPanel

The [DockPanel control](https://msdn.microsoft.com/en-us/library/system.windows.controls.dockpanel(v=vs.110).aspx) can define where elements will be docked within it. We can specify where the elements will be docked by setting `DockPanel.Dock` to the position where they should be docked.
If the element is inside the DockPanel and is not specifying a position it is going to use the remaining space.

```
<DockPanel>
    <Button Background="Green" DockPanel.Dock="Top" Height="25" />
    <Button Background="Blue" DockPanel.Dock="Left" Width="25" />
    <Button Background="Orange" DockPanel.Dock="Right" Width="25" />
    <Button Background="Yellow" DockPanel.Dock="Bottom" Height="25" />
    <Button Background="Purple" />
</DockPanel>
```

The above code will result in the image bellow. Notice that elements docked last have less space available to them than the elements docked first.

[![img](https://brunolm.files.wordpress.com/2015/03/dockpanel.jpg)](https://brunolm.files.wordpress.com/2015/03/dockpanel.jpg)

### Grid

The [Grid control](https://msdn.microsoft.com/en-us/library/system.windows.controls.grid(v=vs.110).aspx) allows you to define rows and columns by creating `ColumnDefinitions` and `RowDefinitions`.

You can set their size to a number of pixels, `Auto` (which means resize itself to the contents occupied space), "*" or "N*" (* = give me what is left; 2* = give me two pieces of what is left; 5* = five pieces of what is left...).

And then to place the controls in their respective rows and columns you add `Grid.Row="X"` and `Grid.Column="Y"` to the controls tag. You can also set `Grid.RowSpan` and `Grid.ColumnSpan` to occupy more rows/columns.

```
<Grid>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="25" />
        <ColumnDefinition Width="Auto" />
        <ColumnDefinition Width="*" />
        <ColumnDefinition Width="2*" />
    </Grid.ColumnDefinitions>

    <Grid.RowDefinitions>
        <RowDefinition Height="25" />
        <RowDefinition Height="Auto" />
        <RowDefinition Height="*" />
        <RowDefinition Height="3*" />
    </Grid.RowDefinitions>

    <Button Content="B" Grid.Row="0" Grid.Column="0" />
    <Button Content="B" Grid.Row="0" Grid.Column="1" />
    <Button Content="B" Grid.Row="0" Grid.Column="2" />
    <Button Content="B" Grid.Row="0" Grid.Column="3" Height="44" />

    <Button Content="B" Grid.Row="1" Grid.Column="0" />
    <Button Content="B" Grid.Row="1" Grid.Column="1" Height="50" />
    <Button Content="B" Grid.Row="1" Grid.Column="2" />
    <Button Content="B" Grid.Row="1" Grid.Column="3" />

    <Button Content="Button" Grid.Row="2" Grid.Column="0"
            Grid.RowSpan="2" Grid.ColumnSpan="4"
            />

</Grid>
```

Generates:

[![img](https://brunolm.files.wordpress.com/2015/03/2015-17-10-10-17-00-228.png)](https://brunolm.files.wordpress.com/2015/03/2015-17-10-10-17-00-228.png)

### TabPanel

The [TabPanel control](https://msdn.microsoft.com/en-us/library/system.windows.controls.primitives.tabpanel(v=vs.110).aspx) is the control used internally by the TabControl to contain the set of tabs.

```
<TabControl>
    <TabItem Header="Home" IsSelected="True">
        <Label Content="Hi Home" />
    </TabItem>
    <TabItem Header="Tab1" IsSelected="True">
        <Label Content="Hi Tab1" />
    </TabItem>
    <TabItem Header="Tab2" IsSelected="True">
        <Label Content="Hi Tab2" />
    </TabItem>
</TabControl>
```

[![img](https://brunolm.files.wordpress.com/2015/03/tabpanel.png)](https://brunolm.files.wordpress.com/2015/03/tabpanel.png)

You can use it to create a similar look using some controls. It is somewhat similar to a horizontal oriented StackPanel. For example:

```
<TabPanel>
    <Button Content="Button 1" />
    <Button Content="Button 2" />
    <Button Content="Button 3" />
    <Button Content="Button 4" />
</TabPanel>
```

### ToolBarOverflowPanel

The [ToolBarOverflowPanel](https://msdn.microsoft.com/en-us/library/system.windows.controls.primitives.toolbaroverflowpanel(v=vs.110).aspx) control is used internally by the toolbar to handle overflow of items. When there are more items it can show the extra content is added under the arrow button.

### UniformGrid

The [UniformGrid control](https://msdn.microsoft.com/en-us/library/system.windows.controls.primitives.uniformgrid(v=vs.110).aspx) renders equal sized columns and rows. You can specify the number of columns and rows it is going to generate and the controls declared inside will be placed in their respective row/column by the order they are declare. For example:

```
<UniformGrid Columns="2" Rows="3" Height="100"
    VerticalAlignment="Top">
    <Label Content="Name" VerticalAlignment="Center" />
    <TextBox VerticalAlignment="Center" />

    <Label Content="RequiredAge" VerticalAlignment="Center" />
    <TextBox VerticalAlignment="Center" />

    <Label Content="Actvie" VerticalAlignment="Center" />
    <TextBox VerticalAlignment="Center" />
</UniformGrid>
```

Results in:

[![img](https://brunolm.files.wordpress.com/2015/03/2015-57-10-10-57-21-365.png)](https://brunolm.files.wordpress.com/2015/03/2015-57-10-10-57-21-365.png)

### StackPanel

The [StackPanel control](https://msdn.microsoft.com/en-us/library/system.windows.controls.stackpanel(v=vs.110).aspx) is the simplest and easiest control to use. It simply displays elements by the order they are declare, by default it has the `Orientation` set to `Vertical` which causes the controls to render one above the other:

```
<StackPanel>
    <Button Content="Button" />
    <Button Content="Button" />
    <Button Content="Button" />
</StackPanel
```

[![img](https://brunolm.files.wordpress.com/2015/03/2015-11-10-11-11-46-891.png)](https://brunolm.files.wordpress.com/2015/03/2015-11-10-11-11-46-891.png)

You can manually set the Orientation to Horizontal, which will cause elements to be rendered that way:

```
<StackPanel Orientation="Horizontal">
    <Button Content="Button" />
    <Button Content="Button" />
    <Button Content="Button" />
</StackPanel
```

[![img](https://brunolm.files.wordpress.com/2015/03/2015-12-10-11-12-46-288.png)](https://brunolm.files.wordpress.com/2015/03/2015-12-10-11-12-46-288.png)

### VirtualizingPanel

The [VirtualizingPanel control](https://msdn.microsoft.com/en-us/library/system.windows.controls.virtualizingpanel(v=vs.110).aspx) is an abstract control. The types deriving from it can set `IsVirtualizing` to true indicating the control will only draw the controls in the screen that can be visible. The other elements arent rendered unless you scroll them into view.

Example:

```
<ListBox VirtualizingStackPanel.IsVirtualizing="True">
    <ListBoxItem Content="Test" />
    ...
</ListBox>
```

### WrapPanel

The [WrapPanel control](https://msdn.microsoft.com/en-us/library/system.windows.controls.wrappanel(v=vs.110).aspx) can be used to handle wrapping when the contents of the panel go over its size.

[![img](https://brunolm.files.wordpress.com/2015/03/ezgif-com-crop.gif)](https://brunolm.files.wordpress.com/2015/03/ezgif-com-crop.gif)
