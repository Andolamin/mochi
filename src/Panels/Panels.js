require('mochi');

var
	kind = require('enyo/kind');

var
	Panels = require('layout/Panels');

var
  SplitArranger = require('../SplitArranger.js');

module.exports = kind({
  name: "mochi.Panels",
  kind: Panels,
	classes: "mochi-panels",
	chromeComponents: [
		{
			name: "basementModal",
			style: "display: none;"
		},
		{
			name: "client",
			kind: Panels
		},
		{
			name: "floatingModal",
			style: "display: none;"
		}
	],
	statics: {
    Split: "split",
    Stacking: "stacking",
    Cover: "cover"
	},
	published: {
		"layoutStyle": 1 // stacking, split, cover
	},
	bindings: [
    {from: '.layoutStyle', to: '.arrangerKind', transform: function (v) {
      switch (v) {
        case this.kind.Split:
          this.set('draggable', false);
          return SplitArranger;
        default:
          this.set('draggable', false);
          console.warn("Only 'split' panels style is currently supported");
          return SplitArranger;
      }
    }}
  ]
});