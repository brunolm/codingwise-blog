---
layout: post
title: "Data Binding"
date: 2015-03-01 12:00:00 -0300
categories: code
tags:
  - c#
  - data-binding
  - wpf
---


Binding allows you to link a source object to some control. There are two types of bindings:



  - **One Way Binding**: Binds a source to the interface.
  - **Two Way Binding**: Binds a source to the interface and back to the source.

INotifyPropertyChanged interface allows sources to interact with the interface and update it as the values change.


To bind an object or list to an element you must set the **DataContext** property.


It is possible to bind an object or a list of objects and you can bind one element to another.


To customize how bound data will be displayed you can set the **DataTemplate** from a control.


It is possible to set Data Converters to convert the source type to another type.
<!--more-->


## DataContext


Is the property that defines the data a control holds. A model is often assigned to the Windows data context on a MVVM pattern.


[![img](https://images-blogger-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2F1.bp.blogspot.com%2F-jLFbbpnsy-E%2FVPOjWTxSbQI%2FAAAAAAAAEzs%2Ft9exR2wMQjk%2Fs1600%2F01.jpg&amp;container=blogger&amp;gadget=a&amp;rewriteMime=image%2F*)](https://brunolm.files.wordpress.com/2010/06/aaaff-01.jpg)

or

[![img](https://images-blogger-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2F2.bp.blogspot.com%2F-3UcLIR7nuTc%2FVPOjZ8mvxYI%2FAAAAAAAAEz0%2FQH7rPRME5s0%2Fs1600%2F02.jpg&amp;container=blogger&amp;gadget=a&amp;rewriteMime=image%2F*)](https://brunolm.files.wordpress.com/2010/06/b1c86-02.jpg)


<br>
## One Way Binding
Binds the values from the code to the screen. But not from the screen back to the code.

[![img](https://images-blogger-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2F2.bp.blogspot.com%2F-QIE-GDnLFsc%2FVPOkJJI---I%2FAAAAAAAAE0A%2FXi-N6tlINYM%2Fs1600%2F01.jpg&amp;container=blogger&amp;gadget=a&amp;rewriteMime=image%2F*)](https://brunolm.files.wordpress.com/2010/06/2a7f5-01.jpg)

A label control is not an input control so it takes OneWayBinding by default.

[![img](https://images-blogger-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2F1.bp.blogspot.com%2F-FKw7P0vaKug%2FVPOkJG8FlvI%2FAAAAAAAAEz8%2FlYSW2skoi6o%2Fs1600%2F02.jpg&amp;container=blogger&amp;gadget=a&amp;rewriteMime=image%2F*)](https://brunolm.files.wordpress.com/2010/06/639dc-02.jpg)

## Two Way Binding
Binds the values from the code to the screen and from the screen back to the code.

[![img](https://images-blogger-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2F3.bp.blogspot.com%2F-iPLaGMb1IWw%2FVPOkk6IR0RI%2FAAAAAAAAE0U%2FQoY_eGxNj0Q%2Fs1600%2F01.jpg&amp;container=blogger&amp;gadget=a&amp;rewriteMime=image%2F*)](https://brunolm.files.wordpress.com/2010/06/d47df-01.jpg)

A textbox control is an input control so it takes TwoWayBinding by default.

[![img](https://images-blogger-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2F2.bp.blogspot.com%2F-Eneke45GFPg%2FVPOkk24mLoI%2FAAAAAAAAE0M%2FonllnFsLL7Y%2Fs1600%2F02.jpg&amp;container=blogger&amp;gadget=a&amp;rewriteMime=image%2F*)](https://brunolm.files.wordpress.com/2010/06/52070-02.jpg)

By default the source property will be updated when the TextBox loses focus. This behavior can be changed by setting the UpdateSourceTrigger.

[![img](https://images-blogger-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2F2.bp.blogspot.com%2F-5FacCcsjVUI%2FVPOkk8_-lfI%2FAAAAAAAAE0Q%2FiJxzQm19-5U%2Fs1600%2F03.jpg&amp;container=blogger&amp;gadget=a&amp;rewriteMime=image%2F*)](https://brunolm.files.wordpress.com/2010/06/2aa93-03.jpg)

## INotifyPropertyChanged
Calls an event called PropertyChanged informing which property had its value changed. Required to inform when the code changes and the interface should update.


In .NET 4.5+ it is possible to use the parameter attribute `[CallerMemberName]`. It means that the parameter is going to receive the name of the caller by default. With that you can just call the method without writing the string name of the property you are changing.

[![img](https://images-blogger-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2F1.bp.blogspot.com%2F-Ipftki6Y3wo%2FVPOkzfgb2xI%2FAAAAAAAAE0k%2Fzeufgehsw6U%2Fs1600%2F01.jpg&amp;container=blogger&amp;gadget=a&amp;rewriteMime=image%2F*)](https://brunolm.files.wordpress.com/2010/06/5dd29-01.jpg)

Without .NET 4.5 you have to send the name of the property as `NotifyPropertyChanged("Title")`.


And as an workaround to writting hard-coded strings there is the lambda approach where the member name is extracted from an expression as in:

[![img](https://images-blogger-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2F3.bp.blogspot.com%2F-AW5lrk-nv7A%2FVPOkzezyAYI%2FAAAAAAAAE0o%2FSquqmT2t46Q%2Fs1600%2F02.jpg&amp;container=blogger&amp;gadget=a&amp;rewriteMime=image%2F*)](https://brunolm.files.wordpress.com/2010/06/2a071-02.jpg)

There is another option which is IL injection. There is a Nuget Packaged called Fody and it has a module called Fody PropertyChanged. You can decorate a class with the attribute [PropertyChanged.ImplementPropertyChanged] and in the build process Fody is going to inject code to notify of property changes on the properties of your class.


## Element Binding
Binds the values from another control rather than the values from the Data Context.

[![img](https://images-blogger-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2F4.bp.blogspot.com%2F-5vW6KyDlbgg%2FVPOlI9YOR_I%2FAAAAAAAAE00%2FnYdcXkYf_XU%2Fs1600%2F01.jpg&amp;container=blogger&amp;gadget=a&amp;rewriteMime=image%2F*)](https://brunolm.files.wordpress.com/2010/06/24452-01.jpg)


## List Binding
Binds a collection to a control. The collection used in often ObservableCollection&lt;T&gt; as it notifies the interface of any changes.

[![img](https://images-blogger-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2F2.bp.blogspot.com%2F-qLhDbBQLdd4%2FVPOlI6u_YoI%2FAAAAAAAAE08%2F5h7imbDpsbs%2Fs1600%2F02.jpg&amp;container=blogger&amp;gadget=a&amp;rewriteMime=image%2F*)](https://brunolm.files.wordpress.com/2010/06/a087a-02.jpg)

## Data Templates
Can be overwritten to display data in a custom format.


The default way a ListBox renders its items is by calling ToString. However if you are binding a list of objects you may want to customize how results are displayed. By the default you will get the result bellow.

[![img](https://images-blogger-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2F1.bp.blogspot.com%2F-4USe_twhUjE%2FVPOlI4WwNwI%2FAAAAAAAAE04%2F8NDf5XmG8Oo%2Fs1600%2F03.jpg&amp;container=blogger&amp;gadget=a&amp;rewriteMime=image%2F*)](https://brunolm.files.wordpress.com/2010/06/cbacd-03.jpg)

But you can change the data template to show the values you want, for example:

[![img](https://images-blogger-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2F2.bp.blogspot.com%2F-KWR68Yw34YE%2FVPOlJNV7vjI%2FAAAAAAAAE1E%2F2lN57Ivppng%2Fs1600%2F04.jpg&amp;container=blogger&amp;gadget=a&amp;rewriteMime=image%2F*)](https://brunolm.files.wordpress.com/2010/06/e87f0-04.jpg)

## Data Conversion
Can convert a value from one type to another. A common use is when you have to convert a boolean value to set the controls visibility.

By simply binding a boolean value to the visibility it is not going to work, because the property expects the type "Visibility".

[![img](https://images-blogger-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2F2.bp.blogspot.com%2F-6wI7bEY_0Os%2FVPOlJQT3_RI%2FAAAAAAAAE1o%2FTdzZtBZXqug%2Fs1600%2F05.jpg&amp;container=blogger&amp;gadget=a&amp;rewriteMime=image%2F*)](https://brunolm.files.wordpress.com/2010/06/b6157-05.jpg)

So we can create a converter and apply to the bindings.

[![img](https://images-blogger-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2F2.bp.blogspot.com%2F-Iw2FgvJhiz4%2FVPOlJtwJFcI%2FAAAAAAAAE1M%2FAu55YUfrbEM%2Fs1600%2F06.jpg&amp;container=blogger&amp;gadget=a&amp;rewriteMime=image%2F*)](https://brunolm.files.wordpress.com/2010/06/18609-06.jpg)

[![img](https://images-blogger-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2F1.bp.blogspot.com%2F-q6L1Qy_amjQ%2FVPOlJ61LPwI%2FAAAAAAAAE1Q%2Ftg1Z00TzZM8%2Fs1600%2F07.jpg&amp;container=blogger&amp;gadget=a&amp;rewriteMime=image%2F*)](https://brunolm.files.wordpress.com/2010/06/4ca1a-07.jpg)

Which then shows the expected result:

[![img](https://images-blogger-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2F4.bp.blogspot.com%2F-ze6JftATdcI%2FVPOlKLKivNI%2FAAAAAAAAE1c%2FHnrqKGjuxIc%2Fs1600%2F08.jpg&amp;container=blogger&amp;gadget=a&amp;rewriteMime=image%2F*)](https://brunolm.files.wordpress.com/2010/06/1363c-08.jpg)



