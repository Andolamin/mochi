var
	utils = require('enyo/utils'),
	options = require('enyo/options');

var config = global.mochi && global.mochi.config;

/**
* Global configuration options for Mochi
*/
module.exports = utils.mixin(
	utils.mixin({
		/** @lends module:mochi/options */
		theme: "light"
	}, options),
config);
