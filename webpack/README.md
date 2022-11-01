# Webpack

## Why do we need webpack?

Consider a file `index.js` which imports two files `file1.js` and `file2.js` and `file2.js` is dependent on `file1.js`. In this case, how the _browser know will know_ which _file to load first_ such that it yields the desired result

![image](https://user-images.githubusercontent.com/85299439/193467717-083a2cb8-7ff5-4a90-8c89-6fdca0876fbc.png)

**Solution**: Webpack

### How webpack solves this problem for us?

Webpack is a `module bundler` which **builds and loads modules synchronously**. It converts dependencies into modules and makes sure to pull the dependencies and modules at the right time in the correct scope.

All the dependencies and modules are _loaded in one file_ which will be downloaded in the browser.

### How webpack work on top of the hood?

Let's look at the initial configuration for `webpack.config.js` file

- **Entry** - This is used as the entry point for its **dependency graph**.

![image](https://user-images.githubusercontent.com/85299439/193468175-cadd98b7-f0a2-4ebd-873d-b5d5584df0f6.png)

In the above example, `bootstrap.min.ts` is the first file to load in your app. Webpack will use this file to build `dependency graph`.

- **Output** - It defines the _absolute path_ to distribute bundles.

![image](https://user-images.githubusercontent.com/85299439/193468254-2363a89f-c9f4-412e-94a5-dc1c298c5fdc.png)

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

### How does webpack work ?

**Tapable** - It is the backbone of the plugin system. It allows us to _mix your code_ with an _existing class_ and make **use of existing functions** like `apply plugins parallel` or `apply plugins async` etc.

A simple basic plugin declaration would look like:

```js
class BasicPlugin {
  apply(compiler) {
    compiler.apply("make", (compilation) => {
      console.log("I now have access to compilation!");
    });
  }
}

module.exports = BasicPlugin;
```

There are some `Tapable instances` which are responsible for the working of webpack.

**Compiler** - It is the `central dispatch`, kind of start or stop which _delegates the top level events_ that are happening when webpack runs or finishes.

**Compilation** - It **creates and runs the dependency graph algorithm**.

**Resolver** - It helps in _finding files and dependencies_. For example, `index.js` has imports specified with partial/relative path or any other dependencies, _resolver helps in finding the file from the import path_ and build dependency graph.

**Module Factory** - It takes the `resolved request` and collects the source of that file and returns `Module Object`.

**Parser** - Converts raw code into an `AST` such that it can be easily traversed. Starts by finding all the **require, imports** and creates `dependency object` out of it.

**Template** - Responsible for binding data for your modules and **creates the code that we see in the bundle**.

## Summary of whole process

Webpack first reads the **entry point**, and it goes through the `resolver` to verify that it _exists or not_.

Then it goes through the `Module Object` that will be passed to the `Parser`.

Once the parser identifies the `dependency type`, it passes it to the **loader**, if it is a _non-javascript module_, incase of a javascript module, it simply collects the dependency and attaches it to the Module.

We have to again check for _dependencies that exists in the module_ and pass it through **resolver**, after this the _entire cycle repeats_ until the _complete dependency graph is built_.
