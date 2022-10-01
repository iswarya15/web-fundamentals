# Evolution of JavaScript

We will start from the beginning and build websites - no tools, just plain HTML & JavaScript. Then we'll introduce different tools _incrementally_ to see the _problems they solve_ one at a time

## Using JS the "old school" way

Here is a simple `index.html` file that links to a JavaScript File.

```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script src="index.js"></script>
    <title>Document</title>
  </head>
  <body>
    <h1 id="heading">Modern JavaScript</h1>
  </body>
</html>
```

Let's say we want to add a library someone wrote like `moment.js` to help _format dates_ as follows.

```js
moment.startOf("day").fromNow();
```

This can be done by _including moment.js_ on our website. We can add `moment.js` to our website by **manually downloading** `moment.min.js` file in the same directory and including it in `index.html` file.

```js
<head>
  <meta charset="UTF-8" />
  <script src="moment.min.js"></script>
  <script src="index.js"></script>
  <title>Document</title>
</head>
```

Note that `moment.min.js` _gets loaded before_ `index.js`, which means we can use the `moment` function in `index.js` file as follows.

`index.js`

```js
console.log("Hello from JavaScript");
console.log(moment().format());
```

![image](https://user-images.githubusercontent.com/85299439/193408093-af48096f-0f52-4f68-90cd-88e29979dbfb.png)

And this is how _we used to make websites with JavaScript libraries_! The `good thing` was that it was `easier to understand`. The `bad thing` was that it was annoying to **find and download the new versions of libraries every time they would update**.

## Using a JavaScript package manager (npm)

Starting around 2010, several competing JS package managers emerged to help **automate** the **process of downloading and updating libraries** from a central repositories.

Note that `npm` was originally a _package manager_ made specifically for `node.js`, a JS runtime designed to run on server, _not the frontend_.

> Using package managers generally involved command line, which in the past was never required as a Frontend Dev.

How to use `npm` to install `moment.js` package _automatically instead of manually downloading it_? If you have node.js installed, you already have npm installed. We can navigate to the directory where `index.html` is and enter

> npm init

This will generate a new file `package.json`. This is the **config file** that `NPM` uses to save all the _project information_.

```json
{
  "name": "modern-js-explained",
  "version": "1.0.0",
  "description": "Evolution of JavaScript",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

To install `moment.js` package, we can follow the `npm instructions`

> npm install moment --save

This command does 2 things:

- **Downloads** all the code from `moment.js` package into a folder called **node_modules**.
- It automatically **modifies** the `package.json` to keep track of `moment.js` as **project dependency**.

```json
{
  "name": "modern-js-explained",
  "version": "1.0.0",
  "description": "Evolution of JavaScript",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "moment": "^2.29.4"
  }
}
```
