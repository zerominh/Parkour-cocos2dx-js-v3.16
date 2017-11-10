var BackgroundLayer = cc.Layer.extend({
	map00:null,
	map01:null,
	mapWidth:0,
	mapIndex:0,// to determine map which the runner is in
	ctor: function () {
		this._super();
		this.init();
		this.scheduleUpdate();
	},
	init: function() {
		this._super();
		this.map00 = new cc.TMXTiledMap(res.map00_tmx);
		this.addChild(this.map00);
		this.mapWidth = this.map00.getContentSize().width;
		this.map01 = new cc.TMXTiledMap(res.map01_tmx);
		this.map01.setPosition(cc.p(this.mapWidth, 0));
		this.addChild(this.map01);
	},
	checkAndReload:function (eyeX) {

		//append screen
		var newMapIndex = parseInt(eyeX / this.mapWidth);
		console.log(newMapIndex);
		if(newMapIndex == this.mapIndex) {
			return false;
		}
		//the runner is in map01
		if(newMapIndex % 2 == 1) {
			console.log("the runner is in map01");
			this.map00.setPositionX(this.mapWidth*2);
		} else {
			console.log("the runner is in map00");
			this.map01.setPositionX(this.mapWidth*2);//the runner is in map00
		}
		mapIndex = newMapIndex;
		return true;
	},

	update:function (dt) {
        var animationLayer = this.getParent().getChildByTag(TagOfLayer.Animation);
        var eyeX = animationLayer.getEyeX();
       // this.checkAndReload(eyeX);

    }

});