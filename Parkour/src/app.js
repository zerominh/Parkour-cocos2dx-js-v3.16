
// var HelloWorldLayer = cc.Layer.extend({
//     sprite:null,
//     ctor:function () {
//         //////////////////////////////
//         // 1. super init first
//         this._super();

//         /////////////////////////////
//         // 2. add a menu item with "X" image, which is clicked to quit the program
//         //    you may modify it.
//         // ask the window size
//         var size = cc.winSize;

//         this.sprite = new cc.Sprite(res.Start_n_png);
//         this.sprite.attr({
//             x: size.width / 2,
//             y: size.height / 2
//         });
//         this.addChild(this.sprite, 0);

//         return true;
//     }
// });

// var HelloWorldScene = cc.Scene.extend({
//     onEnter:function () {
//         this._super();
//         var layer = new HelloWorldLayer();
//         this.addChild(layer);
//     }
// });

var MenuLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    //initialize function
    init: function() {
        this._super();

        //get the screen size of your game canvas
        var winSize = cc.director.getWinSize();
        //calculus the center point
        var centerPos = new cc.p(winSize.width/2, winSize.height/2);
        //create a background image and set it's position at the center of the screen
        var spriteBackGround = new cc.Sprite(res.HelloBG_png);
        spriteBackGround.setPosition(centerPos);
        this.addChild(spriteBackGround);
        //create menu and assign onPlay event callback to it
        var menuItemPlay = new cc.MenuItemSprite(
            new cc.Sprite(res.Start_n_png),
            new cc.Sprite(res.Start_s_png),
            this.onPlay,
            this);
        //create a menu
        var menu = new cc.Menu(menuItemPlay);
        menu.setPosition(centerPos);
        this.addChild(menu);
    },
    onPlay: function() {
        cc.log("on play");
        cc.director.runScene(new PlayScene());
    },
});
var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});

