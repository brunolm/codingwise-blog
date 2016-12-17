---
layout: post
title: "What is gulp and how to use it?"
date: 2015-10-16 12:00:00 -0300
categories: code
tags:
  - gulp
  - node.js
---
[Gulp](https://github.com/gulpjs/gulp/blob/master/docs/API.md) is a module you can install on your project by running:

```npm i gulp --save-dev```

It is a task runner for development. You can use it to minify and bundle Javascript, CSS, compile TypeScript, LESS, watch files for changes and do some action, among other things. If you need something just look for a gulp plugin!
<!--more-->

To run it requires a file called `gulpfile.js`, where you can create tasks.

```js
import gulp = require("gulp");

gulp.task("default", () =>
{
  console.log("Default task");
});

gulp.task("js", () =>
{
  console.log("JS task");
});
```

The default task can be called by executing `gulp` on the command prompt. If you want to run the js task you can call it by executing `gulp js`. Basically `gulp taskname`

Inside the tasks you can manipulate files by specifying them in an array. Then you can send them through "pipes" that will execute something against them.

```js
var gulp = require("gulp");
var concat = require("gulp-concat");

gulp.task("js", () =>
{
  return gulp.src(["./somefile1.js", "./somefile2.js"])
    .pipe(concat("all.js")); // from the files in the src
                             // get the contents merge into all.js
});
```

You could also do:

```js
// all js files, except "all.js"
gulp.src(["./*.js", "!./all.js"]);
```

Visual Studio has a syntax that allows you to run these tasks on a certain event:

```js
/// <binding BeforeBuild=default,js AfterBuild=js Clean=js ProjectOpened=js />
```

For more info on gulp check the [API documentation](https://github.com/gulpjs/gulp/blob/master/docs/API.md).
