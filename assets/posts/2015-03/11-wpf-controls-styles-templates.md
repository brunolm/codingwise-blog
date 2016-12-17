---
layout: post
title: "WPF Controls: Styles &amp;amp; Templates"
date: 2015-03-11 12:00:00 -0300
categories: code
tags:
  - c#
  - controls
  - style
  - template
---
Windows Presentation Foundation (WPF) has a lot of controls that can be highly customized.

Every WPF control has a `Template` which is the main control template, you can overwrite a control template entirely.

Most of WPF controls inherit from `ContentControl` which allows you to put anything inside them. A `ListBox` for example allows you to put highly customized controls for each item bound. An example of listbox items can be found in the image bellow. Each item is rendered as a sort of rectangle with some text inside.

[![img](https://brunolm.files.wordpress.com/2015/03/2015-16-10-09-16-33-446.png)](https://brunolm.files.wordpress.com/2015/03/2015-16-10-09-16-33-446.png)
<!--more-->

## Styles

Styles are a list of values that will be set on the control properties. You can set properties and events.

A Style can be defined in any control Resource. If you define a Key you have to refer to it in the elements you want to apply the style to, it is like setting a class of a tag in CSS. And in some cases you can omit the `x:Key` and specify only the `TargetType`, by doing that you are going to apply the style to all elements of that tag. Like creating a CSS for tags.

```
<StackPanel>
    <StackPanel.Resources>
        <Style x:Key="hugeStyle" TargetType="Label">
            <Setter Property="FontSize" Value="100" />
        </Style>
    </StackPanel.Resources>

    <Label Style="{StaticResource hugeStyle}" Content="Hugeee" />
</StackPanel>
```

## Templates

WPF controls have templates that can be set. `ItemsControl` have the `ItemTemplate` that can be overwritten to display data in a custom format. By default a listbox converts the object to a string. If you want to display custom data in a custom format you have to change the template. In a template the context of your bindings is set to the element being bound.

```
<ListBox>
    <ListBox.ItemTemplate>
        <DataTemplate>
            <StackPanel>
                <Label Content="{Binding Name}" />
                <Label Content="{Binding Age}" />
            </StackPanel>
        </DataTemplate>
    </ListBox.ItemTemplate>
</ListBox>
```

This way you can customize any WPF control.
