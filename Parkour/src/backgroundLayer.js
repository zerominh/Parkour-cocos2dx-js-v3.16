var BackgroundLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    //initialize function
    init: function () {
        this._super();
        //get the winsize
        var winSize = cc.director.getWinSize();
        //create background imgae at the center of the screen
        var spiteBackgroundImage = new cc.Sprite(res.PlayBG_png);
        spiteBackgroundImage.setPosition(new cc.p(winSize.width/2, winSize.height/2));
        this.addChild(spiteBackgroundImage);
    }
});

