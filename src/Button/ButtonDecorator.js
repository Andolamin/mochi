require('mochi');

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

/**
* A decoration style for buttons. Usually not directly called outside of specific tools
*
* @ui
* @class mochi.ButtonDecorator
* @extends enyo.Control
* @oublic
*/
module.exports = kind(
	/** @lends mochi.ButtonDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'mochi.ButtonDecorator',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'enyo-unselectable mochi-button-decorator',

	/**
	* @private
	*/
	components: [
		{name: 'endCap', classes: 'mochi-button-decorator-bookened'}
	]
});
