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
}

Level.prototype.spawnEntity = function(typeName) {
    var ent = new this.factory[typeName]();
    this.entities.push(ent);
    return ent;
};

Level.prototype.removeEntity = function(ent) {

};

Level.prototype.update = function(elasped) {

};

Level.prototype.draw = function(ctx) {
    this.map.draw(ctx);

};


