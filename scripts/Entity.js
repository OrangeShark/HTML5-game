function GameEntity() {
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

GameEntity.prototype.update = function() {

};

GameEntity.prototype.draw = function(ctx) {

    if(this.currSprite) {
        this.currSprite.draw(ctx, this.pos.x - this.size.x / 2, this.pos.y - this.size.y / 2);
    }

};
