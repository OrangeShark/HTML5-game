function GameEngine(canvas, scene) {

    this.currScene = scene;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

}

GameEngine.prototype.runGame = function() {
    var frameId = 0;
    var lastFrame = Date.now();
    var game = this;

    function run() {
        var thisFrame = Date.now();

        var elasped = thisFrame -lastFrame;

        frameId = window.requestAnimationFrame(run);

        game.ctx.clearRect( 0, 0, game.canvas.width, game.canvas.height);

        game.currScene.update(elasped);
        game.currScene.draw(game.ctx);

        lastFrame = thisFrame;
    }

    run();
};

function Scene() {


}

Scene.prototype.update = function(elasped) {

};

Scene.prototype.draw = function(ctx) {

};

function Level(map, factory, input) {
    this.map = map;
    this.input = input;
    this.factory = factory;
    this.entities = [];
    this.physics = new PhysicsEngine();
    this.move_dir = new Vec2(0,0);
    this.dirVec = new Vec2(0,0);
    this.player = null;

}

Level.prototype.spawnEntity = function(typeName) {
    var ent = new this.factory[typeName]();
    this.entities.push(ent);
    return ent;
};

Level.prototype.removeEntity = function(ent) {

};

Level.prototype.update = function(elasped) {

    //update entities
    if( this.input.actions['move-up'] ) {

        this.move_dir.y = -1;
    }

    if( this.input.actions['move-down'] ) {

        this.move_dir.y = 1;
    }

    if( this.input.actions['move-left'] ) {
        this.move_dir.x = -1;
    }

    if( this.input.actions['move-right'] ) {
        this.move_dir.x = 1;
    }

    if( this.move_dir.lengthSquared() ) {
        this.move_dir.Normalize();
        this.move_dir.Multiply(1);
    }

    this.player.physBody.setLinearVelocity(this.move_dir.x, this.move_dir.y);
    
    this.physics.update();

};

Level.prototype.draw = function(ctx) {
    this.map.draw(ctx);

    //draw entities

};


