/// <reference path="node_modules/phaser/typescript/pixi.comments.d.ts" />
/// <reference path="node_modules/phaser/typescript/phaser.comments.d.ts" />
/// <reference path="node_modules/phaser/typescript/p2.d.ts" />
var SimpleGame = /** @class */ (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'map', {
            preload: this.preload,
            create: this.create,
            update: this.update
        });
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image("map", "TestMap.png");
        //this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.inputEnabled = true;
    };
    SimpleGame.prototype.create = function () {
        var _this = this;
        this.map = this.game.add.sprite(500, 500, "map");
        this.bitmapMap = this.game.add.bitmapData(this.map.width, this.map.height);
        console.log(this.map.width, this.map.height);
        this.bitmapMap.draw(this.game.cache.getImage("map"));
        this.bitmapMap.update();
        //this.bitmapMap.addToWorld(0, 0);
        this.map.inputEnabled = true;
        this.map.events.onInputDown.add(function (sprite, point) {
            var localPosition = new Phaser.Point(point.position.x - _this.map.x, point.position.y - _this.map.y);
            var hashmap = {};
            for (var x = 0, len = 100; x < len; x++) {
                for (var y = 0, len_1 = 100; y < len_1; y++) {
                    var p = _this.bitmapMap.getPixel(Phaser.Math.clamp(x - 50, 0, 100), Phaser.Math.clamp(y - 50, 0, 100));
                    var hexString = Phaser.Color.RGBtoString(p.r, p.g, p.b, p.a);
                    hashmap[hexString] = true;
                }
            }
            console.log(hashmap);
        });
    };
    SimpleGame.prototype.update = function () {
    };
    return SimpleGame;
}());
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=daniel.js.map