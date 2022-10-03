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

```js
modules: {
    rules: {
        {
            test: /\.ts$\,
            use: 'ts-loader'
        }
    }
}
```

In the above example, we are telling `webpack` to look for **any .ts files** and apply `ts-loader` _transpilation to convert_ `typescript` code to browser compatible JS code.

You can similarly have loaders like css, babel etc. All the files other than `JavaScript` are converted into `JS Modules` by these transpilation.

You can also `filter` through these modules by using properties like **exclude, include, enforce** etc,

Example: We don't want to transpile any of the node_modules file. Hence we add `exclude: 'node_modules'`

There is also a way to _chain loaders_ such that loaders that perform one operation will be transformed once and then you can chain them together.

```js
rules: [
  {
    test: /\.less$/,
    use: ["css-loader", "style-loader", "less-loader"],
  },
];
```

- **Plugins** - An plugin is an `ES5 class` which implements an _apply function_ and allow you to hook into the entire compilation lifecycle.

The compiler uses it to **emit events**. It adds the _new instance_ to the `plugin key` in config object.

```js
var HelloWorldPlugin = require('hello-world');

module.exports = {
    plugins: [new HelloWorldPlugin({options: true})];
}
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
