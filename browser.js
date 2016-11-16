// uexpress - microscopically small universal express-like router/dispatcher
// © 2016 by Stijn de Witt, some rights reserved. License: CC-BY-4.0
var History = require('uhistory');

var uexpress = require('./uexpress')
var request = require('./request')
var response = require('./response')
var extend = require('./extend')

extend(uexpress.proto, {
	listen: function(history) {
		var app = this
		app.history = History(history)  		
		app.history.on('change', function(){
			app.call(app, request(app), response(app), function(err){
				if (err) {
					res.emit('close')
					app.emit('error', err)
				}
			})
		})
		app.history.emit('change')
	}
})

module.exports = uexpress
