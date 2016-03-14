var
  kind = require('enyo/kind'),
  Control = require('enyo/Control'),
  dom = require('enyo/dom');

/**
* A mochi-styled Header control. This will display a single line of text,
* alongside an optional control.
*
* ```javascript
* {kind: 'mochi.Header', content: 'This is a header', components: [
* 	{kind: 'mochi.Button', content: 'Button'}
* ]}
* ```
*
* It is intended that only 1 control be used with a {@link mochi.Header}.
* However, multiple controls should align properly as inline-blocks.
*
* @ui
* @class mochi.Header
* @extends enyo.Control
* @public
*/
module.exports = kind(
	/** @lends mochi.Header.prototype */ {

	/**
	* @private
	*/
	name: 'mochi.Header',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'mochi-header',

	/**
	* @private
	* @lends mochi.Header.prototype
	*/
	published: {

		/**
		* Custom CSS classes to apply to header
		*
		* @type {String}
		* @default ''
		* @public
		*/
		customClasses: ''
	},

	/**
	* @private
	*/
	tools: [
		{name: 'headerContent', classes: 'mochi-header-content'},
		{name: 'client', classes: 'mochi-header-controls'}
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
	* Minimum px width allowed for content
	* 80px is generally enough to display 1 letter and ellipsis
	*
	* @private
	*/
	minContentWidth: 80,

	/**
	* @private
	*/
	customClassesChanged: function (inOld) {
		this.$.headerContent.removeClass(inOld);
		this.$.headerContent.addClass(this.customClasses);
	},

	/**
	* @private
	*/
	contentChanged: function () {
		this.$.headerContent.setContent(this.content);
	},

	/**
	* @private
	*/
  rendered: kind.inherit(function (sup) {
    return function () {
      sup.apply(this, arguments);
      this.customClassesChanged();
      this.adjustControls();
      this.adjustContent();
    };
	}),

	/**
	* @private
	*/
	resizeHandler: kind.inherit(function (sup) {
    return function () {
      sup.apply(this, arguments);
      this.adjustContent();
    };
	}),

	/**
	* @private
	*/
	adjustControls: function () {
		var controls = this.getClientControls();
		var len = controls.length;

		if (len > 0) {
			this.$.client.addClass('mochi-header-controls-first');
		}
	},

	/**
	* @private
	*/
	adjustContent: function () {
		var padding = this.hasNode() ? dom.calcPaddingExtents(this.node) : {};
		var pw = padding.left + padding.right;
		var controls = this.getClientControls();
		var len = controls.length;

		if (len === 0) {
			var contentWidth = this.getBounds().width - pw;
		} else {
			var controlWidth = this.$.client.getBounds().width;
			var contentWidth = Math.max(this.minContentWidth, ((this.getBounds().width - controlWidth) - pw) );

			this.$.headerContent.applyStyle('max-width', contentWidth + 'px');
		}
		this.$.headerContent.applyStyle('width', contentWidth + 'px');
	}
});

