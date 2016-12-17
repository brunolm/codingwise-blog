---
layout: post
title: "What are extension methods? How/When to use them?"
date: 2015-05-15 12:00:00 -0300
categories: code
tags:
  - .net
  - c#
  - extension-methods
---
Extension methods are methods that can be created extending existing types without the need to inherit from a class and creating your own custom logic. It can also be applied on interfaces.

[![img](https://brunolm.files.wordpress.com/2015/05/2015-47-15-05-47-11-407.png)](https://brunolm.files.wordpress.com/2015/05/2015-47-15-05-47-11-407.png)

From MSDN:
<blockquote>Extension methods enable you to "add" methods to existing types without creating a new derived type, recompiling, or otherwise modifying the original type.</blockquote>

That means we can extend methods from any type, even types where we dont have access to the source code.

<blockquote>Extension methods are a special kind of static method, but they are called as if they were instance methods on the extended type.</blockquote>

We build extension methods by declaring it as a static method, but there is a little tweak makes it compile into a method that can be called from an instance.
<!--more-->

Extension methods were born in .NET 3.5 together with Linq. Linq was a major feature on the .NET Framework, it introduced several extension methods making data manipulation much easier. Some of the extension methods commonly used are `.Where`, `.Select`, `.Count`...

Ok, so how do we create our own extension methods? Simple! We need a couple of things. First we need to create a **static** class.

I will make an example extending strings. I want to simplify the process to truncate a string, so I can create a method to do that.

```csharp
namespace Example.Extensions
{
    public static class StringExtender
    {
        public static string TruncateAt(this string source
                                        , int maxLength)
        {
            if (source.Length <= maxLength)
            {
                return source;
            }

            return source.Substring(0, maxLength);
        }
    }
}
```

This simple code will truncate a string. Did you notice something different? Yes, the parameter is declared as `this string source`. When we create a static class, a static method and use `this` before the first parameter we are saying that it is an extension method.

Now we can try to use it!

```csharp
"I will be truncated, lol!".TruncateAt(6);
```

Wait, are you getting a compilation error? If you are, the reason is simple. We created the extension method using the namespace `Example.Extensions`. If we try to use it in another namespace we will need to add the using statement (in Visual Studio 2015 the light-bulb is smart enough to add it for you).

No errors? Yey! Did you notice that when we are calling our method we are only passing one parameter instead of two? It is because the first one is the instance itself. The parameters passed to this method will be `"I will be truncated, lol!"` and `6`.

Simple, isnt it? Wanna see some complex examples? What about DistinctBy? It is a method that filters a list leaving only distinct elements comparing by a given expression.

```csharp
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
```

If you are going to manipulate images, you could create a Crop method... And so on, the possibilities are limitless!

Thats really cool, isnt it?

Hey, do you know about the morelinq project? The [morelinq project](https://code.google.com/p/morelinq/source/browse/#hg%2FMoreLinq) is a collection of extension methods that allows you to do even more with Linq. They have many pretty useful methods.

And when exactly is the best time to use extension methods and when should we be implementing/extending classes?

Well, at this point you got the general idea on when to use it. But for further reading you can check [some opinions on Stack Overflow](http://stackoverflow.com/a/787341/340760)
