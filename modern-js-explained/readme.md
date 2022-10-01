# Evolution of JavaScript

We will start from the beginning and build websites - no tools, just plain HTML & JavaScript. Then we'll introduce different tools _incrementally_ to see the _problems they solve_ one at a time

## Manually adding JavaScript libraries

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

## Using a JavaScript Package Manager (npm)

Starting around 2010, several competing JS package managers emerged to help **automate** the **process of downloading and updating libraries** from a central repositories.

Note that `npm` was originally a _package manager_ made specifically for `node.js`, a JS runtime designed to run on server, _not the frontend_.

> Using package managers generally involved command line, which in the past was never required as a Frontend Dev.

How to use `npm` to install `moment.js` package _automatically instead of manually downloading it_? If you have node.js installed, you already have npm installed. We can navigate to the directory where `index.html` is and enter

### npm init command

> npm init

This will generate a new file `package.json`. This is the **config file** that `NPM` uses to save all the _project information_.

`package.json`

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

### Benefits of updating Dependency in package.json

This is useful later when sharing a project with others - instead of sharing the `node_modules` folder (which can get very large), you only need to share the `package.json` file and _other developers can install the required packages automatically_ with the command `npm install`.

So now we no longer have to manually download `moment.js` from website, we can automatically download and update it using `npm`.

We can find the `moment.min.js` file in the `node_modules/moment/min/` directory. This means we can _link to the npm downloaded version_ of `moment.min.js` in the `index.html` as follows:

```HTML
 <script src="node_modules/moment/min/moment.min.js"></script>
```

So the _good thing_ is we can now use `npm` to _download and update our packages through the command line_. The _bad thing_ is now we're digging through `node_modules` folder to _find location of each package and manually including it in our HTML_. So next we'll automate that process as well.

## Using a JavaScript Module Bundler (Webpack)

- Most programming languages provide a way to _import code from one file to another_.

- JavaScript wasn't originally designed with this feature, because JS was designed to only run in browser, with **no access to the file system of client's computer** (for security reasons).

### Globally defined variable

- So for the longest time, organizing JavaScript code in multiple files required you to load each file with _variables shared globally_.

- This is actually what we're doing with the above `moment.js` example - the entire `moment.min.js` file is **loaded in the HTML**, which **defines a global variable** `moment` which is then _available to any file loaded after_ `moment.min.js` (regardless of whether or not it needs it).

### Import and Export using CommonJS

- In 2009, a project named `CommonJS` was started with the goal of specifying an ecosystem for JavaScript outside the browser.

- A big part of `CommonJS` was its specification for modules, which would **finally allow JS to import & export code across files, without resorting to Global variables**.

The most common implementation of `CommonJS` is `node.js`.

Instead of _loading_ all of `moment.min.js` with <script/> tag, you can load it directly in the JS files using `require()` as follows:

`index.js`

```js
var moment = require("moment");

console.log("Hello from JavaScript");
console.log(moment().format());
```

This is how `module loading` works in `node.js`, which is a server side language with _access to the computer's file system_.

- Node.js also knows the `location` of each _npm module path_, so instead of having to write `require(./node_modules/moment/min/moment.min.js)`, you can simply write `require('moment')`.

### Using require in browser

- This is all great for `node.js`, but if you _try to use the above code_ in `browser`, you'd get an error saying `require` isn't defined.

- The browser _doesn't have access_ to the `File System`, which means _loading modules_ in this way is very tricky - loading files has to be done **dynamically**, either synchronously (slows down execution) or asynchronously (which can have timing issues).

## Module Bundlers

This is where **Module Bundler** comes in. A JS module bundler is a tool that gets around the problem with a build step (which has access to the file system) to create a final output that is browser compatible (which doesn't need to access file system).

- In this case, we need a `Module Bundler` to _find all the require statements_ (which is invalid in browser JavaScript syntax) and **replace them with actual contents of each required file**. The final result is a `single bundled JavaScript` file (with no require statements).

- The most popular `Module Bundler` was `Browserify` in 2011, pioneered the usage of `node.js` style _require statements_ on frontend (which enabled npm to become the frontend package manager of choice).

- Around 2015, **webpack** became the more widely used `Module Bundler`.

## How to use webpack in our project?

Let's take a look at how to use webpack to get the above `require('moment')` working in the browser.

- First we need to install `Webpack` into the project. `Webpack` is itself an `npm package`, hence we can install it from the command line:

> npm install webpack webpack-cli --save-dev

- Note that we're installing two packages - webpack and webpack-cli (which enables us to use webpack from command line).

- Also note the `--save-dev` argument saves it as a `development dependency`, which means it's a package that you need in your _development environment_ but not on your _production server_.

- This is updated in the package.json as follows:

```js
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
    },
    "devDependencies": {
        "webpack": "^5.74.0",
        "webpack-cli": "^4.10.0"
    }
}
```

## Using webpack from Command Line

Now we have the `webpack` and `webpack-cli` installed as packages in node_modules folder. You can use `webpack-cli` from the command line as follows:

> ./node_modules/.bin/webpack index.js --mode=development

- This command will run the _webpack tool_ that was installed in the `node_modules` folder, start with the `index.js`, find any `require` statements, _replace them with the appropriate code_ to create a _single output file_ (which by default is **dist/main.js**).

![image](https://user-images.githubusercontent.com/85299439/193416800-e90f08f0-b2c5-4e6e-a962-35c2b97e4527.png)

- The `--mode=development` argument is to keep the JavaScript _readable for developers_, as opposed to the _minified version_ which is the output of `--mode=production`

- Now that we have webpack's **dist/main.js** output, we are going to use it _instead of_ `index.js` in the browser, as it contains `invalid require statements`. This would be reflected in the `index.html` file.

```HTML
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- <script src="./node_modules/moment/min/moment.min.js"></script> -->
    <script src="dist/main.js"></script>
    <title>Document</title>
</head>
```

`index.js`

```js
var moment = require("moment");

console.log("Hello from JavaScript");
console.log(moment().format());
```

Now `index.html` is linked to the `bundled version (main.js)` of `index.js`. Refresh the browser and see that everything is working as before!!

### webpack.config.js

Note that we'll need to **run the webpack command each time we change index.js**. This is tedious, and will get even more tedious as we use webpack's more advanced features (like generating source maps - helps debug the original code from the transpiled code).

Webpack can _read options from a config file_ in the _root directory of the project_ named `webpack.config.js`, which in our case would look like:

```js
module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    filename: "main.js",
    publicPath: "dist",
  },
};
```

Now each time we change `index.js`, we can run webpack with the command:

> ./node_modules/.bin/webpack

- We don't need to specify the `index.js` and --mode=development options anymore, since webpack is _loading those options_ from `webpack.config.js` file. This is better, _still tedious to enter this command for each code change_ - we'll make this process smoother in a bit.

### Pros of using webpack

Overall this may not seem like much, but there are huge advantages to this workflow.

- We are _no longer loading external scripts_ via Global Variables. [Refer Globally defined variables section](#globally-defined-variable).

- Any **new JS libraries will be added** using `require` statements in the `JavaScript`, as _opposed to adding_ new `<script>` tags in HTML.

- Having a `single Javascript bundle file` is often better for `performance`.

Now that we added a build step, there are some other powerful features we can add to our development workflow!!
