function GameEngine(canvas, scene) {

    this.currScene = scene;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');


}

GameEngine.prototype.runGame() {
    var frameId = 0;
    var lastFrame = Date.now();
    var game = this;

    function run() {
        var thisFrame = Data.now();

        var elasped = thisFrame -lastFrame;

        frameId = window.requestAnimationFrame(run);

        game.currScene.update(elasped);
        game.currScene.draw(game.ctx);

        lastFrame = thisFrame;
    }

    run();
};

