---
layout: post
title: "Getting QueryString values in Javascript"
date: 2015-03-05 12:00:00 -0300
categories: code
tags:
  - javascript
  - querystring
---
QueryString refers to URL parameters that can be passed on. There are several approaches to retrieve those values in Javascript.

One method I came up with is:
<!--more-->

```
function GetQueryString() {
    var a = window.location.search.substr(1).split(&);
    if (a == "") return {}; // if no params return empty object
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split(=, 2);
        if (p.length == 1) // no value, consider empty
            b[p[0]] = "";
        else // if param has a value grab it
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b; // return map object
}

// usage
var qs = GetQueryString();
```

With an URL like `?topic=123&amp;name=query+string`, the following will return:

```
qs["topic"];    // 123
qs["name"];     // query string
qs["nothere"];  // undefined (object)
```

By tearing down Googles code we can find a fragment of code that looks like this:

```
function (b) {
    var c = typeof b === "undefined";
    if (a !== h && c) return a;
    for (var d = {}, b = b || k[B][vb], e = b[p]("?"), f = b[p]("#"), b = (f === -1 ? b[Ya](e + 1) : [b[Ya](e + 1, f - e - 1), "&", b[Ya](f + 1)][K](""))[z]("&"), e = i.dd ? ia : unescape, f = 0, g = b[w]; f < g; ++f) {
        var l = b[f][p]("=");
        if (l !== -1) {
            var q = b[f][I](0, l),
                l = b[f][I](l + 1),
                l = l[Ca](/\+/g, " ");
            try {
                d[q] = e(l)
            } catch (A) {}
        }
    }
    c && (a = d);
    return d
}
```

"Translating" this code it means: go through the parameters and get keys and values by navigating on it using `substring`.

They start to look for parameters on the url from ? and also from the hash #. Then for each parameter they split in the equal sign `b[f][p]("=")` (which looks like `indexOf`, they use the position of the char to get the key/value). Having it split they check whether the parameter has a value or not, if it has they store the value of `d`, if not it just continue.

In the end the object `d` is returned, handling escaping and the + sign. This object is just like mine, it has the same behavior.
