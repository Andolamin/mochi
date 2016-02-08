require('mochi');

var
	kind = require('enyo/kind');

var
	ButtonDecorator = require('./ButtonDecorator.js');

/**
* @ui
* @class mochi.ButtonDecoratorLeft
* @extends mochi.ButtonDecorator
* @public
*/
module.exports = kind(
	/** @lends mochi.ButtonDecoratorLeft.prototype */ {

	/**
	* @private
	*/
	name: 'mochi.ButtonDecoratorLeft',

	/**
	* @private
	*/
	kind: ButtonDecorator,

	/**
	* @private
	*/
	classes: 'mochi-button-decorator-left',

	/**
	* @private
	* @lends mochi.ButtonDecoratorLeft.prototype
	*/
	published: {

		/**
		* The character to the left of the button text
		*
		* @type {String}
		* @default '('
		* @public
		*/
		content: '('
	},
	
	bindings: [
		{from: '.content', to: '.$.endCap.content'}
	]

});
