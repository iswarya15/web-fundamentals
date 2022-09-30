# HTTP (HyperText Transfer Protocol)

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

### Top level domain name (TLD)

TLD is _everything that follows after_ the `final dot of a domain name`. For example, in www.google.com - .com is the TLD.

When a user enters a domain name like `google.com` into the browser, the **DNS Resolvers** _start the search by communication_ with the `TLD Server`. So the corresponding `TLD DNS Server` will provide the resolver with the **IP address** of `google.com`.

**Path**: Specifies the `exact location` of the page/file.

## HTTP Requests:

In HTTP, every requests must have a `URL address`. Additionally, the request needs a `method`.

- GET: READ
- PUT: UPDATE
- POST: CREATE
- DELETE: DELETE

All HTTP messages have one or more _headers_, followed by an _optional message body/payload_.

## HTTP Headers

HTTP Headers are defined as `name: value` pairs separated by a colon. Used to send _additional parameters_ along with request/response.

### Different type of headers

- General Header: Can be used with both Request/Response.
- Request Header: Information about Client making the request.
- Response Header: Information about Incoming Response.
- Entity Header: Describes the content that comes with message body.

![0-0BI1BEJpajUiJ_4R](https://user-images.githubusercontent.com/85299439/193218898-b08c4e9a-2ea1-499e-8829-8164b701483c.jpg)

### Other interesting things in a request

**Referrer Header**: _Address of the webpage_ that makes the HTTP request. This _data can be used for Analytics, Logging, Caching_...

> referer: https://medium.com/@kailash360/getting-started-with-nodejs-eb9ca64aa3b0

**User-Agent header**: Additional information like the _OS/Browser being used_ to create the request.

**Cookie headers**: Cookies are small piece of data which uses browsers as `storage medium` and sent to **server** with each _HTTP Requests_.

## HTTP Responses

**Server header** —  information about which `web server` software is being used.

> server: cloudflare

**Set-Cookie header** — _ issues the cookie_ to the browser.

**Content-Length header** — tells the _size of the message body_ in bytes.

### Other HTTP Methods

- HEAD: Similar to GET method but will _not return a message body_ in the response. This returns _information about the resource_ we're trying to get.

Often used by clients who use `Caching`, to see _if the document has changed since it was last accessed_.

HEAD method could _read the content-length_ header without having to download it.

- TRACE: Used for `debugging purpose` which returns the full _HTTP request back to the client in the message body_.

- PATCH: Used for `modifying resources` where the _client sends partial data_ that is to be updated **without modifying the entire data**.

### PUT vs PATCH

PUT _replaces the entire resource_ if it exists with the data that Client sends.

PATCH does _partial update_. eg. Fields that need to be updated by the client, without modifying the other fields.

## HTTP Status Codes

There are five groups of `status codes` which are `grouped by the first digit`:

- 1xx   Request _received_, continuing process.
- 2xx  The request was _successful_.
- 3xx   The _client is redirected_ to a different resource.
- 4xx   The _request contains an error_ of some kind.
- 5xx   The _server encountered an error_ fulfilling the request.

![Steve_Losh_on_Twitter___HTTP_status_ranges_in_a_nutshell__1xx__hold_on_2xx__here_you_go_3xx__go_away_4xx__you_fucked_up_5xx__I_fucked_up_](https://user-images.githubusercontent.com/85299439/193220026-c0090e07-28fb-4277-8a55-03dcb42c46bd.png)

## HTTPS (Hypertext Transfer Protocol Secure)

HTTP transfers **plain text** over the connection _which can be read by someone_ who has access to your connection.

The `secure version` of HTTP protocol is HyperText Transfer Protocol Secure (HTTPS). HTTPS provides **encrypted communication** between a browser (client) and the website (server).

In HTTPS, the communication is encrypted using `TLS (Transport Layer Security) / SSL (Secure Sockets Layer)`.

![1_ytzlE-W_8ZVanSb1luVCtg](https://user-images.githubusercontent.com/85299439/193221844-e9632054-d8d3-411a-9cc2-9d191387dc03.jpg)

### Asymmetric Encryption System

Both _TLS & SSL_ use an Asymmetric Encryption system. Asymmetric encryption system uses a `public key` (encryption key) and a `private key` (decryption key) to encrypt a message.

![0-pB_y5GVIF_O_z4lw](https://user-images.githubusercontent.com/85299439/193225114-861c3d83-f696-40d0-9e84-db2f0e9976d3.gif)

Incase of `Symmetric Encryption system`, _same key_ is used to encrypt and decrypt the message.

### SSL/TLS Handshake

When you request a `HTTPS connection` to a `web server`, the server sends its `SSL Certificate` to the browser. The process where the _browser and server initiate communication_ is called **SSL/TLS Handshake**.

The `SSL/TLS Handshake` involves a series of steps where the _browser and server validate each other_ and start communication through the SSL/TLS tunnel.

When a `secure connection` is established through the HTTPS, the _green padlock icon_ is displayed in the _browsers address bar_.

![0-g7q-rF8JTGp7fs19](https://user-images.githubusercontent.com/85299439/193229407-31ae628c-0d39-43b2-ae82-b8a030314792.png)
