---
layout: post
title: "Using Data Annotations to validate models"
date: 2015-03-04 12:00:00 -0300
categories: code
tags:
  - .net
  - c#
  - data-annotations
  - validation
---
The .NET Framework provides us a set of attributes that we can use to validate objects. By using the namespace `System.ComponentModel.DataAnnotations` we can annotate our models properties with validation attributes.<!--more-->

There are attributes to mark a property as required, set a maximum length and so on. For example:

```csharp
public class Game
{
    [Required]
    [StringLength(20)]
    public string Name { get; set; }

    [Range(0, 100)]
    public decimal Price { get; set; }
}
```

To check if an instance is valid we can use the following code:

```csharp
Validator.TryValidateObject(obj
    , new ValidationContext(obj)
    , results, true);
```

The return is `true` if the object does not have any errors or `false` if it does have errors. And the parameter `results` is populated with errors, if any. [The full definition of this method can be found at MSDN documentation](https://msdn.microsoft.com/en-us/library/dd411772%28v=vs.110%29.aspx).

To test our Game class we can use the following code:

```csharp
static void Main(string[] args)
{
    ICollection<ValidationResult> results = null;

    var invalidGame = new Game
    {
        Name = "My name is way over 20 characters",
        Price = 300,
    };

    if (!Validate(invalidGame, out results))
    {
        Console.WriteLine(String.Join("
", results.Select(o => o.ErrorMessage)));
    }
    else
    {
        Console.WriteLine("Im a valid object!");
    }

    Console.ReadKey(true);
}

static bool Validate<T>(T obj, out ICollection<ValidationResult> results)
{
    results = new List<ValidationResult>();

    return Validator.TryValidateObject(obj, new ValidationContext(obj), results, true);
}
```

Running it results in:
[![img](https://brunolm.files.wordpress.com/2015/03/2015-11-04-12-11-43-490.png)](https://brunolm.files.wordpress.com/2015/03/2015-11-04-12-11-43-490.png)

If we then change the properties to valid values:

```csharp
var validGame = new Game
{
    Name = "Magicka",
    Price = 5,
};
```

And test again:
[![img](https://brunolm.files.wordpress.com/2015/03/2015-14-04-12-14-55-202.png)](https://brunolm.files.wordpress.com/2015/03/2015-14-04-12-14-55-202.png)

It is also possible to create your own attributes. All you have to do is inherit from `ValidationAttribute`. In the following example the attribute is going to check if the value is divisible by 7. If not it will return an error message.

```csharp
public class DivisibleBy7Attribute : ValidationAttribute
{
    public DivisibleBy7Attribute()
        : base("{0} value is not divisible by 7")
    {
    }

    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        decimal val = (decimal)value;

        bool valid = val % 7 == 0;

        if (valid)
            return null;

        return new ValidationResult(base.FormatErrorMessage(validationContext.MemberName)
            , new string[] { validationContext.MemberName });
    }
}
```

And in the object to be validated:

```csharp
[DivisibleBy7]
public decimal Price { get; set; }
```

If the validation fails it is going to return the following error message:
[![img](https://brunolm.files.wordpress.com/2015/03/2015-31-04-12-31-04-005.png)](https://brunolm.files.wordpress.com/2015/03/2015-31-04-12-31-04-005.png)
## All built-in validation attributes
A [full list of validation attributes can be found at MSDN documentation](https://msdn.microsoft.com/en-us/library/system.componentmodel.dataannotations.validationattribute(v=vs.110).aspx#inheritanceContinued).
