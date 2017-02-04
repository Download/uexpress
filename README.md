# uexpress

[![Greenkeeper badge](https://badges.greenkeeper.io/Download/uexpress.svg)](https://greenkeeper.io/)
Microscopically small universal express-like router/dispatcher

[![npm](https://img.shields.io/npm/v/uexpress.svg)](https://npmjs.com/package/uexpress)
[![license](https://img.shields.io/npm/l/uexpress.svg)](https://creativecommons.org/licenses/by/4.0/)
[![travis](https://img.shields.io/travis/Download/uexpress.svg)](https://travis-ci.org/Download/uexpress)
[![greenkeeper](https://img.shields.io/david/Download/uexpress.svg)](https://greenkeeper.io/)
![mind BLOWN](https://img.shields.io/badge/mind-BLOWN-ff69b4.svg)

**uexpress** is a microscopically small universal (works in node and the browser)
router/dispatcher that closely mimics Express, and indeed can be mounted in a
regular express instance. 

## Install
```sh
npm install --save uexpress
```

## require
```js
var uexpress = require('uexpress')
```

## import
```js
import uexpress from 'uexpress'
```

## use
*my-server.js*
```js
import express from 'express'
import uexpress from 'uexpress'

import myapp from './myapp'  // myapp is a uexpress app

express()                    // the 'normal' express app
  // .use(cookieParser)      // .. express middleware
  .use(myapp)                // myapp is mounted in express
	.listen(8080)              // start the server
```

*my-client.js*
```js
import uexpress from 'uexpress'

import myapp from './myapp'  // myapp is a uexpress app

uexpress()                   // uexpress works in the browser
  .use(myapp)                // myapp is mounted in uexpress
	.listen()                  // start the client
```

After the call to `listen`, uexpress will attach an event handler to 
`window.history` and route and dispatch a new request/response cycle 
every time the URL changes, just like express does on the server.

## why
[express](https://npmjs.com/package/express) rocks! Too bad it's only 
available on the server.

**But why would you want to run a web server on the client?**

I don't. But Express is much more than just a web server. In fact,
since it's just an extension to Node's native `http` server, it's
actually lots of things *but* a web server. It's an excellent router
for one and it has a great request/response pipeline with middleware.

It has, in short, the stuff we need when we are building a client-side
rendering app (a SPA perhaps). And even better, if we emulate it's API,
we will be able to take the universal/isomorphic part of our code a 
whole lot further. We can define uexpress apps that can run standalone
on the client, but can also easily be mounted in an Express server.

The best of both worlds!

## Microscopically small
The browser version of uexpress (which is bigger than the server version)
is ~3kB minified and gzipped.

It does have a few dependencies:
* [uroute](https://github.com/download/uroute) Microscopically small Express-like universal routing, ~1.9kB
* [uevents](https://github.com/download/uevents) Microscopically small version of Node's popular `events` module, ~1.6kB
* [uhistory](https://github.com/download/uhistory) Microscopically small History API, ~0.6kB
* [uqs](https://github.com/download/uqs) Microscopically small querystring parser/stringifier, ~0.6kB

## Issues
Add an issue in this project's [issue tracker](https://github.com/download/uexpress/issues)
to let me know of any problems you find, or questions you may have.

## Copyright
Copyright 2016 by [Stijn de Witt](http://StijnDeWitt.com). Some rights reserved.

## License
Licensed under the [Creative Commons Attribution 4.0 International (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/) Open Source license.
