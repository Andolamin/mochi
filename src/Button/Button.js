require('mochi');

var
	kind = require('enyo/kind'),
	GroupItem = require('enyo/GroupItem');

var
	FittableColumns = require('layout/FittableColumns');

var
	ButtonDecoratorLeft = require('./ButtonDecoratorLeft.js'),
	ButtonDecoratorRight = require('./ButtonDecoratorRight.js');

/**
* A button in the mochi style. The active state of the button may be customized by
* applying a custom style.
*
* ```javascript
* {kind: 'mochi.Button', content: 'Button'},
* ```
*
* @ui
* @class mochi.Button
* @extends enyo.GroupItem
* @public
*/
module.exports = kind(
	/** @lends mochi.Button.prototype */ {

	/**
	* @private
	*/
	name: 'mochi.Button',

	/**
	* @private
	*/
	kind: GroupItem,

	/**
	* @private
	*/
	tag: 'button',

	/**
	* @private
	*/
	classes: 'enyo-tool-decorator mochi-button',

	/**
	* @private
	* @lends mochi.Button.prototype
	*/
	published: {

		/**
		* When `true`, the [button]{@glossary button} is shown as disabled and does not
		* generate tap [events]{@glossary event}.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disabled: false,

		/**
		* The button text
		*
		* @type {String}
		* @default ''
		* @public
		*/
		content: '',

		/**
		* CSS classes applied to the underline bar. If '', the default is used
		*
		* @type {String}
		* @default ''
		* @public
		*/
		barClasses: '',

		/**
		* The character to the left of the button text
		*
		* @type {String}
		* @default '('
		* @public
		*/
		decoratorLeft: '(',

		/**
		* The character to the right of the button text
		*
		* @type {String}
		* @default ')'
		* @public
		*/
		decoratorRight: ')'
	},

	/**
	* @private
	*/
	tools: [
		{
			kind: FittableColumns,
			components: [
				{kind: ButtonDecoratorLeft},
				{name: 'button', classes: 'mochi-button-base'},
				{name: 'client'},
				{kind: ButtonDecoratorRight}
			]
		},
		{name: 'bar', classes: 'mochi-button-bar'}
	],

	bindings: [
		{from: '.decoratorLeft', to: '.$.buttonDecoratorLeft.content'},
		{from: '.decoratorRight', to: '.$.buttonDecoratorRight.content'}
	],

	/**
	* @private
	*/
	initComponents: kind.inherit(function (sup) {
		return function () {
			this.createChrome(this.tools);
			sup.apply(this, arguments);
		};
	}),

	/**
	* @private
	*/
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.disabledChanged();
		};
	}),

	/**
	* @private
	*/
	rendered: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.activeChanged();
			this.calcBarValue();
			this.barClassesChanged();
		};
	}),

	/**
	* @private
	*/
	disabledChanged: function () {
		this.setAttribute('disabled', this.disabled);
		this.addRemoveClass('disabled', this.disabled);
	},

	/**
	* @private
	*/
	barClassesChanged: function (inOld) {
		this.$.bar.removeClass(inOld);
		this.$.bar.addClass(this.barClasses);
	},

	/**
	* @private
	*/
	updateBarPosition: function (bounds) {
		this.$.bar.applyStyle('width', (bounds.width-bounds.width*5/100) + 'px');
		this.$.bar.applyStyle('left', bounds.left + 'px');
	},

	/**
	* @private
	*/
	calcBarValue: function () {
		var bounds = this.$.button.getBounds();
		this.updateBarPosition(bounds);
	},

	/**
	* @private
	*/
	contentChanged: function () {
		this.$.button.setContent(this.content);
		this.calcBarValue();
	},

	/**
	* @private
	*/
	tap: function () {
		if (this.disabled) {
			// work around for platforms like Chrome on Android or Opera that send
			// mouseup to disabled form controls
			return true;
		} else {
			this.setActive(true);
		}
	}
});

