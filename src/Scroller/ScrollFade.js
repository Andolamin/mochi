var
  kind = require('enyo/kind'),
  Control = require('enyo/Control');

/**
* @ui
* @class mochi.ScrollFade
* @extends enyo.Control
* @protected
*/
module.exports = kind(
	/** @lends mochi.ScrollFade.prototype */ {

	/**
	* @private
	*/
	name: 'mochi.ScrollFade',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'mochi-scroll-fade',

	/**
	* @private
	*/
	components:[
		{name:'top', classes: 'top', showing:false, components: [
      {classes:'mochi-scroll-fade-row row-0'},
			{classes:'mochi-scroll-fade-row row-1'},
			{classes:'mochi-scroll-fade-row row-2'},
			{classes:'mochi-scroll-fade-row row-3'},
			{classes:'mochi-scroll-fade-row row-4'}
		]},
		{name:'bottom', classes: 'bottom', showing:false, components: [
			{classes:'mochi-scroll-fade-row row-4'},
			{classes:'mochi-scroll-fade-row row-3'},
			{classes:'mochi-scroll-fade-row row-2'},
			{classes:'mochi-scroll-fade-row row-1'},
			{classes:'mochi-scroll-fade-row row-0'}
		]}
	],

	/**
	* @private
	*/
	fade: function (position) {
			this.$[position].show();
	},

	/**
	* @private
	*/
	hideFade: function () {
		this.$.top.hide();
		this.$.bottom.hide();
		this.fadeLocked = false;
	}

});