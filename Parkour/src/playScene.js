var PlayScene = cc.Scene.extend({
	space: null,
	gameLayer: null,
    shapesToRemove :[],

    onEnter: function() {
		this._super();
        this.shapesToRemove = [];
        this.initPhysics();
        this.gameLayer = new cc.Layer();

        //add Background layer and Animation layer to gameLayer
        this.gameLayer.addChild(new BackgroundLayer(this.space), 0, TagOfLayer.Background);
        this.gameLayer.addChild(new AnimationLayer(this.space), 0, TagOfLayer.Animation);
        this.addChild(this.gameLayer, 0, TagOfLayer.GameLayer);
        this.addChild(new StatusLayer(), 0, TagOfLayer.Status);

        cc.audioEngine.playMusic(res.background_mp3, true);

        if( 'keyboard' in cc.sys.capabilities ) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (keyCode, event) {
                    switch (keyCode) {
                        case cc.KEY.up:
                            cc.log("up");
                            this.gameLayer.getChildByTag(TagOfLayer.Animation).jump();
                            //this.check();
                            break;
                    }
                }.bind(this)
            }, this);
        }
        this.scheduleUpdate();
	},
    initPhysics:function() {
        //1. new space object 
        this.space = new cp.Space();
        //2. setup the  Gravity
        this.space.gravity = cp.v(0, -350);

        // 3. set up Walls
        var wallBottom = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, g_groundHeight),// start point
            cp.v(4294967295, g_groundHeight),// MAX INT:4294967295
            0);// thickness of wall
        this.space.addStaticShape(wallBottom);

        // setup chipmunk CollisionHandler
        this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.coin,
           this.collisionCoinBegin.bind(this), null, null, null);
        this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.rock,
            this.collisionRockBegin.bind(this), null, null, null);
    },
    collisionCoinBegin:function (arbiter, space) {
        cc.audioEngine.playEffect(res.pickup_coin_mp3);
        var shapes = arbiter.getShapes();
        // shapes[0] is runner
        this.shapesToRemove.push(shapes[1]);
        var statusLayer = this.getChildByTag(TagOfLayer.Status);
        statusLayer.addCoin(1);
    },

    collisionRockBegin:function (arbiter, space) {
        cc.audioEngine.stopMusic();
        cc.director.pause();
        this.addChild(new GameOverLayer());
    },
    update:function (dt) {

         // chipmunk step
        this.space.step(dt);

        for(var i = 0; i < this.shapesToRemove.length; i++) {
            var shape = this.shapesToRemove[i];
            this.gameLayer.getChildByTag(TagOfLayer.Background).removeObjectByShape(shape);
        }
        this.shapesToRemove = [];

        var animationLayer = this.gameLayer.getChildByTag(TagOfLayer.Animation);
        var eyeX = animationLayer.getEyeX();
        this.gameLayer.setPosition(cc.p(-eyeX,0));

    }
});