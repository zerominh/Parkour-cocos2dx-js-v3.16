var PlayScene = cc.Scene.extend({
	space: null,
	gameLayer: null,
	onEnter: function() {
		this._super();
        this.initPhysics();
        this.gameLayer = new cc.Layer();

        //add Background layer and Animation layer to gameLayer
        this.gameLayer.addChild(new BackgroundLayer(), 0, TagOfLayer.Background);
        this.gameLayer.addChild(new AnimationLayer(this.space), 0, TagOfLayer.Animation);
        this.addChild(this.gameLayer);
        this.addChild(new StatusLayer(), 0, TagOfLayer.Status);
        this.scheduleUpdate();
	},
	 // init space of chipmunk
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
    },
    update:function (dt) {
        // chipmunk step
        this.space.step(dt);

        var animationLayer = this.gameLayer.getChildByTag(TagOfLayer.Animation);
        var eyeX = animationLayer.getEyeX();
        console.log(this.gameLayer.getPositionX());
        this.gameLayer.setPosition(cc.p(-eyeX,0));
        console.log(this.gameLayer.getPositionX());
    }
});