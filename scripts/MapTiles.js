function TiledMap() {

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
}
