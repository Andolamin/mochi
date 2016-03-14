var
  kind = require('enyo/kind'),
  Control = require('enyo/Control');

/**
* @ui
* @class mochi.ListItemBorder
* @extends enyo.Control
* @public
*/
module.exports = kind(
	/** @lends mochi.ListItemBorder.prototype */ {

	/**
	* @private
	*/
	name: 'mochi.ListItemBorder',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'mochi-highlight-border',

	/**
	* @private
	* @lends mochi.ListItemBorder.prototype
	*/
	published: {

		/**
		* whether to add a `top` or `bottom` CSS class
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		top: true,

		/**
		* total width of list item
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		width: 0,

		/**
		* margin at top of list item
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		marginTop: 0
	},

	/**
	* total width of left and right fade edges
	*
	* @private
	*/
	edgeWidths: 224,

	/**
	* total width of left and right fade edges for wide list
	*
	* @private
	*/
	largeEdgeWidths: 640,

	/**
	* @private
	*/
	create: kind.inherit(function (sup) {
    return function () {
      sup.apply(this, arguments);
      this.topChanged();
    };
	}),

	/**
	* @private
	*/
	showBorder: function (width,marginTop){
		this.setMarginTop(marginTop);
		this.width = width;
		this.widthChanged();
		this.show();
	},

	/**
	* @private
	*/
	topChanged: function (){
		this.addClass(this.top ? 'top' : 'bottom');
	},

	/**
	* @private
	*/
	widthChanged: function (){
		if (this.width < this.largeEdgeWidths) {
			this.removeClass('large');
		}
		else {
			this.addClass('large');
		}

		//do not include the edges in the total width, those are applied using css pseudoclasses
		this.setStyle('width:'+ (this.width - ((this.width < this.largeEdgeWidths) ? this.edgeWidths : this.largeEdgeWidths)) +
		              'px;margin-top:' + this.marginTop);
		this.render(); //re-render to ensure styles/classes are applied
	}

});