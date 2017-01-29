var expect = require('chai').expect

var uexpress = require('./browser')
var extend = require('./browser').extend

describe('uexpress (browser)', function(){

	it('is a function', function(){
		expect(uexpress).to.be.a('function')
	})

	it('produces an app function when called', function(){
		expect(uexpress()).to.be.a('function')
	})

	describe('app function', function(){
		var app = uexpress()

		it('has a property `settings`', function(){
			expect(app.settings).to.be.an('object')
		})

		it('has a method `init`', function(){
			expect(app.init).to.be.a('function')
		})

		it('has a method `configure`', function(){
			expect(app.configure).to.be.a('function')
		})

		it('has a method `get`', function(){
			expect(app.get).to.be.a('function')
		})

		it('has a method `set`', function(){
			expect(app.set).to.be.a('function')
		})

		it('has a method `disable`', function(){
			expect(app.disable).to.be.a('function')
		})

		it('has a method `disabled`', function(){
			expect(app.disabled).to.be.a('function')
		})

		it('has a method `enable`', function(){
			expect(app.enable).to.be.a('function')
		})

		it('has a method `enabled`', function(){
			expect(app.enabled).to.be.a('function')
		})

		it('has a method `use`', function(){
			expect(app.use).to.be.a('function')
		})

		it('has a method `unuse`', function(){
			expect(app.unuse).to.be.a('function')
		})

		it('has a method `handle`', function(){
			expect(app.handle).to.be.a('function')
		})

		it('accepts three parameters', function(){
			expect(app.length).to.equal(3)
		})

		it('invokes it\'s `handle` method when called', function(){
			var oldHandle = app.handle
			var called = false 
			app.handle = function stub() {
				called = true
			}
			app({}, {}, function next(){})
			expect(called).to.equal(true)
		})
	})
})

var History = require('uhistory')
var MemoryContext = require('uhistory/memorycontext')

describe('Request (browser only)', function(){

	it('is created when the URL in the address bar changes', function(done){
		var ctx = MemoryContext()
		ctx.cookie = ''
		var app = uexpress()
			.use('*', function(req, res){
				expect(req).to.be.an('object')
				done()
			})
			.listen(ctx)
		app.history.pushState({}, '', '/test')
	})

	it('has an API that mimics Express', function(done){
		var ctx = MemoryContext()
		ctx.cookie = ''
		var app = uexpress()
			.use('*', function(req, res){
				try {
					expect(req.app).to.eq(app)
					expect(req.method).to.eq('POST')
					expect(req.body).to.deep.eq({test:'success'})
					expect(req.url).to.eq(ctx.location.href),
					expect(req.secure).to.eq(false)
					expect(req.path).to.eq(ctx.location.pathname)
					expect(req.query).to.deep.eq({})
					expect(req.cookies).to.deep.eq({})
					done()
				} catch(e){done(e)}
			})
			.listen(ctx)
		app.history.pushState({test:'success'}, '', '/test')
	})

	it('...', function(){
	})
})
