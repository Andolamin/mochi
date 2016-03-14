require('mochi');

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

module.exports = kind({
	classes: "mochi-panel",
	kind: Control,
	published: {
		"reflow": false,
		"minSize": 320,
		"maxSize": 0,
		"fixed": false
	}
});
