'use strict';
var assert = require('assert');

var Base = {};
Base.extend = function(conf) {
	var klass = function() {
		if (typeof this['init'] !== 'undefined') {
			this['init'].apply(this, arguments);
		}
	};
	for (var pro in conf) {
		if (pro === 'constructor') {
			klass.prototype['init'] = conf[pro];
		} else {
			klass.prototype[pro] = conf[pro];
		}
	}

	var proto = {};
	for (var attr in this.prototype) {
		if (typeof this.prototype[attr] === 'function') {
			proto[attr] = this.prototype[attr];
		}
	}
	klass.prototype.__proto__ = proto;

	klass.extend = Base.extend;

	return klass;
};

var Person = Base.extend({
	constructor: function(name) {
		this.name = name;
	},
	get_name: function() {
		return this.name;
	}
});

var User = Person.extend({
	constructor: function(name, password) {
		this.name = name;
		this.password = password;
	},
	get_password: function() {
		return this.password;
	}
});

describe('Base', function() {
	it('extend', function() {
		var jobs = new User('jobs', '123');
		assert.equal('jobs', jobs.get_name());
		assert.equal('123', jobs.get_password());
	});
});