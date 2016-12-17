---
layout: post
title: "Installing and using Secret Manager on ASP.NET Core"
date: 2016-02-24 12:00:00 -0300
categories: code
tags:
  - application-secret
  - asp.net-core
  - c#
---
In your ASP.NET Core application you can load settings from a file named `secrets.json` that can store API ids and secrets. The default generated template includes:

```csharp
if (env.IsDevelopment())
{
    builder.AddUserSecrets();
}
```

That is going to add that file only on a development environment. So the whole point of using this secret storage is to avoid having your ClientId and ClientSecret exposed on source control. In production you can have it stored on environment settings, the generated template includes:

```csharp
builder.AddEnvironmentVariables();
```

Which is going to add the environment variables on your application configuration.
<!--more-->

In order to do that first test your environment by typing `dnx` in the command prompt. If it doesnt find dnx then run the following:

```csharp
app.UseGoogleAuthentication(options=> 
{
    options.ClientId = Configuration["Authentication:Google:ClientId"];
    options.ClientSecret = Configuration["Authentication:Google:ClientSecret"];
});
```

