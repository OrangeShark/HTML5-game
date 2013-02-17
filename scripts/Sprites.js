function Atlas() {
    this.sprites = {};

}

Atlas.prototype.addSprite = function(image, sheet) {
    var cx,
        cy;
    if( image.trimmed ) {
        cx = image.spriteSourceSize.x - (image.sourceSize.w / 2);
        cy = image.spriteSourceSize.y - (image.sourceSize.h / 2);
    } else {
        cx = image.w / 2;
        cy = image.h / 2;
    }

    var sprite = new Sprite(image.name, sheet, image.frame.x, image.frame.y, image.frame.w, image.frame.h, cx, cy);

    this.sprites[image.name] = sprite;

}

Atlas.prototype.getSprite = function(name) {
    var sprite = this.sprites[name];
    if( sprite ) {
        return sprite;
    }
    return null;
}

function Sprite(id, sheet, x, y, w, h, cx, cy) {
    this.id = id;
    this.sheet = sheet;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.cx = cx;
    this.cy = cy;
}

Sprite.prototype.draw = function(ctx, posX, posY, settings) {

}
