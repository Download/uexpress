var EventEmitter = require('uevents');

var extend = require('./extend')

module.exports = function response(app){
	return extend(EventEmitter(), {
		statusCode: 200,

		status: function status(code) {
			this.statusCode = code
			return this
		},

		redirect: function redirect(status, path) {
			if (typeof status != 'number') {path=status; status=null}
			if (status) this.statusCode = status
			this.end()
			app.history.pushState({url:url}, url, url)
		},

		end: function end() {
			this.emit('finish')
			return this
		}
	})
}
