require('mochi');

var
	kind = require('enyo/kind');

var
	ButtonDecorator = require('./ButtonDecorator.js');

/**
* @ui
* @class mochi.ButtonDecoratorRight
* @extends mochi.ButtonDecorator
* @public
*/
module.exports = kind(
	/** @lends mochi.ButtonDecoratorRight.prototype */ {

	/**
	* @private
	*/
	name: 'mochi.ButtonDecoratorRight',

	/**
	* @private
	*/
	kind: ButtonDecorator,

	/**
	* @private
	*/
	classes: 'mochi-button-decorator-right',

	/**
	* @private
	* @lends mochi.ButtonDecoratorRight.prototype
	*/
	published: {

		/**
		* The character to the left of the button text
		*
		* @type {String}
		* @default ')'
		* @public
		*/
		content: ')'
	},
	
	bindings: [
		{from: '.content', to: '.$.endCap.content'}
	]

});
