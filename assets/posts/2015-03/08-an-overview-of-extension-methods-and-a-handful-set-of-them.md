---
layout: post
title: "An overview of Extension Methods and a handful set of them"
date: 2015-03-08 12:00:00 -0300
categories: code
tags:
  - c#
  - extension-methods
---
Extension methods are methods that you can add to instances without necessarily having access to the class source.

Linq methods were implemented as Extension Methods.

This is really useful when you need to apply some common complex action on top of some object. I personally think you should replace any Util class you might have to extension methods, it looks more semantically correct.
<!--more-->

To create an extension method you have to declare a static class and static methods. And then by using the keyword `this` on the parameter you are saying that object calling the method is going to be passed as the first parameter. In the example bellow I am extending a string adding a method to shuffle it.

```csharp
public static class StringExtender
{
    public static string Shuffle(this String source)
    {
        var rnd = new Random();

        return String.Join("", source.OrderBy(o => rnd.Next()));
    }
}
```

I can then use it in my code.

```csharp
string helloWorld = "Hello World";
string shuffled = helloWorld.Shuffle();
```

Note: If you extension methods class is in a different namespace you might have to manually include it in the file you want to use it. Same happens with Linq, if it is not in your usings and you try to use `Where()` it is not going to recognize that you need to include `using System.Linq;`.

Some useful extension methods are:

## IEnumerable

```csharp
public static class IEnumerableExtender
{
    /// <summary>
    /// Loops through the collection executing an action.
    /// </summary>
    /// <typeparam name="TSource">The type of the elements of source.</typeparam>
    /// The sequence to loop.
    /// Action to execute on each element.
    /// <exception cref="System.NullReferenceException">source is null.</exception>
    public static void ForEach<TSource>(this IEnumerable<TSource> source, Action<TSource> action)
    {
        foreach (var item in source)
        {
            action(item);
        }
    }

    /// <summary>
    /// Loops through the collection executing an action providing the element index.
    /// </summary>
    /// <typeparam name="TSource">The type of the elements of source.</typeparam>
    /// Enumerable collection.
    /// Action to execute on each element.
    /// <exception cref="System.NullReferenceException">source is null.</exception>
    public static void ForEach<TSource>(this IEnumerable<TSource> source, Action<TSource, int> action)
    {
        int i = 0;
        foreach (var item in source)
        {
            action(item, i++);
        }
    }

    /// <summary>
    /// Returns distinct elements from a sequence.
    /// </summary>
    /// <typeparam name="TSource">The type of the elements of source.</typeparam>
    /// <typeparam name="TKey">The type of the key returned by keySelector.</typeparam>
    /// The sequence to remove duplicate elements from.
    /// A function to extract the key for each element.
    /// An System.Collections.Generic.IEqualityComparer&lt;T&gt; to compare keys.
    /// <exception cref="System.ArgumentNullException">source or keySelector is null.</exception>
    /// <returns></returns>
    public static IEnumerable<TSource> DistinctBy<TSource, TKey>(this IEnumerable<TSource> source,
        Func<TSource, TKey> keySelector, IEqualityComparer<TKey> comparer = null)
    {
        if (source == null) throw new ArgumentNullException("source");
        if (keySelector == null) throw new ArgumentNullException("keySelector");

        var keys = new HashSet<TKey>(comparer);
        foreach (var element in source)
        {
            if (keys.Add(keySelector(element)))
            {
                yield return element;
            }
        }
    }
}
```


## Object

Clone requires [Json.NET](https://brunolm.wordpress.com/2015/03/06/nuget-package-json-net/).

```csharp
public static class ObjectExtender
{
    /// <summary>
    /// Validates the object using the data annotations.
    /// </summary>
    /// <typeparam name="T">Type of the object to be validated.</typeparam>
    /// Object instance to be validated.
    /// <returns>Validation results.</returns>
    public static ICollection<ValidationResult> Validate<T>(this T obj) where T : class
    {
        ICollection<ValidationResult> results = new List<ValidationResult>();

        Validator.TryValidateObject(obj, new ValidationContext(obj), results, true);

        return results;
    }

    /// <summary>
    /// Perform a deep copy of the object, using Json as a serialization method.
    /// </summary>
    /// <typeparam name="T">The type of object being clonned.</typeparam>
    /// The object instance to clone.
    /// <returns>The cloned object.</returns>
    public static T Clone<T>(this T source)
    {
        if (Object.ReferenceEquals(source, null))
        {
            return default(T);
        }

        return JsonConvert.DeserializeObject<T>(JsonConvert.SerializeObject(source));
    }

    /// <summary>
    /// Tries to change the type of an object.
    /// </summary>
    /// <typeparam name="T">Type to converto to.</typeparam>
    /// Object to convert.
    /// The object to receive the new value. If conversion fails assign default(T).
    /// <returns>Whether or not the value was converted.</returns>
    public static bool TryConvertType<T>(this object value, out T convertedValue)
    {
        try
        {
            convertedValue = (T)Convert.ChangeType(value, typeof(T));

            return true;
        }
        catch
        {
            convertedValue = default(T);

            return false;
        }
    }


    public static bool HasAttribute(this object value, Type attributeType, bool inherit = true)
    {
        if (value == null)
            return false;

        return value.GetType().GetCustomAttributes(attributeType, inherit).Any<object>();
    }

    public static bool HasAttribute(this object value, string propertyName, Type attributeType, bool inherit = true)
    {
        if (value == null)
            return false;

        PropertyInfo property = value.GetType().GetProperty(propertyName);

        if (propertyName == null)
        {
            return false;
        }

        return property.GetCustomAttributes(attributeType, inherit).Any<object>();
    }
}
```

## String

```csharp
public static class StringExtender
{
    private static Regex ExtraSpace = new Regex(@"\s{2,}", RegexOptions.Compiled);

    private static Regex SlugInvalids = new Regex(@"[^a-z0-9\s-]", RegexOptions.Compiled);
    private static Regex SlugSpaces = new Regex(@"\s+|(-{2,})", RegexOptions.Compiled);

    private static Regex WebTextNewLine = new Regex(@"(
?
)+", RegexOptions.Compiled);

    public static string Slugify(this String s)
    {
        if (s == null)
            return "";

        string str = s.RemoveDiacritics().ToLower();

        str = SlugInvalids.Replace(str, "");
        str = SlugSpaces.Replace(str, "-");
        str = str.Trim().Substring(0, str.Length <= 80 ? str.Length : 80).TrimEnd(-);

        return str;
    }

    public static string AsWebText(this String s)
    {
        s = HttpUtility.HtmlEncode(s);
        s = WebTextNewLine.Replace(s, "<br><br>");
        s = ExtraSpace.Replace(s, " ");

        return s;
    }

    public static string RemoveDiacritics(this String s)
    {
        if (s == null)
            return s;

        var normalizedString = s.Normalize(NormalizationForm.FormD);
        var stringBuilder = new StringBuilder();

        foreach (var c in normalizedString)
        {
            var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
            if (unicodeCategory != UnicodeCategory.NonSpacingMark)
            {
                stringBuilder.Append(c);
            }
        }

        return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
    }
}
```

## Numeric

```csharp
public static class NumericExtender
{
    private static IList<string> Units = new List<string> { "B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" };

    public static string ToFileSize(this double bytes, int precision = 2)
    {
        double y = Math.Min(Math.Floor((double) (((bytes > 0.0) ? Math.Log(bytes) : 0.0) / Math.Log(1024.0))), (double) (Units.Count - 1));
        double num2 = bytes / Math.Pow(1024.0, y);
        return string.Format("{0} {1}", num2.ToString((y == 0.0) ? "F0" : string.Format("F{0}", precision.ToString())), Units[(int) y]);
    }

    public static string ToFileSize(this int bytes, int precision = 2)
    {
        return ((double) bytes).ToFileSize(precision);
    }

    public static string ToFileSize(this long bytes, int precision = 2)
    {
        return ((double) bytes).ToFileSize(precision);
    }

    public static string ToFileSize(this uint bytes, int precision = 2)
    {
        return ((double) bytes).ToFileSize(precision);
    }

    public static string ToFileSize(this ulong bytes, int precision = 2)
    {
        return ((double) bytes).ToFileSize(precision);
    }
}
```

The possibilities are limitless, there is a [website called extensionmethod.net](http://extensionmethod.net/) where you can find or submit extension methods.
