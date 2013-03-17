function GameEngine(inputEngine, factory) {

    this.inputEngine = inputEngine;
    this.factory = factory;
    this.entities = [];

}

GameEngine.prototype.spawnEntity = function(typename) {
    var ent = new this.factory[typename]();

    this.entities.push(ent);

    return ent;
};

GameEngine.prototype.removeEntity = function(ent) {

};

GameEngine.prototype.update = function() {

};

GameEngine.prototype.draw = function(ctx) {

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

};
