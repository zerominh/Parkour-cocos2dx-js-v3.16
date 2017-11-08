var BackgroundLayer = cc.Layer.extend({
	map00:null,
	map01:null,
	mapWidth:0,
	mapIndex:0,
	ctor: function () {
		this._super();
		this.init();
	},
	init: function() {
		this._super();
		// //get win size
  //       var winSize =   cc.director.getWinSize();
  //       //create background
  //       var centerPos = new cc.p(winSize.width/2, winSize.height/2);
		// var backgroundSprite = new cc.Sprite(res.PlayBG_png);
		// backgroundSprite.setPosition(centerPos);
		// this.addChild(backgroundSprite);
		this.map00 = new cc.TMXTiledMap(res.map00_tmx);
		this.addChild(this.map00);
		this.mapWidth = this.map00.getContentSize().width;
		this.map01 = new cc.TMXTiledMap(res.map01_tmx);
		this.map01.setPosition(cc.p(this.mapWidth, 0));
		this.addChild(this.map01);
	},
});