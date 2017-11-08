var MenuLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        this.init();
    },
    init: function() {
        this._super();
        //get win size
        var winSize =   cc.director.getWinSize();
        //create background
        var centerPos = new cc.p(winSize.width/2, winSize.height/2);
        var spriteBG = new cc.Sprite(res.helloBG_png);
        spriteBG.setPosition(centerPos);
        this.addChild(spriteBG);
        //create menu start
        var menuItemPlay = new cc.MenuItemSprite(
            new cc.Sprite(res.start_n_png), // normal state image
            new cc.Sprite(res.start_s_png), // select state image
            this.onPlay, this);
        var menu = new cc.Menu(menuItemPlay);  //7. create the menu
        menu.setPosition(centerPos);
        this.addChild(menu);
    },
    onPlay: function() {
        cc.director.runScene(new PlayScene());
    },

});
var MenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.addChild(new MenuLayer());
    }
});