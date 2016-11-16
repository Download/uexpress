var EventEmitter = require('uevents');
var QS = require('uqs')

var extend = require('../extend')

module.exports = function request(app) {
	return extend(EventEmitter(), {
		app: app,
		baseUrl: app.mountpath,
		method: 'GET',
		url: location.href,
		secure: location.protocol.indexOf('https') === 0,
		path: location.pathname,
		query: QS.parse(location.search),
		cookies: parseCookies()
	})
}

function parseCookies() {
	var result = {}, cookies = document.cookie.split(';')
	for (var i=0, cookie; cookie=cookies[i]; i++) {
			var pair = cookie.trim().split('=')
			result[pair[0]] = pair[1]
	}
	return result	
}