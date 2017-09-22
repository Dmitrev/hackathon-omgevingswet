/// <reference path="node_modules/phaser/typescript/pixi.comments.d.ts" />
/// <reference path="node_modules/phaser/typescript/phaser.comments.d.ts" />
/// <reference path="node_modules/phaser/typescript/p2.d.ts" />
class SimpleGame {


    constructor() {
        this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'map', {
            preload: this.preload,
            create: this.create,
            update: this.update
        });
    }

    game: Phaser.Game;
    map: Phaser.Sprite;
    bitmapMap: Phaser.BitmapData;
    inputEnabled: boolean;

    preload() {
        this.game.load.image("map", "TestMap.png");
        //this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.inputEnabled = true;
    }

    create() {
        this.map = this.game.add.sprite(500, 500, "map");

        this.bitmapMap = this.game.add.bitmapData(this.map.width, this.map.height);
        console.log(this.map.width, this.map.height);
        this.bitmapMap.draw(this.game.cache.getImage("map"));
        this.bitmapMap.update();
        //this.bitmapMap.addToWorld(0, 0);

        this.map.inputEnabled = true;
        this.map.events.onInputDown.add((sprite: Phaser.Sprite, point: Phaser.Pointer) => {
            let localPosition: Phaser.Point = new Phaser.Point(point.position.x - this.map.x, point.position.y - this.map.y);

            let hashmap: any = {};

            for (let x = 0, len = 100; x < len; x++) {
                for (let y = 0, len = 100; y < len; y++) {
                    let p: any = this.bitmapMap.getPixel(Phaser.Math.clamp(x - 50, 0, 100), Phaser.Math.clamp(y - 50, 0, 100));
                    let hexString: string = Phaser.Color.RGBtoString(p.r, p.g, p.b, p.a);
                    hashmap[hexString] = true;
                }
            }

            console.log(hashmap);
        })
    }

    update() {

    }
}

window.onload = () => {
    var game = new SimpleGame();

};