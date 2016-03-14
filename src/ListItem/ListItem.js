var
  kind = require('enyo/kind'),
  Control = require('enyo/Control');

var
  ListItemBorder = require('./ListItemBorder.js');


/**
* A control designed to display a group of stacked items, typically used in
* lists. Items are displayed with small guide lines between them; by default,
* they are highlighted when tapped. Set *tapHighlight* to false to prevent the
* highlighting.
*
* {kind: 'mochi.ListItem', tapHighlight: false}
*
* @ui
* @class mochi.ListItem
* @extends enyo.Control
* @public
*/
var ListItem = module.exports = kind(
	/** @lends mochi.ListItem.prototype */ {

	/**
	* @private
	*/
	name: 'mochi.ListItem',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'mochi-list-item',

	/**
	* When true, the item will automatically highlight (by application of the mochi-highlight
	* CSS class) when tapped. Set to false to disable this behavior.
	*
	* @type {Boolean}
	* @default true
	* @public
	*/
	tapHighlight: true,

	/**
	* @private
	*/
	handlers: {
		onhold: 'hold',
		onrelease: 'release'
	},

	/**
	* @private
	*/
	topBorder: [
		{name:'topBorder', kind: ListItemBorder, top:true, showing:false}
	],

	/**
	* @private
	*/
	initComponents: kind.inherit(function (sup) {
    return function () {
      this.createChrome(this.topBorder);
      sup.apply(this, arguments);
    };
	}),

	/**
	* @private
	*/
	create: kind.inherit(function (sup) {
    return function () {
      sup.apply(this, arguments);
      this.createComponent({name: 'bottomBorder', kind: ListItemBorder, top:false, showing:false})
    };
	}),

	/**
	* @param {Object} sender - reference to sender of event
	* @param {Object} event - event object
	* @public
	*/
	hold: function (sender, event) {
		if (this.tapHighlight) {
			ListItem.addFlyweightClass(this.controlParent || this, 'mochi-highlight', event);
		}
	},

	/**
	* @param {Object} sender - reference to sender of event
	* @param {Object} event - event object
	* public
	*/
	release: function (sender, event) {
		if (this.tapHighlight) {
			ListItem.removeFlyweightClass(this.controlParent || this, 'mochi-highlight', event);
		}
	},

	/**
	* @private
	* @lends mochi.ListItem.prototype
	*/
	statics: {

		/**
		* @param {Object} inControl - control in list item to add class to
		* @param {Object} inClass - CSS class to add
		* @param {Object} inEvent - event object which contains a reference to flyweight
		* @param {Number} inIndex - index of the list item
		* public
		*/
		addFlyweightClass: function (inControl, inClass, inEvent, inIndex) {
      if (inControl) {
        var width = inControl.getBounds().width;
        if (width) {
          inControl.$.topBorder.showBorder(width, 0);
          inControl.$.bottomBorder.showBorder(width,inControl.getComputedStyleValue('padding-bottom'));
          if (!inControl.hasClass(inClass)) {
            inControl.addClass(inClass);
          } else {
            inControl.setClassAttribute(inControl.getClassAttribute());
          }
        }
      }
		},

		/**
		* @param {Object} inControl - control in list item to add class to
		* @param {Object} inClass - CSS class to remove
		* @param {Object} inEvent - event object which contains a reference to flyweight
		* @param {Number} inIndex - index of the list item
		* @public
		*/
		removeFlyweightClass: function (inControl, inClass, inEvent, inIndex) {
      if (inControl) {
        inControl.$.topBorder.hide();
        inControl.$.bottomBorder.hide();
        if (!inControl.hasClass(inClass)) {
          inControl.setClassAttribute(inControl.getClassAttribute());
        } else {
          inControl.removeClass(inClass);
        }
      }
		}
	}
});