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

You can also declare your `entries` in a _single place_ using the `source` field so you **don't need to duplicate** them in each `parcel` command.

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
