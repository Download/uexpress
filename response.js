var EventEmitter = require('uevents');

var extend = require('./extend')

module.exports = function response(app){
	return extend(EventEmitter(), {
		statusCode: 200,
		finished: false,

		/**
		 * Sets the HTTP status for the response.
		 * SEE https://expressjs.com/en/api.html#res.status
		 */
		status: function status(code) {
			this.statusCode = code
			return this
		},

		/**
		 * Redirects to the URL derived from the specified path, with specified status
		 * SEE https://expressjs.com/en/api.html#res.redirect
		 */
		redirect: function redirect(status, path) {
			if (typeof status != 'number') {path=status; status=null}
			this.status(status || 302)
			this.end()
			app.history.pushState({url:url}, url, url)
		},

		/**
		 * Sets cookie name to value. 
		 * SEE https://expressjs.com/en/api.html#res.cookie
		 * SEE https://tools.ietf.org/html/draft-west-first-party-cookies-07
		 * (option `httpOnly` is not available in the browser)
		 */
		cookie: function cookie(name, val, options) {
  		if (typeof val == 'object') val = 'j:' + JSON.stringify(val)
			val = String(value);
			var opt = extend({}, options)
			if ('maxAge' in opts) {
				opts.expires = new Date(Date.now() + opts.maxAge);
				opts.maxAge /= 1000;
			}
			if (opts.path == null) opts.path = '/'
			var enc = opt.encode || encodeURIComponent, 
					c = name + '=' + enc(val)
  		if (opt.maxAge)   c += '; Max-Age=' + Math.floor(maxAge)
  		if (opt.domain)   c += '; Domain=' + opt.domain
		  if (opt.path)     c += '; Path=' + opt.path
  		if (opt.expires)  c += '; Expires=' + opt.expires.toUTCString()
  		if (opt.secure)   c += '; Secure'
			if (opt.sameSite) c += opt.sameSite.toLowerCase && (opt.sameSite.toLowerCase() == 'lax') ? 
					'; SameSite=Lax' : '; SameSite=Strict'
			document.cookie = c
			return this
		},

		/**
		 * Clears the cookie specified by name. 
		 * SEE https://expressjs.com/en/api.html#res.clearCookie
		 */
		clearCookie: function clearCookie(name, options) {
  		return this.cookie(name, '', merge({expires:new Date(1), path:'/'}, options))
		},

		end: function end(data, encoding, cb) {
			if (typeof data == 'function') {cb = data; data=undefined}
			if (typeof encoding == 'function') {cb = encoding; encoding=undefined}
			if (data) {/* not sure what to do here */}
			this.finished = true
			if (cb) {cb()}
			this.emit('finish')
			return this
		}
	})
}
