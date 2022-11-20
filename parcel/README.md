# Building a web app with Parcel

> npm install --save-dev parcel

## Project setup

`Parcel` accepts _any type of file_ as an `entry point`, but an `HTML file` is a good place to start. `Parcel` will follow all your dependencies from there to build your app.

`Parcel` has a `development server` built in, which will **automatically rebuild** your app as you make changes.

To start it, run the `parcel` CLI pointing to your changes

> npx parcel index.html

Next, you can _start adding dependencies to your HTML file_, such as `Javascript/CSS file`. Create a sample `css/js` file and _link them to HTML file_.

As you make changes, you should see your **app automatically update** in the browser `without even refreshing the page`.

## Package scripts

So far, we have been running the `parcel CLI` directly, but it can be useful to create `script` in `package.json` file to make this easier. We'll also setup _script to build_ your app for **production** using `parcel build` command.

- You can also declare your `entries` in a _single place_ using the `source` field so you **don't need to duplicate** them in each `parcel` command.

`package.json`

```json
{
  "name": "my-project",
  "source": "src/index.html",
  "scripts": {
    "start": "parcel",
    "build": "parcel build"
  },
  "devDependencies": {
    "parcel": "latest"
  }
}
```

## Declaring browser targets

- By default `Parcel` doesn't perform any `code transpilation`.

- You can **declare your app's supported browsers** using the `browserslist` field. When this field is declared, `Parcel` will _transpile your code accordingly_ to `ensure compatibility` with your supported browsers.

```json
{
  "name": "my-project",
  "source": "src/index.html",
  "browserslist": "> 0.5%, last 2 versions, not dead",
  "scripts": {
    "start": "parcel",
    "build": "parcel build"
  },
  "devDependencies": {
    "parcel": "latest"
  }
}
```

- `> 0.5%` all versions with > 0.5% of worldwide audience.
- `last 2 versions` of each browser.

You can learn more about `targets` in upcoming sections.

## Development

`Parcel` includes a development server supporting hot reloading, HTTPS, an API proxy and more..

### Dev Server

Parcel's built in `dev server` is automatically started when we run `parcel` command, which is a shortcut for `parcel serve`.

The dev server supports _several options_, which you can _specify via CLI_

- -p, --p: Overrides the default port.The `PORT` `environment variable` can also be used to **set the port**.

- --open: Automatically _opens the entry in default browser_ after parcel starts.

### Hot Reloading

As you make changes to your code, `Parcel` _automatically rebuilds the changed files and updates your app_ in the browser. By default, `Parcel` fully reloads the page, but in some cases it may perform `Hot Module Replacement (HMR)`.

- HMR _improves the development experience_ by updating modules in browser at runtime without needing a whole page refresh.

- This means that `application state` can be **retained as you change small things in your code**.

- `CSS changes` are **automatically applied via HMR** with _no page reload necessary_.

## Development target

When using the `dev server`, only a **single target** can be `built at once`. By default, `Parcel` uses a `development target` that _supports modern browsers_. This means that **transpilation of modern Javascript syntax for older browsers is disabled**.

If you need to test in a older browser, you can provide the `--target CLI` option to choose which of your targets to build.

## Lazy mode

In development, it can be frustrating to _wait for your entire app to build before the dev server starts up_. This is especially true when _working on large apps with many pages_. If you're only working on one feature, you shouldn't wait for all others to load unless you navigate to them.

- You can use the `--lazy` CLI flag to **tell `Parcel` to defer building files until they are requested by the browser**, which can significantly reduce the development build times.

- The server starts quickly and when you navigate to a page for the first time, _`Parcel` builds only builds the files necessary for that page_. When you navigate to another page, that **page will be built on demand.**

## Caching

`Parcel` _caches everything it builds to disk_. **If you restart the dev server, `Parcel` will only rebuild files that have changed since the last time it ran**.

- It also tracks config file, hence all the source files that rely on that configuration will be rebuilt.
