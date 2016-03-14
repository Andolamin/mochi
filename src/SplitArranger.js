/**
* Contains the declaration for the {@link module:mochi/SplitArranger~SplitArranger} kind.
* @module mochi/SplitArranger
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom');

var
	Arranger = require('layout/Arranger');

/**
* {@link module:mochi/SplitArranger~SplitArranger} is a
* {@link module:layout/Arranger~Arranger} that displays a fixed control,
* along with an active control to fill the available space. The fixed control
* is positioned on the left side of the container, and the active control is
* laid out to the right.
*
* Transitions between arrangements are handled by fading the old controls out
* and fading the new controls in.
*
* @class SplitArranger
* @extends module:layout/Arranger~Arranger
* @public
*/
module.exports = kind(
	/** @lends module:mochit/SplitArranger~SplitArranger */ {

	/**
	* @private
	*/
	name: 'mochi.SplitArranger',

	/**
	* @private
	*/
	kind: Arranger,

	/**
	* Calculates the size of each panel.
	*
	* @protected
	*/
	size: function () {
		var c$ = this.container.getPanels();
		var padding = this.containerPadding = this.container.hasNode() ? dom.calcPaddingExtents(this.container.node) : {};
		var pb = this.containerBounds;
		var i, e, s, m, c;
		pb.height -= padding.top + padding.bottom;
		pb.width -= padding.left + padding.right;
		for (i=0, s=0; (c=c$[i]); i++) {
			m = dom.calcMarginExtents(c.hasNode());
			c.width = c.getBounds().width;
			c.marginWidth = m.right + m.left;
			if (i === 0) {
        s += c.width + c.marginWidth;
			} else {
        var w = pb.width - s;
        c.width = w >= 0 ? w : fit.width;
			}
		}
		for (i=0; (c=c$[i]); i++) {
			c.setBounds({top: padding.top, bottom: padding.bottom, width: c.fit ? c.width : null});
		}
	},

	/**
	* @see {@link module:layout/Arranger~Arranger#arrange}
	* @protected
	*/
	arrange: function (controls, arrangement) {
    var padding = this.containerPadding = this.container.hasNode() ? dom.calcPaddingExtents(this.container.node) : {};
		var pb = this.containerBounds;
		pb.width -= padding.left + padding.right;
    if (controls.length < 2) {
      return;
    } else {
      this.arrangeControl(controls[0], {"left": 0});
      arrangement = Math.max(1, arrangement);
      for (var i = 1; (c=controls[i]); i++) {
        var showing = false;
        if (i === arrangement) {
          showing = true;
        }
        this.arrangeControl(c, {"left": (controls[0].width + controls[0].marginWidth), "opacity": showing ? 1 : 0});
        c.setBounds({width: pb.width - (controls[0].width + controls[0].marginWidth)});
        c.applyStyle("pointer-events", showing ? null : 'none');
      }
    }
	},
	
  _arrange: function (index) {
    var c$ = this.container.getPanels();
		this.arrange(c$, index);
	},

	/**
	* Resets the size and position of all panels.
	*
	* @method
	* @private
	*/
	destroy: kind.inherit(function (sup) {
		return function () {
			var c$ = this.container.getPanels();
			for (var i=0, c; (c=c$[i]); i++) {
				Arranger.positionControl(c, {left: null, top: null});
				c.applyStyle('top', null);
				c.applyStyle('bottom', null);
				c.applyStyle('left', null);
				c.applyStyle('width', null);
				c.applyStyle('opacity', null);
				c.applyStyle('z-index', null);
			}
			sup.apply(this, arguments);
		};
	})
});
