---
layout: post
title: "The MVVM pattern in WPF"
date: 2015-03-21 12:00:00 -0300
categories: code
tags:
  - c#
  - mvvm
  - wpf
---
In WPF we have the Model-View-ViewModel (MVVM) pattern. This pattern was created to allow you to separate concerns in a way that your business logic is going to be decoupled from your interface.

What happens in this pattern is that your View is going to be purely an user interface. Your ViewModel is going to contain the interface logic, it will be connected to your View through bindings and communicate through notifications. And your Model (for example a database model class) will be able to exchange data directly with your ViewModel.

[From MSDN](https://msdn.microsoft.com/en-us/library/gg405484%28v=pandp.40%29.aspx):

[![img](https://brunolm.files.wordpress.com/2015/03/mvvm.png)](https://brunolm.files.wordpress.com/2015/03/mvvm.png)
<!--more-->

So it is basically separated this way:

## Model

  - Data


## View

  - [Panel controls](https://brunolm.wordpress.com/2015/03/10/wpf-controls-panels/)
  - [Form controls](https://brunolm.wordpress.com/2015/03/11/wpf-controls-form-controls/)
  - [Items controls](https://brunolm.wordpress.com/2015/03/11/wpf-controls-items-controls/)
  - [Styles &amp; Templates](https://brunolm.wordpress.com/2015/03/11/wpf-controls-styles-templates/)


## ViewModel

  - [Data Binding](https://brunolm.wordpress.com/2015/03/01/data-binding/)
  - [Command](https://brunolm.wordpress.com/2015/03/01/icommand-and-relaycommand/)
  - [PropertyChanged](https://brunolm.wordpress.com/2015/03/05/nuget-package-fody/)
  - [Messaging](https://brunolm.wordpress.com/2015/03/01/messaging-eventaggregator/)

