/// <reference path="node_modules/phaser/typescript/pixi.comments.d.ts" />
/// <reference path="node_modules/phaser/typescript/phaser.comments.d.ts" />
/// <reference path="node_modules/phaser/typescript/p2.d.ts" />

declare let colors;

class SimpleGame {


    constructor() {
        this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'map', {
            preload: this.preload,
            create: this.create,
            update: this.update
        }, true);
    }

    game: Phaser.Game;
    map: Phaser.Sprite;
    bitmapMap: Phaser.BitmapData;
    inputEnabled: boolean;
    graphicc: Phaser.Graphics;
    mapMarker: Phaser.Sprite;

    preload() {
        this.game.load.image("map", "TestMap.png");
        this.game.load.image("marker", "LocationMarker.png");
        //this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.inputEnabled = true;
    }

    create() {
        let radius: number = 400;

        this.map = this.game.add.sprite(0, 0, "map");
        this.graphicc = this.game.add.graphics(-1000, -1000);
        this.graphicc.lineStyle(2, Phaser.Color.getColor32(200, 0, 97, 255), 0.6);
        this.graphicc.beginFill(Phaser.Color.getColor32(200, 66, 138, 255), 0.8);
        this.graphicc.drawCircle(0, 0, radius / 2);
        this.graphicc.endFill();
        this.map.addChild(this.graphicc);


        this.mapMarker = this.game.add.sprite(-1000, -1000, "marker");
        this.map.addChild(this.mapMarker);
        this.mapMarker.scale.set(0.4, 0.4);
        this.mapMarker.anchor.set(0.5, 1);

        this.bitmapMap = this.game.add.bitmapData(this.map.width, this.map.height);
        console.log(this.map.width, this.map.height);
        this.bitmapMap.draw(this.game.cache.getImage("map"));
        this.bitmapMap.update();
        //this.bitmapMap.addToWorld(0, 0);

        this.map.inputEnabled = true;
        /*this.map.events.onInputDown.add((sprite: Phaser.Sprite, point: Phaser.Pointer) => {
            let localPosition: Phaser.Point = new Phaser.Point(point.position.x - this.map.x, point.position.y - this.map.y);

            this.graphicc.position.set(localPosition.x, localPosition.y);

            let returnArray: any = [];


            let hashMap: any = {};

            for (let x = 0, len = radius; x < len; x++) {
                for (let y = 0, len = radius; y < len; y++) {
                    let p: any = this.bitmapMap.getPixel(Phaser.Math.clamp((localPosition.x + (x - radius * 0.5)), 0, this.map.width), Phaser.Math.clamp((localPosition.y + (y - radius * 0.5)), 0, this.map.height));
                    let hexString: string = Phaser.Color.RGBtoString(p.r, p.g, p.b, p.a);
                    hashMap[hexString] = hexString;
                    //this.bitmapMap.setPixel(Phaser.Math.clamp((localPosition.x + (x - radius*0.5)), 0, this.map.width), Phaser.Math.clamp((localPosition.y + (y - radius*0.5)), 0, this.map.height), 255, 0, 0, false);
                }
            }
            //this.bitmapMap.context.putImageData(this.bitmapMap.imageData, 0, 0);
            //this.bitmapMap.dirty = true;
            //this.bitmapMap.update();

            for (let value in hashMap) {
                returnArray.push(value);
            }

            console.log(returnArray);
        });*/
        this.map.input.draggable = true;
        this.map.events.onDragStop.add((sprite: Phaser.Sprite, point: Phaser.Pointer) => {
            console.log(point.timeUp - point.timeDown);
            if (point.timeUp - point.timeDown > 100) {
                return;
            }
            let localPosition: Phaser.Point = new Phaser.Point(point.position.x - this.map.x, point.position.y - this.map.y);

            this.graphicc.position.set(localPosition.x, localPosition.y);
            this.mapMarker.position.set(localPosition.x, localPosition.y);

            let returnArray: any = [];


            let hashMap: any = {};

            for (let x = 0, len = radius; x < len; x++) {
                for (let y = 0, len = radius; y < len; y++) {
                    let p: any = this.bitmapMap.getPixel(Phaser.Math.clamp((localPosition.x + (x - radius * 0.5)), 0, this.map.width), Phaser.Math.clamp((localPosition.y + (y - radius * 0.5)), 0, this.map.height));
                    let hexString: string = Phaser.Color.RGBtoString(p.r, p.g, p.b, p.a);
                    hashMap[hexString] = hexString;
                    //this.bitmapMap.setPixel(Phaser.Math.clamp((localPosition.x + (x - radius*0.5)), 0, this.map.width), Phaser.Math.clamp((localPosition.y + (y - radius*0.5)), 0, this.map.height), 255, 0, 0, false);
                }
            }
            //this.bitmapMap.context.putImageData(this.bitmapMap.imageData, 0, 0);
            //this.bitmapMap.dirty = true;
            //this.bitmapMap.update();

            for (let value in hashMap) {
                returnArray.push(value);
            }

            console.log(returnArray);


            colors = returnArray;
        }, this);
    }

    update() {

    }
}

window.onload = () => {
    var game = new SimpleGame();

};