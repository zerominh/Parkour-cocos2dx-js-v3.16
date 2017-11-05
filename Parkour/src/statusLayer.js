var StatusLayer = cc.Layer.extend({
	labelCoin: null,
	labelDistance: null,
	coins: null,
	ctor: function() {
		this._super();
		this.init();
	},
	//intialize function
	init: function() {
		this._super();
		var winSize = cc.director.getWinSize();

		this.labelCoin = new cc.LabelTTF("Coins: 0", "Helvetica", 10);
		this.labelCoin.setColor(new cc.Color(0, 0, 0, 255));
		this.labelCoin.setPosition(cc.p(20, winSize.height-10));
		this.addChild(this.labelCoin);

		this.labelDistance = new cc.LabelTTF("Distance: 0", "Helvetica", 10);
		this.labelDistance.setColor(new cc.Color(0, 0, 0, 255));
		this.labelDistance.setPosition(cc.p(winSize.width -40,winSize.height-10));
		this.addChild(this.labelDistance);
	},
});