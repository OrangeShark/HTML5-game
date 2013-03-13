function TiledMap(mapUrl) {

    this.currMapData = null;
    this.tilesets = [];
    this.numXTiles = 100;
    this.numYTiles = 100;
    this.tileSize = {
        x: 64,
        y: 64
    };
    this.pixelSize = {
        x: 64,
        y: 64
    };
    this.imgLoadCount = 0;
    this.fullyLoaded = false;

    var self = this;

    var parseMap = function(mapUrl) {
        self.currMapData = JSON.parse(mapUrl);

        var map = self.currMapData;

        self.numXTiles = map.width;
        self.numYTiles = map.height;

        self.tileSize.x = map.tilewidth;
        self.tileSize.y = map.tileheight;

        self.pixelSize.x = self.numXTiles * self.tileSize.x;
        self.pixelSize.y = self.numYTiles * self.tileSize.y;

        for(var i = 0; i < map.tilesets.length; i++) {

            var tileset = map.tilesets[i];

            var img = new Image();
            img.onload = function() {
                self.imgLoadCount++;
                if( self.imgLoadCount === map.tilesets.length) {
                    self.fullyLoaded = true;
                }
            };

            img.src = 'imgs/' + tileset.image;

            var tile = new Tile( 
                    tileset.firstgid,
                    img,
                    tileset.imageheight,
                    tileset.imagewidth,
                    tileset.name,
                    Math.floor(tileset.imagewidth / self.tileSize.x),
                    Math.floor(tileset.imageheight / self.tileSize.y));

            self.tilesets[i] = tile;
        }
    };

    xhrGet( mapUrl, function( ) {
        parseMap(this.responseText);
    });

}

TiledMap.prototype.getTilePacket = function(tileIndex) {
    var pkt = {
        img: null,
        px: 0,
        py: 0
    };

    var tile = 0;
    for( tile = this.tilesets.length - 1; tile >= 0; tile --) {
        if(this.tilesets[tile].firstgid <= tileIndex) break;
    }

    pkt.img = this.tilesets[tile].image;

    var localIdx = tileIndex - this.tilesets[tile].firstgid;

    var lTileX = localIdx % this.tilesets[tile].numXTiles;
    var lTileY = Math.floor( localIdx / this.tilesets[tile].numXTiles);

    pkt.px = lTileX * this.tileSize.x;
    pkt.py = lTileY * this.tileSize.y;

    return pkt;
};

TiledMap.prototype.draw = function(ctx) {
    if(!this.fullyLoaded) return;

    for(var layerIdx = 0; layerIdx < this.currMapData.layers.length; layerIdx++) {
        if(this.currMapData.layers[layerIdx].type != "tilelayer") continue;

        var dat = this.currMapData.layers[layerIdx].data;

        for(var tileIDX = 0; tileIDX < dat.length; tileIDX++) {
            var tID = dat[tileIDX];
            if(tID === 0) continue;

            var tPKT = this.getTilePacket(tID);

            var worldX = (tileIDX % this.numXTiles) * this.tileSize.x;
            var worldY = Math.floor( tileIDX / this.numXTiles ) * this.tileSize.y;

            ctx.drawImage(tPKT.img, tPKT.px, tPKT.py, 
                    this.tileSize.x, this.tileSize.y, 
                    worldX, worldY, 
                    this.tileSize.x, this.tileSize.y);

        }
    }
};

function Tile( firstgid, image, imageheight, imagewidth, name, numXTiles, numYTiles) {
    this.firstgid = firstgid;
    this.image = image;
    this.imageheight = imageheight;
    this.imagewidth = imagewidth;
    this.name = name;
    this.numXTiles = numXTiles;
    this.numYTiles = numYTiles;
}
