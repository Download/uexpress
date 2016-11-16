var expect = require('chai').expect
var uexpress = require('./browser')

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
