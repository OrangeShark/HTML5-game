function Entity() {
    this.pos = {
        x:0,
        y:0
    };
    this.size = {
        x:0,
        y:0
    };
    this.last = {
        x:0,
        y:0
    };
    this.currSprite = null;
    this.zindex = 0;

}

Entity.prototype.update = function() {

};

Entity.prototype.draw = function() {

    this.currSprite.draw();

};
