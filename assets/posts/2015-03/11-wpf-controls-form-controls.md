---
layout: post
title: "WPF Controls: Form controls"
date: 2015-03-11 12:00:00 -0300
categories: code
tags:
  - c#
  - controls
  - form-controls
  - wpf
---
This post covers some of the most common controls found in forms.

All controls where the user can input data have by default the [binding set to two-way mode](https://brunolm.wordpress.com/2015/03/01/data-binding/). It means bound data will be updated on the source if the user change values on the screen (given that the model [implements INotifyPropertyChanged](https://brunolm.wordpress.com/2015/03/05/nuget-package-fody/)).

[![img](https://brunolm.files.wordpress.com/2015/03/2015-36-11-01-36-31-906.png)](https://brunolm.files.wordpress.com/2015/03/2015-36-11-01-36-31-906.png)
<!--more-->

## Button

The [Button control](https://msdn.microsoft.com/en-us/library/system.windows.controls.button(v=vs.110).aspx) is a `ContentControl` which means you have to set the `Content` property of it in order to display some text.

```
<Button Content="Click me!" />
```

By being a `ContentControl` it also means that it can contain anything, not just text. This allows you to create, for example, a button with an image.

```
<Button Command="{Binding AddCommand}">
    <StackPanel>
        <Image Source="/Treant;component\Imgs\SmallAdd.png" />
        <Label Content="_Add" />
    </StackPanel>
</Button>
```

[![img](https://brunolm.files.wordpress.com/2015/03/2015-06-11-01-06-41-636.png)](https://brunolm.files.wordpress.com/2015/03/2015-06-11-01-06-41-636.png)

A button has events that you can subscribe to, the most common one is the click event.

[![img](https://brunolm.files.wordpress.com/2015/03/btnclick.jpg)](https://brunolm.files.wordpress.com/2015/03/btnclick.jpg)

And then you can generate a handler for it. However in MVVM you will want to [bind button actions to an ICommand](https://brunolm.wordpress.com/2015/03/01/icommand-and-relaycommand/).

```
<Button Content="Click me"
        Command="{Binding ClickMeCommand}"
        CommandParameter=""
/>
```

See also [RepeatButton](https://msdn.microsoft.com/en-us/library/system.windows.controls.primitives.repeatbutton(v=vs.110).aspx) and [ToggleButton](https://msdn.microsoft.com/en-us/library/system.windows.controls.primitives.togglebutton(v=vs.110).aspx).

## CheckBox

The [CheckBox control](https://msdn.microsoft.com/en-us/library/system.windows.controls.checkbox%28v=vs.110%29.aspx) allows you to check/uncheck and "half-check". You can set IsThreeState to it and handle a third checkbox state (`null` value).

```
<CheckBox Content="CheckBox"
          IsThreeState="True"
          IsChecked="{Binding MyNullableBoolProperty}"
          />
```

## ComboBox

The [ComboBox control](https://msdn.microsoft.com/en-us/library/system.windows.controls.combobox%28v=vs.110%29.aspx) allows you to bind a list of objects that are going to be available to select. And by binding `SelectedItem` you can get the selected object on your model.

```
<ComboBox
    ItemsSource="{Binding MyObservableCollection}"
    SelectedItem="{Binding MySelectedItem}" />
```

## Label

The [Label control](https://msdn.microsoft.com/en-us/library/system.windows.controls.label%28v=vs.110%29.aspx) is a control that allows you to display some text. If the control gets disabled it will be grayed out (while a TextBlock will not).

The label control has a special feature that allows you to specify an access key:

```
<Label Content="La_bel" />
```

## PasswordBox

The [PasswordBox control](https://msdn.microsoft.com/en-us/library/system.windows.controls.passwordbox%28v=vs.110%29.aspx) allows you to mask the user input. It also stores the input into a [SecureString](https://msdn.microsoft.com/en-us/library/system.security.securestring%28v=vs.110%29.aspx) object.

The password is not bindable. To be able to read the password the user entered you need a different approach. The easiest way is to send the password control as a parameter in a command, for example:

```
<PasswordBox x:Name="passwordBox"
             PasswordChar="" />

<Button Content="Log in"
        Command="{Binding LoginCommand}"
        CommandParameter="{Binding ElementName=passwordBox}" />
```

And then on the button execute method cast the parameter to a `PasswordBox` and get the property `Password` from it.

## RadioButton

The [RadioButton control](https://msdn.microsoft.com/en-us/library/system.windows.controls.radiobutton%28v=vs.110%29.aspx) allows you to give some options but only one from the same `GroupName` will be selectable at a time.

```
<RadioButton Content="RB" GroupName="X"
             IsChecked="True"
             />
<RadioButton Content="RB2" GroupName="X" />
<RadioButton Content="RB3" GroupName="Y"
             IsChecked="True"
             />
```

## TextBlock

The [TextBlock control](https://msdn.microsoft.com/en-us/library/system.windows.controls.textblock%28v=vs.110%29.aspx) is a control that allows you to display some text. If the control gets disabled it will <u>not</u> be grayed out (while a Label will).

```
<TextBlock Text="TextBlock" />
```

## TextBox

The [TextBox control](https://msdn.microsoft.com/en-us/library/system.windows.controls.textbox%28v=vs.110%29.aspx) allows the user to input values.

```
<TextBox Text="{Binding Name}" />
```

To allow multiple lines you have to set `AcceptsReturn` to true.

## Slider

The [Slider control](https://msdn.microsoft.com/en-us/library/system.windows.controls.slider%28v=vs.110%29.aspx) allows you to select a numeric value through a slider.

```
<Slider Minimum="0" Maximum="100"
    Value="{Binding MyDoubleSliderValue}" />
```
