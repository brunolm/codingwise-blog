---
layout: post
title: "General naming rules from .NET Framework Design Guidelines"
date: 2015-03-05 12:00:00 -0300
categories: code
tags:
  - .net
  - guidelines
  - naming
---
The [.NET Framework Design Guidelines](https://msdn.microsoft.com/en-us/library/ms229042(v=vs.110).aspx) is a set of guidelines provided by Microsoft to keep an unified programming model.

In this post I am going to summarize some of the main rules, but you should really read the entire document.
<!--more-->

## Capitalization Conventions

  - **DO** use **P**ascal**C**asing for Namespace
  - **DO** use **P**ascal**C**asing for Classes
  - **DO** use **P**ascal**C**asing for Interfaces
  - **DO** use **P**ascal**C**asing for Structs
  - **DO** use **P**ascal**C**asing for Type
  - **DO** use **P**ascal**C**asing for Interface
  - **DO** use **P**ascal**C**asing for Method
  - **DO** use **P**ascal**C**asing for Property
  - **DO** use **P**ascal**C**asing for Event
  - **DO** use **P**ascal**C**asing for static/readonly/const Fields
  - **DO** use **P**ascal**C**asing for Enum names and values
  - **DO** use camel**C**asing for member variables
  - **DO** use camel**C**asing for parameters
  - **DO** use camel**C**asing for local variables


## Naming Guidelines

  - **DO** name boolean variables with an affirmation (Visible; CanSeek...)
  - **Optionally** you can also prefix boolean variables with "Is", "Can" or "Has", but only where it adds value
  - **DO** choose readability over brevity
  - **DO** choose easily readable and meaningful names
  - **DO** use generic CLR type names (use int instead of Int32)
  - **DO** name a namespace after this template &lt;Company&gt;.(&lt;Product&gt;|&lt;Technology&gt;)[.&lt;Feature&gt;][.&lt;Subnamespace&gt;]


  - **X DO NOT** use underscores, hyphens, or any other nonalphanumeric characters  (_, m_, s_, etc.)
  - **X DO NOT** use Hungarian notation
  - **X DO NOT** use abbreviations or contractions as part of identifier names


## Prefixes and Suffixes

  - **DO** prefix Interfaces names with the letter "I"
  - **DO** prefix descriptive type parameters with the letter "T" (TSource...)
  - **DO** suffix custom attribute classes with "Attribute"
  - **DO** suffix event args classes with "EventArgs"
  - **DO** suffix custom exception classes with "Exception"
  - **DO** suffix set of elements classes with "Collection"
  - **DO** suffix custom stream classes with "Stream"


## Class Structure

Usings statements should be inside the namespace.

The order of elements in classes should be:

  - Fields
  - Constructors
  - Properties
  - Events
  - Methods
  - Private interface implementations
  - Nested types

And each group should have their elements in alphabetical order.

### See also

There is also [a post from Brad Abrams](http://blogs.msdn.com/b/brada/archive/2005/01/26/361363.aspx) that summarizes some of the guidelines.
