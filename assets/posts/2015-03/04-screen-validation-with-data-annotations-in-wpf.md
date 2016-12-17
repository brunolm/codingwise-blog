---
layout: post
title: "Screen validation with Data Annotations in WPF"
date: 2015-03-04 12:00:00 -0300
categories: code
tags:
  - c#
  - data-annotations
  - validation
  - wpf
---
In the post [Using Data Annotations to validate models](https://brunolm.wordpress.com/2015/03/04/using-data-annotations-to-validate-models/) I showed that it is possible to keep validations in attributes.

In this post I am going to show how to apply these validations on the client-side.

Note: All your models must implement `INotifyPropertyChanged` and to make it simple and clean I will be using [Fody PropertyChanged nuget packaged](https://github.com/Fody/PropertyChanged).
<!--more-->

In order to tell the screen it should validate the bound property we have to implement the `IDataErrorInfo` interface. For example:

```csharp
[PropertyChanged.ImplementPropertyChanged]
public abstract class PropertyValidateModel : IDataErrorInfo
{
    // check for general model error
    public string Error { get { return null; } }

    // check for property errors
    public string this[string columnName]
    {
        get
        {
            var validationResults = new List<ValidationResult>();

            if (Validator.TryValidateProperty(
                    GetType().GetProperty(columnName).GetValue(this)
                    , new ValidationContext(this)
                      {
                          MemberName = columnName
                      }
                    , validationResults))
                return null;

            return validationResults.First().ErrorMessage;
        }
    }
}
```

This validation method is similar to the validation in the other post, however it validates a property instead of the whole model. With this class I can now inherit from it and my model will automatically be implementing `IDataErrorInfo`.

```csharp
[PropertyChanged.ImplementPropertyChanged]
public class Game : PropertyValidateModel
{
    [Required]
    [StringLength(5)]
    public string Name { get; set; }

    [Required]
    [StringLength(5)]
    public string Genre { get; set; }

    [Required]
    [Range(13, 40)]
    public int MinAge { get; set; }
}
```

On my view I have to bind the properties with some additional settings:

```csharp
<TextBox Text="{Binding Name, UpdateSourceTrigger=PropertyChanged
    , NotifyOnValidationError=True, ValidatesOnDataErrors=True}" />
```


  - `UpdateSourceTrigger` is going to tell the view to notify changes as they happen.
  - `NotifyOnValidationError` is going to notify when there are errors.
  - `ValidatesOnDataErrors` is going to enable validation.


The outcome will be:

[![img](https://brunolm.files.wordpress.com/2015/03/2015-06-04-08-06-55-675.png)](https://brunolm.files.wordpress.com/2015/03/2015-06-04-08-06-55-675.png)

However by simply doing it this way we do not get any error messages displayed, so we do not know what is wrong with data. To display the errors we have to do a little trick with the `Validation.ErrorTemplate`.

The code bellow binds, through a trigger, the `TextBox`s `ToolTip` to the first error encountered in the control. And by setting the `TextBox`s error template we can display the error message by accessing the `AdornedElement` and grabbing the `ToolTip` where the error message is contained. If you do not want to use the `ToolTip` you can use the `Tag` property instead.

```csharp
<Style TargetType="TextBox">
    <Setter Property="Validation.ErrorTemplate">
        <Setter.Value>
            <ControlTemplate>
                <StackPanel>
                    <Border BorderThickness="2" BorderBrush="DarkRed">
                        <StackPanel>
                            <AdornedElementPlaceholder
                                x:Name="errorControl" />
                        </StackPanel>
                    </Border>
                    <TextBlock Text="{Binding AdornedElement.ToolTip
                        , ElementName=errorControl}" Foreground="Red" />
                </StackPanel>
            </ControlTemplate>
        </Setter.Value>
    </Setter>
    <Style.Triggers>
        <Trigger Property="Validation.HasError" Value="true">
            <Setter Property="BorderBrush" Value="Red" />
            <Setter Property="BorderThickness" Value="1" />
            <Setter Property="ToolTip"
                Value="{Binding RelativeSource={RelativeSource Self}
                    , Path=(Validation.Errors)[0].ErrorContent}" />
        </Trigger>
    </Style.Triggers>
</Style>
```

Running the application again:

[![img](https://brunolm.files.wordpress.com/2015/03/2015-13-04-08-13-57-049.png)](https://brunolm.files.wordpress.com/2015/03/2015-13-04-08-13-57-049.png)
