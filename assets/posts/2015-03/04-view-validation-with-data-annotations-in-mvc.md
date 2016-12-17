---
layout: post
title: "View validation with Data Annotations and custom client validations in MVC"
date: 2015-03-04 12:00:00 -0300
categories: code
tags:
  - asp.net-mvc
  - c#
  - data-annotations
  - validation
---
In the post [Using Data Annotations to validate models](https://brunolm.wordpress.com/2015/03/04/using-data-annotations-to-validate-models/) I showed that it is possible to keep validations in attributes.

In this post I am going to show how to apply these validations on the client-side.

By default when you create a standard MVC project it creates all initial structure for you, including the setup of the scripts. To enable client-side validation you need two keys under appSettings in your web.config file (which are set by default in the standard template):
<!--more-->

[![img](https://brunolm.files.wordpress.com/2015/03/2015-46-04-08-46-23-925.png)](https://brunolm.files.wordpress.com/2015/03/2015-46-04-08-46-23-925.png)

The object being validated receives the class `input-validation-error` which can be styled. And the error message receives `field-validation-error` which can also be styled. For example, if we want to display a red border and red message:

```csharp
public class NoSwearWords : ValidationAttribute, IClientValidatable
{
    protected override ValidationResult IsValid(object value,
        ValidationContext validationContext)
    {
        string val = value as string ?? "";

        bool valid = !new string[] { "Pussy", "Fuck" }
            .Any(o => val.Contains(o));

        if (!valid)
            return new ValidationResult(
                base.FormatErrorMessage(base.ErrorMessage));

        return null;
    }

    // client-side
    public IEnumerable<ModelClientValidationRule>
        GetClientValidationRules(ModelMetadata metadata
                               , ControllerContext context)
    {
        var rule = new ModelClientValidationRule();

        rule.ValidationType = "noswearwords";
        rule.ErrorMessage = "You cannot use swear words over here";

        yield return rule;
    }
}
```

I am telling it that on the client-side I have a jQuery validator method called "noswearwords" (lowercase name required).

I will decorate the property `Comment` with it:

```csharp
[NoSwearWords]
public string Comment { get; set; }
```

To implement this validation on the client side I have to create the method "noswearwords" and register it on the adapters:

```
<script type="text/javascript">

    $.validator.addMethod("noswearwords",
        function (value, element, param) {
            return !/Pussy|Fuck/i.test(value);
        });

    $.validator.unobtrusive.adapters.add("noswearwords", {},
        function (options) {
            options.rules["noswearwords"] = true;
            options.messages["noswearwords"] = options.message;
        });

</script>
```

Everything else is done automatically for you:

[![img](https://brunolm.files.wordpress.com/2015/03/2015-26-04-09-26-18-429.png)](https://brunolm.files.wordpress.com/2015/03/2015-26-04-09-26-18-429.png)
