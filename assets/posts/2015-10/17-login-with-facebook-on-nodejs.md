---
layout: post
title: "Login with Facebook on NodeJS"
date: 2015-10-17 12:00:00 -0300
categories: code
tags:
  - facebook
  - node.js
  - oauth
  - typescript
---
There is an easy way on NodeJS to handle logins with Facebook, Google, LinkedIn, Twitter and so on, you can use [passport](http://passportjs.org/).

```npm i passport --save```
```npm i passport-facebook --save```
<!--more-->

To use it:

```js
import passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
```

Then you have to configure the provider:

```js
passport.use(new FacebookStrategy({
    clientID: oauthSettings.FacebookID,
    clientSecret: oauthSettings.FacebookSecret,
    callbackURL: "http://localhost:1337/auth/facebook/callback"
},
    function (accessToken, refreshToken, profile, done)
    {
        // you email, name, id, and so on is on profile
        var result = profile;
    }
));
```

You can get a clientID and clientSecret by going to [developers.facebook.com](https://developers.facebook.com/). Add a platform on your application and on the website enter "localhost:1337".

You also have to configure two routes, one to trigger the login and the other one what you specified on the callbackURL above to handle the return result from Facebook.

```js
app.get("/auth/facebook", passport.authenticate("facebook"));

app.get("/auth/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: "/",
        failureRedirect: "/login"
    }));
```

Start your application on localhost:1337 and you are good to go, it should work.

You can also watch this video that shows how to accomplish it:
http://www.youtube.com/watch?v=7olUoVw_s9M
