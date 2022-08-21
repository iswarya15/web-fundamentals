## Web Storage Concepts

The two mechanisms within Web Storage are as follows:

`sessionStorage` : maintains a storage area for each origin for the _duration of the page session_ (as long as the browser is open)

`localStorage` : persists even when the browser is closed and reopened.

### Window Object

Web storage API extends `window` object with two properties - `window.sessionStorage`, `window.localStorage` - which provides access to current domain's session and local storage object.

## Different Storage API

The following `storage techniques` are offered by HTML5 storage providers.

## Cookies

An `HTTP Cookie` - is a _small pieces of text sent to your browser by a website that you visit_. The browser _may store it_ and send it back with `next request to the same server`.

Typically it's used to tell if two request came from the same browser.

### Does every HTTP Request send cookie?

No. Cookies are sent only _when a Web site wants to store persistent information so that it will still be there if you leave the site_ and come back later, like tomorrow or next week or next month.

- When you log in to a site and check the little box that says `remember me`. The site **sends a cookie with your login information**, so you don’t have to type a username and password again.

- When you add things to a shopping cart, so that if you leave and come back later, the shopping cart is still there. (Not all shopping carts do this; some store your cart on the server, like Amazon, for instance. But some store your cart in a cookie.)

- If the site shows advertisements, when an advertisement is displayed. An `advertising ID` is _stored in a cookie that can be used to track what ads you’ve seen_ and which, if any, you’ve clicked on.

- This is combined with a record of what sites you’ve visited so advertisers can get a sense of what ads are likely to interest you. If the site uses analytics, when you first visit a site so the site’s analytics can build a profile of which pages you’ve visited and how long you stayed.

### Cons:

The maximum size of `cookie` is **4096 Bytes**.

Typically, the following are allowed:

- 300 cookies in total
  - 4096 bytes per cookie
    - 20 cookies per domain
      - 81920 bytes per domain(Given 20 cookies of max size 4096 = 81920 bytes.)

### API

1. Read - Reading all cookies from a domain

   ```
      var cookies = document.cookies;
   ```

2. Writing a new cookie on a domain

   ```
      document.cookie = newCookie;
   ```

## Local Storage

> > The read-only `localStorage` property allows us to access a `Storage object` for the `Document's origin`. The stored data is saved across browser sessions. Data stored in `localStorage` has no _expiration Time_.

### Pros

- Default storage for an entire domain is **5120kb** (5MB). This gives us more space to work with than a _typical 4kb cookie_.

- The data stored in `localStorage` persists until _explicitly deleted_.

### Cons

- It works on same-origin policy. So, data stored will only be available on the same origin.

- It stores everything as a string.

### API

1. `setItem`

   | setItem     | Description                                                                             |
   | ----------- | --------------------------------------------------------------------------------------- |
   | method      | localStorage.setItem(key,value)                                                         |
   | params      | key (String/Number), value (String/Number)                                              |
   | description | adds the keys to storage if already exists or updates the key's value if already exists |
   | example     | localStorage.setItem('test', document.getElementById('input').value)                    |

2. `getItem`

   | getItem     | Description                         |
   | ----------- | ----------------------------------- |
   | method      | localStorage.getItem(key)           |
   | description | returns the value of the key passed |
   | example     | localStorage.getItem('test')        |

3. `removeItem`

   | removeItem  | Description                     |
   | ----------- | ------------------------------- |
   | method      | localStorage.removeItem(key)    |
   | params      | key (String/Number)             |
   | description | removes key from storage        |
   | example     | localStorage.removeItem('test') |

4. `clear`

   | clear       | Description                       |
   | ----------- | --------------------------------- |
   | method      | localStorage.clear()              |
   | description | Empties all the keys from storage |
   | example     | localStorage.clear()              |

5. `key`

   | key         | Description                                     |
   | ----------- | ----------------------------------------------- |
   | method      | localStorage.key(n)                             |
   | params      | n(a Number)                                     |
   | description | returns the name of the nth key in the storage. |
   | example     | localStorage.key(0)                             |

6. `length`

   | length      | Description                        |
   | ----------- | ---------------------------------- |
   | property    | localStorage.length                |
   | description | returns the length of all the keys |
   | example     | localStorage.length                |

## SessionStorage

> > The sessionStorage property allows you to _access a session Storage object_ for the _current origin_. sessionStorage is similar to Window.localStorage, the only difference is while data stored in localStorage **has no expiration set, data stored in sessionStorage gets cleared when the page session ends**.

> > A page session lasts for as long as the browser is open and survives over page reloads and restores. Opening a _page in a new tab or window will cause a new session to be initiated_, which differs from how session cookies work.

## Cons

- The data is available only inside the window/tab in which it was set.
- Like localStorage, it also works on same-origin policy. So, data stored on one protocol/domain/port will not be available for different protocol/domain/port.

### API

Same as `localStorage`.

## API for tackling cross-origin restriction

> > One very interesting API, **PostMessage** is not a web-storage technique but it's the most efficient and reliable way of **communicating between cross-origin browser windows/tabs**. Along with web-storage APIs, it overcomes the web-storage restrictions of cross-origin.
