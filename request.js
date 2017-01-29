var EventEmitter = require('uevents');
var QS = require('uqs')

var extend = require('./extend')

module.exports = function request(app, location, state, cookie) {
	return extend(EventEmitter(), {
		app: app,
		baseUrl: app.mountpath || '/',
		method: state ? 'POST' : 'GET',
		body: state || {},
		url: location && location.href || '/',
		secure: location && location.href && location.href.indexOf('https') === 0,
		path: location && location.pathname || '/',
		query: location && (typeof location.search == 'string') && QS.parse(location.search) || {},
		cookies: parseCookies(cookie)
	})
}

function parseCookies(cookie) {
	var result = {}, cookies = cookie.split(';')
	for (var i=0, cookie; cookie=cookies[i]; i++) {
			var pair = cookie.trim().split('=')
			result[pair[0]] = parseJsonCookie(pair[1])
	}
	return result	
}

function parseJsonCookie(str) {
  if (str && str.substr(0, 2) == 'j:') {
  	try {str = JSON.parse(str.slice(2))} 
		catch (err) {}
  }
	return str
}
