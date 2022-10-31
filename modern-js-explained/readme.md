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

- So for the longest time, organizing JavaScript code in multiple files required you to load each file with _globally defined variable_.

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

## Transpiling code for new features (Babel)

Transpiling the code means **converting** the code in one language to code in _another similar language_.

This is an important part of frontend development, since browsers are slow to add new features, _new languages_ were created with experimental features that `transpile` to the `browser compatible languages`.

- For CSS, there's **SASS/LESS/STYLUS** to name a few. For JavaScript, the most famous transpiler for a while was `CoffeeScript` (2010), nowadays most people use **Babel** or **TypeScript**.

- `CoffeeScript` is a language _focussed on improving_ JavaScript.

- `Babel` is _not a new language_ but a transpiler that `transpiles` _next generation JavaScript_ (ES2015 and beyond) with features not yet available to all browsers to older compatible JavaScript (ES5).

- `TypeScript` is a language identical to JavaScript, but also adds **static typing**.

## How to install Babel

Let's look at an example on how to use `babel` with our existing `webpack` build. To install babel from command line,

> npm install @babel/core @babel/preset-env babel-loader --save-dev

Note that we're installing 3 separate packages as dev dependencies.

- `@babel/core` is the main part of `babel`

- `@babel/preset-env` is a preset _defining which new JS features to transpile_

- `@babel-loader` is a package to **enable babel** to work with `webpack`. We can configure `webpack` to use `babel-loader` by editing the `webpack.config.js` as follows:

### Transpile code using Babel with Webpack

`webpack.config.js`

```js
module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    filename: "main.js",
    publicPath: "dist",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
```

This syntax can be confusing (fortunately it's not something we'll be editing often).

We're telling `webpack` to look for **any .js files** (excluding ones in the node_modules) and apply babel transpilation using `babel-loader` with the `@babel/preset-env` preset.

Now that everything is setup, we can write `ES2022` code in our JavaScript! Here's an example of an [ES2022 array at](https://dev.to/msabir/es2022-brings-at-for-array-4o5o) in the index.js:

```js
// ES2022
const arr = [1, 2, 3, 4];
console.log("ES2022 Array.at() =>", arr.at(1));
```

We can also use the `ES2015 import statement`, instead of the `require` for loading modules:

`index.js`

```js
import moment from "moment";

console.log(moment().format());
```

Most of the modern browsers support all ES2015/ES2022 features, so it can be hard to tell if babel did its job. You can _test in an older browser_, search for `main.js` to find the **transpiled line of code**:

`main.js`

```js
console.log("ES2022 Array.at() =>", arr[1]);
```

Here you can see **babel transpiled** the **ES2022 Array.at()** to regular JavaScript to _maintain browser compatibility_.

### Improving performance

We're almost done, but there's still some unpolished edges in our workflow. If we're concerned about performance, we can do the following:

- We should be **minifying** the _bundle file_.

- We also need to _re-run the webpack command each time, we change the JavaScript_.

so we'll look at some convenience tools to solve the issues.

## Using a task runner (npm scripts)

Now that we're invested in using a _build step_ to work with JavaScript modules, it makes sense to use a `task runner`, which is a tool that _automates different parts of the build process_.

For frontend development, tasks include minifying code, optimizing images, running tests..

In 2013, `Grunt` was the most popular **frontend task runner**, with `Gulp` following shortly.

Let's write some npm scripts to make using webpack easier. This involves simply changing the `package.json` as follows:

`package.json`

```js
"scripts": {
        "build": "webpack --progress --mode=production",
        "watch": "webpack --progress --watch"
    },
```

Here we've added 2 new scripts `build` and `watch`. To _run the build_ script, you can enter in the command line:

> npm run build

This will run `webpack` (using configuration from the **`webpack.config.js`** we made earlier) with the `--progress` option to show the _progress percent_ and the `--mode=production` option to **minify the code** in production.

> npm run watch

This uses the --watch option to **automatically re-run the webpack** each time any `JavaScript` file changes and shows the `progress percent` of the build, which is great for development.

![image](https://user-images.githubusercontent.com/85299439/193450067-2b66da2e-45d2-40c7-b467-5c0414ebd006.png)

Note that the `scripts` in `package.json` can _run webpack without having to specify the full path_ ./node*modules/.bin/webpack , since `node.js` \_knows the location* of each npm module path.

## webpack-dev-server

We can make things even sweeter by installing `webpack-dev-server`, a separate tool which provides a simple `web server` **with live reloading**.

> npm install webpack-dev-server --save-dev

Then add an npm script to `package.json`:

```js
"scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "webpack --progress --mode=production",
        "watch": "webpack --progress --watch",
        "serve": "webpack-dev-server --open"
    }
```

Now you can _start the dev server_ by running the command:

> npm run serve

And add config for `webpack-dev-server` in `webpack.config.js`. This is mentioned in Official docs as well:
`webpack.config.js`

```js
devServer: {
        static: {
            directory: path.join(__dirname, '/')
        },
        compress: true,
        port: 9000,
        devMiddleware: {
            writeToDisk: true
        },
    },
```

This will automatically open `index.html` website in your browser with an address of `localhost:8080` (by default). Any time you can change JavaScript/HTML in `index.js` webpack-dev-server will _rebuild its own bundled JavaScript and refresh the browser_.

### To avoid creating too many main.js files for hot.update.js & hot.update.json

Add the below options (hotUpdateChunkFilename & hotUpdateMainFileName) to `output property` of `webpack.config.js`

`webpack.config.js`

```js
output: {
        filename: 'main.js',
        publicPath: 'dist',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    },
```

### What next?

There are plenty more options with both `webpack` and `webpack-dev-server`. You can also _make npm scripts for running other tasks_, such as **converting SASS to CSS**, **running tests** -- anything that has a `command line tool`.

## Conclusion

We went from plain HTML and JS to using a **package manager** to automatically download _3rd party packages_, a **module bundler** to create a **single script file**, a **transpiler** to use use **future JavaScript features**, a **task runner** to `automate` different parts of the **build process**.
