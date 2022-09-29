# HTTP - HyperText Transfer Protocol

It's the `communication protocol` we use when we browse the web. Every `HTTP interaction` includes a request and a response.

### HTTP is Stateless

`Stateless` means that all _requests are separate_ from each other. So each request from the browser must contain enough information on its own for _the server to fulfill the request_.

### URL Syntax

![0-DTR8JpFZo31ht-Kd](https://user-images.githubusercontent.com/85299439/193088477-f7773ddf-0600-4423-bbbf-6113cebced32.jpg)

**Protocol**: Most often they're `HTTP` or `HTTPS`.

Other notable protocols are:

- File Transfer Protocol (FTP) : for transferring _files_ between a client and a server.

- Simple Message Transfer Protocol (SMTP) : _Email_ transmission.

**Domain**: A Domain name is an easy to remember name that is _associated with the physical IP address_ on the Internet. It is the unique name that appears _after the @ sign in email_ address, and _after www. in web addresses_.

- For instance, the domain name `example.com` might `translate` to the physical IP address `198.102.432.8`.

- Using a **domain name to identify a webpage/resource** on the Internet **rather than the numeric IP address** makes it much _easier to remember web addresses_.

**Path**: Specifies the `exact location` of the page/file.

## HTTP Requests:

In HTTP, every requests must have a `URL address`. Additionally, the request needs a `method`.

- GET: READ
- PUT: UPDATE
- POST: CREATE
- DELETE: DELETE

All HTTP messages have one or more _headers_, followed by an _optional message body/payload_.

### Other interesting things in a request

**Referrer Header**: _Address of the webpage_ that makes the HTTP request. This _data can be used for Analytics, Logging, Caching_...

> referer: https://medium.com/@kailash360/getting-started-with-nodejs-eb9ca64aa3b0

**User-Agent header**: Additional information like the _OS/Browser being used_ to create the request.

**Cookie headers**: Cookies are small piece of data which uses browsers as `storage medium` and sent to **server** with each _HTTP Requests_.

## HTTP Responses:

**Server header** —  information about which `web server` software is being used.

> server: cloudflare

**Set-Cookie header** — _ issues the cookie_ to the browser.

**Content-Length header** — tells the _size of the message body_ in bytes.
