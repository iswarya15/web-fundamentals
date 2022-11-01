# Webpack

## Why do we need webpack?

Webpack is a **module bundler** for modern JavaScript applications. The time before libraries, frameworks, and build tools like Webpack, we _just need to include a single script in our HTML_ such as this then solve problems right away:

```html
<head>
  <script src="main.js" type="text/javascript"></script>
</head>
```

But then, libraries came so we have to include them one by one and in the _proper order to make them work_ interdependently:

```html
<head>
  <script src="library1.js" type="text/javascript"></script>
  <script src="library2.js" type="text/javascript"></script>
  <script src="script.js" type="text/javascript"></script>
</head>
```

These are the problems webpack was trying to solve:

### Automation

You might not be a big fan of including every **javascript libraries in your HTML headers** but prefer to use npm for including such libraries you want to use in your functionality

### Load Speed

**Loading individual scripts** within a webpage is _very costly_ if we were to create a modern web app.

Webpack helps us _improve the loading speed_ by **bundling every javascript modules** we have into one since we only ask once in fetching our script from the webserver.

### Dependency Issues

As mentioned earlier, before the dawn of webpack, we _used to arrange our scripts and libraries in the proper order_ to connect the dependencies correctly:

With ES6 features, we can **import and export javascript modules** which are identified by `webpack` and _included in the bundle_.

### Initial webpack config

- **Entry** - entry point to build **dependency graph**.

In the `webpack-demo-app`, `index.js` is the first file to load in your app. Webpack will use this file to build `dependency graph`.

- **Output** - It defines the _absolute path_ for the output bundles.

- **Loaders** - It tells JavaScript how to **resolve non-javascript** modules. It takes the resource file and returns the modified state.

  - `ts-loader` : In the below example, we are telling `webpack` to look for **any .ts files** and apply `ts-loader` _transpilation to convert_ `typescript` code to browser compatible JS code.

  - `css-loader` : To make sure our app knows about the css file, we can import it to the `index.js` file. `Webpack` would now notice the css file and use `css-loader` on it.

  ![image](https://user-images.githubusercontent.com/85299439/198972063-a318c551-186c-466d-b4ea-f09c6f1115c3.png)

  `css-loader` _converts the css to valid javascript code_ in the emitted `main.js`. But the **CSS is not applied to the DOM** yet. To _apply the javascript to DOM_, we need to use `style-loader`. This is done by **chaining the loaders**. Output of one loader is given as input to another loader.

  - `style-loader` : adds CSS to DOM by injecting a _style tag_. We're **loading css without having to connect to link tag in HTML file**. It's all _happening through Javascript_.

  ![image](https://user-images.githubusercontent.com/85299439/198975182-18fade36-7306-49f7-8435-b085cc3abf56.png)

```js
modules: {
    rules: {
        {
            test: /\.ts$\,
            use: 'ts-loader'
        },
        {
            test: /\.scss$/,
            use: ["style-loader", //3. injects styles to DOM
                  "css-loader", //2. Turns css into commonjs
                  "sass-loader"] //1.  Turns sass into css
        }
    }
}
```

You can similarly have loaders like css, babel etc. All the files other than `JavaScript` are converted into `JS Modules` by these transpilation.

You can also `filter` through these modules by using properties like **exclude, include, enforce** etc,

Example: We don't want to transpile any of the node_modules file. Hence we add `exclude: 'node_modules'`

## Cache Busting and Plugins

- When a `static file` gets `cached` it can be _stored for very long periods_ of time before it ends up expiring. This can be an annoyance in the event that you make an **update to a site however**, since the cached version of the file is stored in your client's browsers, they may be _unable to see the changes made_.

- Browser remembers the file name and if the copy of the filename already exists in browser cache, it uses the same. Notice the browser fetches from `disk cache`.

![image](https://user-images.githubusercontent.com/85299439/199000936-518fe591-49dc-43c5-96f3-04d91e7fe07f.png)

- `Cache Busting` solves the browser caching issue by using a **unique file version identifier** i.e hash - refer below image, _github-(hash).css_ to tell the browser that a new version of the file is available.

- Therefore the browser _doesn't retrieve the old file from cache_ but **rather makes a request to the server for the new file**.

> How do we link these _dynamically generated hash files_ in the `index.html` (right now the script tag refers to main.js) ?!

Answer: We don't write the script ourselves. We are going to have _webpack build HTML file_ for us so it would come up with the right script name and stick it to the bottom but to do that we need to learn about `Plugins`.

[Read more on Cache Busting.](https://www.keycdn.com/support/what-is-cache-busting)

### Plugins

The plugins option is used to **customize the webpack build process** in a variety of ways. Webpack has a rich plugin interface.

- `HtmlWebpackPlugin` simplifies creation of HTML files which serves the webpack bundles. This is useful for webpack bundles that **include a hash in the filename** which _changes every compilation_.

  Note: You can either _let the plugin generate_ an HTML file for you, _supply your own template_ using lodash templates.

- To use `HtmlWebpackPlugin`, install the plugin and require it in `webpack.config.js` and add the plugin to webpack config as follows:

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", //3. injects styles to DOM
          "css-loader", //2. Turns css into commonjs
          "sass-loader",
        ], //1.  Turns sass into css
      },
    ],
  },
};
```

![image](https://user-images.githubusercontent.com/85299439/199162490-8062a74a-f27c-47cb-b436-a6eaf4dbc07b.png)

By adding the plugin to webpack config file, webpack generated a file `dist/index.html`. This file contains the **recently updated script** file. But our content is missing in the newly generated `index.html` file. Let's create _our own template_.

#### Create own template:

- Create a new html file in src folder (template.html).

- Copy content from the original `src/index.html` file to `template.html`

- _Remove script_ tag from `template.html` which contains the bundled file (dist/index.js) since this is taken care by `HtmlWebpackPlugin`.

- Finally, add the template to `webpack.config.js` as below:

```js
    plugins: [new HtmlWebpackPlugin({
        template: "./src/template.html"
    })],
```

Now `dist/index.html` would contain content from `src/template.html` and _recently changed script file_.

Note: Images aren't working at this point. We'll come back to that

![image](https://user-images.githubusercontent.com/85299439/199166029-5f4be90b-0c70-437f-99fd-d6cf92cd774e.png)

## Splitting DEV & PRODUCTION

- Broke our `webpack.config` file into 3 files

- `webpack.common.js`, `webpack.dev.js`, and `webpack.prod.js`

  - In dev version, we don't need content hash, but we do need in prod version.

- install `webpack-merge` to _share the common functionality._

`webpack.dev.js`

```js
const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
});
```

`webpack.prod.js`

```js
const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "main.[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
});
```

- updated our `package.json` to use the **new config files**.

```json
    "scripts": {
        "start": "webpack --config webpack.dev.js",
        "build": "webpack --config webpack.prod.js"
    },
```

`npm start`: this calls webpack with dev config, webpack generates `dist/index.html` with script tag that contains **no content hash**.

![image](https://user-images.githubusercontent.com/85299439/199172190-3246f798-0f7d-4936-8afc-338411a1dadb.png)

`npm build`: webpack generates `dist/index.html` with script tag that contains _bundled js file with hash attached_ to it. If we check the bundled script file, the code is _minified_.

![image](https://user-images.githubusercontent.com/85299439/199172716-bb0338a7-5d5b-4c8a-83a5-8bb17d6fa52f.png)

`Minified Code`:

![image](https://user-images.githubusercontent.com/85299439/199173087-83a8b827-9578-482d-9c9c-3a7e324ff0a9.png)

## webpack-dev-server

To avoid entering the command `npm start` and re-build, each time we change something we can install `webpack-dev-server`. Configure dev server in `package.json` as below:

```json
    "scripts": {
        "start": "webpack-dev-server --config webpack.dev.js --open",
        "build": "webpack --config webpack.prod.js"
    },
```

### HTML-loader

- Install `html-loader` and configure in `webpack.common.js` to automatically _require the images_.

```js
{
    test: /\.html$/,
    use: ["html-loader"]
}
```

- add assetModuleFilename: "images/[name].[hash][ext]" to the output field of `webpack.prod.js` to generate filenames with hash, as below

`webpack.prod.js`

```js
module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "main.[hash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "./imgs/[name].[hash].[ext]",
  },
});
```

After running npm run build, there is a `dist/imgs` folder generated which consists of the required image. Note the `index.html` now links to the d*ynamically generated image*.

![image](https://user-images.githubusercontent.com/85299439/199204650-55af322d-5270-4034-865c-414917c638a3.png)

## Vendor.js & Multiple Entrypoints

- Now we have 2 entry files and 2 bundles.
- The `vendor` file has code that is _less likely to change_, 3rd party libraries
- The `main file` has _all of our app code_

## Summary of whole process

Webpack first reads the **entry point**, and it goes through the `resolver` to verify that it _exists or not_.

Then it goes through the `Module Object` that will be passed to the `Parser`.

Once the parser identifies the `dependency type`, it passes it to the **loader**, if it is a _non-javascript module_, incase of a javascript module, it simply collects the dependency and attaches it to the Module.

We have to again check for _dependencies that exists in the module_ and pass it through **resolver**, after this the _entire cycle repeats_ until the _complete dependency graph is built_.
