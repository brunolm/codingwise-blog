---
layout: post
title: "Using gulp watchers"
date: 2015-10-18 12:00:00 -0300
categories: code
tags:
  - gulp
  - node.js
  - typescript
---
gulp allows you to create tasks that can be run through the command line. You can install plugins for it so you can do things like minify Javascript, Stylesheets...

gulp also comes with watchers, you can check files for changes and if a file change you can run tasks.<!--more-->



```js
import gulp = require("gulp");
import concat = require("gulp-concat");
gulp.task("watch", () =>
{
    // if any js file under gulpsample folder changes
    // run "helloworld" task
    var watcher = gulp.watch("./gulpsample/**/*.js", ["helloworld"]);

    watcher.on("change", function (event)
    {
        // when the change event happens, run this first
        console.log("File " + event.path + " was " + event.type + ", running tasks...");

        // then run tasks specified above (if any)
    });
});
```

You can watch an example in here:
https://www.youtube.com/watch?v=ahedc6jikAA
