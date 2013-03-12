function TiledMap(mapUrl) {

    this.currMapData = null;
    this.tilesets = [];
    this.numXTiles: 100;
    this.numYTiles: 100;
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

    var parseMap = function(mapURL) {
        self.currMapData = JSON.parse(mapJSON);

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

            img.src = tileset.image;

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

    xhrGet( mapUrl, function( data ) {
        parseMap(data.responseText);
    }

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
}

function Tile( firstgid, image, imageheight, imagewidth, name, numXTiles, numYTiles) {
    this.firstgid = firstgid;
    this.image = image;
    this.imageheight = imageheight;
    this.imagewidth = imagewidth;
    this.name = name;
    this.numXTiles = numXTiles;
    this.numYTiles = numYTiles;
}
