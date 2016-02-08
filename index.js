'use strict';

var ready = require('enyo/ready');

exports = module.exports = require('./src/options');
exports.version = '2.7.0-pre.1';

ready(function () {
	switch (exports.theme) {
		case "dark":
			document.body.classList.add('mochi-dark');
			break;
		case "light":
		default:
			document.body.classList.add('mochi-light');
			break;
	}
});
