var
  kind = require ('enyo/kind'),
  DataList = require('enyo/DataList'),
  utils = require('enyo/utils');

var
  Scroller = require('../Scroller');

/**
* @ui
* @class mochi.DataList
* @extends enyo.DataList
* @public
*/
module.exports = kind(
	/** @lends mochi.DataList.prototype */ {

	/**
	* @private
	*/
	name: 'mochi.DataList',

	/**
	* @private
	*/
	kind: DataList,
	
	/**
	* @private
	*/
	scrollerOptions: {
    touch: true,
    kind: Scroller
	}
});