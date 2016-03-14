var
  kind = require('enyo/kind'),
  Scroller = require('enyo/Scroller');
  
var
  ScrollFade = require('./ScrollFade.js');

/**
* @ui
* @class mochi.Scroller
* @extends enyo.Scroller
* @public
*/
module.exports = kind(
	/** @lends mochi.Scroller.prototype */ {
  name: "mochi.Scroller",
  
  kind: Scroller,
  
  /*
  * @public
  */
  published: {
    scrollFade: true
  },

  /**
	* @private
	*/
	_scrollFade: {name: 'scrollFade', kind: ScrollFade},
	
	/**
	* @private
	*/
	strategyKindChanged: kind.inherit(function (sup) {
    return function () {
      if (this.$.scrollFade) {
        this.$.scrollFade.destroy();
      }
      sup.apply(this, arguments);
    };
	}),

	/**
	* @private
	*/
	createStrategy: function () {
    var components = [{name: 'strategy', maxHeight: this.maxHeight,
			kind: this.strategyKind, thumb: this.thumb,
			preventDragPropagation: this.preventDragPropagation,
			overscroll:this.touchOverscroll, isChrome: true}];
		if (this.scrollFade) {
      components.push(this._scrollFade);
		}
		this.createComponents(components);
	},
  
  /**
  * @public
  */
  remeasure: kind.inherit(function (sup) {
    return function () {
      sup.apply(this, arguments);
      this.throttleJob('updateScrollFade', 'updateScrollFade', 100);
    };
  }),
  
  /**
  * @private
  */
  scroll: kind.inherit(function (sup) {
    return function () {
      sup.apply(this, arguments);
      this.throttleJob('updateScrollFade', 'updateScrollFade', 100);
    };
  }),
  
  /**
	* show/hide the scroll fade based on the scrolling direction
	*
	* @private
	*/
	updateScrollFade: function () {
    if (this.$.scrollFade) {
      var scrollBounds = this.getScrollBounds();
      this.$.scrollFade.hideFade();
      if (scrollBounds.top > 0) {
        this.$.scrollFade.fade('top');
      }
      if ((scrollBounds.top + scrollBounds.clientHeight) < scrollBounds.height) {
        this.$.scrollFade.fade('bottom');
      }
    }
	}
});
