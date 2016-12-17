---
layout: post
title: "The N-Layer tier project architecture"
date: 2015-03-03 12:00:00 -0300
categories: code
tags:
  - architecture
  - c#
  - solution
---
There are many ways to split up your solution structure in many layers. My favorite way of doing it is as the diagram bellow describes:

[![img](https://brunolm.files.wordpress.com/2015/03/2015-19-03-06-19-54-313.png)](https://brunolm.files.wordpress.com/2015/03/2015-19-03-06-19-54-313.png)

<!--more-->I have:

  - **Presentation layer**: where my screens/pages are, all they know is how to display data they receive
  - **Services layer**: where all my business rules are, the services classes are responsible for manipulating data
  - **Data layer**: where my database access and my database models are
  - **Crosscutting**: classes used by the entire solution, [read more about it on MSDN](https://msdn.microsoft.com/en-us/library/ee658105.aspx)

Another example which looks very similar is one [posted on MSDN](https://code.msdn.microsoft.com/windowsdesktop/Traditional-N-tier-80f841c2)

[![img](https://brunolm.files.wordpress.com/2015/03/sa-21.png)](https://brunolm.files.wordpress.com/2015/03/sa-21.png)

This is enough to keep your solution clean and with a clear separation on concerns.

The hint isto avoid complicating what does not need complicating.
