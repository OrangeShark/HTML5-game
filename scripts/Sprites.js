function Atlas(url, atlasJSON) {
    this.sprites = {};
    this.url = url;
    this.image = new Image();
    this.image.src = url;

    var atlas = JSON.parse(atlasJSON);
    for( name in atlas.frames ) {
        var sprite = atlas.frames[name];
        this.addSprite(name, sprite)

    }

}

Atlas.prototype.addSprite = function(name, image) {
    var cx,
        cy;
    if( image.trimmed ) {
        cx = -(image.spriteSourceSize.x - (image.sourceSize.w / 2));
        cy = -(image.spriteSourceSize.y - (image.sourceSize.h / 2));
    } else {
        cx = -(image.w / 2);
        cy = -(image.h / 2);
    }

    var sprite = new Sprite(name, this, image.frame.x, image.frame.y, image.frame.w, image.frame.h, cx, cy);

    this.sprites[name] = sprite;

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
    
    ctx.drawImage(this.sheet.img, this.x, this.y, this.w, this.h, posX + this.cx, posY + this.cy, this.w, this.h);

}
