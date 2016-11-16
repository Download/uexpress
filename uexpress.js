// uexpress - microscopically small universal express-like router/dispatcher
// © 2016 by Stijn de Witt, some rights reserved. License: CC-BY-4.0
var route = require('uroute')
var EventEmitter = require('uevents')
var extend = require('./extend')

module.exports = uexpress
module.exports.hot = hot
module.exports.extend = extend

function uexpress() {
	var app = extend(Application, uexpress.proto)
	var app = EventEmitter(app).init()
	return app;

	function Application(req, res, next){
		return app.handle(req, res, next)
	}
}

// wraps an app or express style handler or middleware to make it hot-reloadable
// accepts a callback function that should return the app, handler or middleware
function hot(cb) {
	if (cb().routes) {
		var fn, app
		return app = uexpress().use(function hotapp(req, res, next) {
			var newFn = cb()
			if (newFn !== fn) {
				if (fn) {app.unuse(fn)}
				app.use(fn = newFn)
			}
			return next()
		})
	}
	if (cb().length >= 3)
		return function hotmiddleware(req, res, next) {return cb()(req, res, next)}
	else
		return function hothandler(req, res) {return cb()(req, res)}
}

uexpress.proto = {
	settings: {},
	set: function(name, value) {this.settings[name] = value; return this},
	disable: function(name) {this.settings[name] = false; return this},
	disabled: function(name) {return !this.get(name)},
	enable: function(name) {this.settings[name] = true; return this},
	enabled: function(name) {return !!this.get(name)},

	get: function(name) {
		return name in this.settings ? this.settings[name] : this.parent && this.parent.get(name)
	},

	init:function(){
		this.mountpath = '/';
		this.routes = route('/', [])
		return this
	},

	configure: function configure(fn) {
		fn && fn.call(this,this)
		return this
	}, 

	use: function use(path, fn) {
		if (!fn) {fn=path; path=undefined; if (!fn) return}
		if (fn.routes) {	// fn is a sub-app
			if (! path) path = '/'
			fn.mountpath = path
			fn.parent = this
			this.routes.children.push(route(path, {__handler:fn}, fn.routes.children))
			fn.emit('mount', this)
		} else {
			if (! path) path = fn.length >= 3 ? '*' : '/'
			this.routes.children.push(route(path, {__handler:fn}, adapt(fn)))
		}
		return this
	},

	unuse: function unuse(fn) {
		if (fn) {
			for (var i=this.routes.children.length-1; i>=0; i--) {
				var route = this.routes.children[i];
				if (route.__handler === fn) {
					if (fn.routes) fn.emit('unmount', this)
					this.routes.children.splice(i, 1)
					break;
				}
			}
		}
		return this
	},

	handle: function handle(req, res, next) {
		return route.match(this.routes, extend(['host'], {}, req, {response:res}))
	}
}

// Adapts an express style handler to uroute
function adapt(fn) {
	return function adapter(ctx){
		return Promise.resolve(fn(ctx, ctx.response, ctx.next)).then(function(x){
			return x === undefined && fn.length < 3 ? false : x
		})
	}
}

