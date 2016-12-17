---
layout: post
title: "Nuget Package: Json.NET"
date: 2015-03-06 12:00:00 -0300
categories: code
tags:
  - asp.net-mvc
  - c#
  - json.net
  - nuget-package
---
[Json.NET](http://www.newtonsoft.com/json) is a must have nuget package when you are working with web APIs. And it can be pretty handy in many other cases as well.

The [documentation includes over a hundred examples](http://www.newtonsoft.com/json/help/html/Samples.htm) on how to use it.
<!--more-->

It can be used to easily Clone objects by serializing and deserializing:

```csharp
public static T Clone<T>(this T source)
{
    if (Object.ReferenceEquals(source, null))
    {
        return default(T);
    }

    return JsonConvert.DeserializeObject<T>(
        JsonConvert.SerializeObject(source)
    );
}
```

Json.NET can handle ["a wide variety of .NET objects"](http://www.newtonsoft.com/json/help/html/SerializationGuide.htm), it serializes the information required to revert it back later.

It is possible to map a property to a name but adding the attribute `JsonPropertyAttribute`:

```csharp
public class Game
{
    public int ID { get; set; }

    public string Name { get; set; }

    [JsonProperty(propertyName: "price_value")]
    public decimal Price { get; set; }
}
```

When serialized generates:
```csharp
public static void DynamicJsonExample()
{
    var editGameViewModel = new EditGameViewModel
    {
        Name = "Breath of Fire IV",
        Price = 1337.00M,
    };

    var json = JsonConvert.SerializeObject(editGameViewModel);

    dynamic jsonObj = JsonConvert.DeserializeObject(json);

    string name = jsonObj.Name; // Breath of Fire IV
    decimal price = jsonObj.Price; // 1337
    string expt = jsonObj.NotSerializedThingIsNull; // null
}
```

[Json.NET on Stack Overflow](http://stackoverflow.com/questions/tagged/json.net?sort=votes&amp;pageSize=50)
