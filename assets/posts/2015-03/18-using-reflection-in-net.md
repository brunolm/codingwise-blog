---
layout: post
title: "Using Reflection in .NET"
date: 2015-03-18 12:00:00 -0300
categories: code
tags:
  - .net
  - c#
  - reflection
---
Reflection uses the object of type `Type` that describes assemblies, modules, types...

Through reflection it is possible to do many different things, for example:

  - Dynamically create object instances
  - Dynamically invoke methods
  - Check if an object implements an interface
  - Manipulate attributes set on objects
  - Mock values for testing
  - Retrieve debug information


These are just a few things you can do with it. In this post Im going to show a simple example on how to use it to get descriptions on enums.
<!--more-->

Say you want to display an enum in a dropdown. But you want to have code/description rather than just displaying the code. You can annotate your enum with the description attribute:

```csharp
public enum PurposeKind
{
    Development,

    [Description("Functional Test")]
    Test,

    [Description("Unit Test")]
    UnitTest,
}
```

And to get the description we can use reflection. I will be getting the value/description and then I will add it to a dictionary:

```csharp
static void Main(string[] args)
{
    var valuesAndDescriptions = new Dictionary<PurposeKind, string>();

    // gets the Type that contains all the info required
    // to manipulate this type
    Type enumType = typeof(PurposeKind);

    // I will get all values and iterate through them
    var enumValues = enumType.GetEnumValues();

    foreach (PurposeKind value in enumValues)
    {
        // with our Type object we can get the information about
        // the members of it
        MemberInfo memberInfo =
            enumType.GetMember(value.ToString()).First();

        // we can then attempt to retrieve the
        // description attribute from the member info
        var descriptionAttribute =
            memberInfo.GetCustomAttribute<DescriptionAttribute>();

        // if we find the attribute we can access its values
        if (descriptionAttribute != null)
        {
            valuesAndDescriptions.Add(value,
                descriptionAttribute.Description);
        }
        else
        {
            valuesAndDescriptions.Add(value, value.ToString());
        }
    }
}
```

Results in

```
Development,Development
Test,Functional Test
UnitTest,Unit Test
```

[See System.Type on MSDN](https://msdn.microsoft.com/en-us/library/system.type%28v=vs.110%29.aspx) for a full reference.
