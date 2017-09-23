/// <reference path="node_modules/phaser/typescript/pixi.comments.d.ts" />
/// <reference path="node_modules/phaser/typescript/phaser.comments.d.ts" />
/// <reference path="node_modules/phaser/typescript/p2.d.ts" />
/// <reference path="jquery.d.ts" />
var SimpleGame = /** @class */ (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'map', {
            preload: this.preload,
            create: this.create,
            update: this.update
        }, true);
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image("map", "TestMap.png");
        this.game.load.image("marker", "LocationMarker.png");
        this.inputEnabled = true;
    };
    SimpleGame.prototype.create = function () {
        var _this = this;
        var radius = 400;
        this.map = this.game.add.sprite(0, 0, "map");
        //region geruiker markers
        this.graphicc = this.game.add.graphics(-1000, -1000);
        this.graphicc.lineStyle(2, Phaser.Color.getColor32(200, 0, 97, 255), 0.6);
        this.graphicc.beginFill(Phaser.Color.getColor32(200, 66, 138, 255), 0.5);
        this.graphicc.drawCircle(0, 0, radius / 2);
        this.graphicc.endFill();
        this.map.addChild(this.graphicc);
        this.mapMarker = this.game.add.sprite(-1000, -1000, "marker");
        this.map.addChild(this.mapMarker);
        this.mapMarker.scale.set(0.4, 0.4);
        this.mapMarker.anchor.set(0.5, 1);
        //endregion
        //region sydny
        this.sydnyCircle = this.game.add.graphics(1093, 379);
        this.sydnyCircle.lineStyle(2, Phaser.Color.getColor32(200, 0, 97, 255), 0.6);
        this.sydnyCircle.beginFill(Phaser.Color.getColor32(60, 72, 244, 66), 0.5);
        this.sydnyCircle.drawCircle(0, 0, radius / 2);
        this.sydnyCircle.endFill();
        this.map.addChild(this.sydnyCircle);
        this.sydnyMarker = this.game.add.sprite(1093, 379, "marker");
        this.map.addChild(this.sydnyMarker);
        this.sydnyMarker.scale.set(0.4, 0.4);
        this.sydnyMarker.anchor.set(0.5, 1);
        this.sydnyMarker.inputEnabled = true;
        this.sydnyMarker.events.onInputDown.add(function () {
            var aa = $.Event("slide.show");
            aa.id = "main-category";
            $(document).trigger(aa);
        });
        //endregion
        this.bitmapMap = this.game.add.bitmapData(this.map.width, this.map.height);
        console.log(this.map.width, this.map.height);
        this.bitmapMap.draw(this.game.cache.getImage("map"));
        this.bitmapMap.update();
        this.map.inputEnabled = true;
        this.map.input.draggable = true;
        this.map.events.onDragStop.add(function (sprite, point) {
            console.log(point.timeUp - point.timeDown);
            if (point.timeUp - point.timeDown > 100) {
                return;
            }
            var localPosition = new Phaser.Point(point.position.x - _this.map.x, point.position.y - _this.map.y);
            _this.graphicc.position.set(localPosition.x, localPosition.y);
            _this.mapMarker.position.set(localPosition.x, localPosition.y);
            var returnArray = [];
            var hashMap = {};
            for (var x = 0, len = radius; x < len; x++) {
                for (var y = 0, len_1 = radius; y < len_1; y++) {
                    var p = _this.bitmapMap.getPixel(Phaser.Math.clamp((localPosition.x + (x - radius * 0.5)), 0, _this.map.width), Phaser.Math.clamp((localPosition.y + (y - radius * 0.5)), 0, _this.map.height));
                    var hexString = Phaser.Color.RGBtoString(p.r, p.g, p.b, p.a);
                    if (hashMap.hasOwnProperty(hexString)) {
                        hashMap[hexString]++;
                    }
                    else {
                        hashMap[hexString] = 1;
                    }
                }
            }
            for (var value in hashMap) {
                returnArray.push(value);
            }
            console.log(hashMap);
            //colors = returnArray;
            colors = hashMap;
            var aa = $.Event("slide.show");
            aa.id = "main-category";
            $(document).trigger(aa);
        }, this);
        var key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key1.onDown.add(function () {
            alert("nieuwe post");
        }, this);
    };
    SimpleGame.prototype.update = function () {
    };
    return SimpleGame;
}());
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=daniel.js.map