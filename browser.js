// uexpress - microscopically small universal express-like router/dispatcher
// © 2016 by Stijn de Witt, some rights reserved. License: CC-BY-4.0
var History = require('uhistory');

var uexpress = require('./uexpress')
var request = require('./request')
var response = require('./response')
var extend = require('./extend')

extend(uexpress.proto, {
	listen: function(ctx) {
		var app = this
		app.history = History(ctx || window)
		var cookie = ctx && ctx.cookie !== undefined ? ctx.cookie : document.cookie
		app.history.on('change', function(location, state){
			app.call(app, request(app, location, state, cookie), response(app), function(err){
				if (err) {
					res.emit('close')
					app.emit('error', err)
				}
			})
		})
		return app
	}
})

module.exports = uexpress
