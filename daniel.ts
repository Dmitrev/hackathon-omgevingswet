/// <reference path="node_modules/phaser/typescript/pixi.comments.d.ts" />
/// <reference path="node_modules/phaser/typescript/phaser.comments.d.ts" />
/// <reference path="node_modules/phaser/typescript/p2.d.ts" />
/// <reference path="jquery.d.ts" />

declare let colors;

class SimpleGame {


    constructor() {
        this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'map', {
            preload: this.preload,
            create: this.create
        }, true);
    }

    game: Phaser.Game;
    map: Phaser.Sprite;
    bitmapMap: Phaser.BitmapData;
    inputEnabled: boolean;
    graphicc: Phaser.Graphics;
    mapMarker: Phaser.Sprite;

    sydnyMarker: Phaser.Sprite;
    sydnyCircle: Phaser.Graphics;

    janMarket: Phaser.Sprite;
    janCircle: Phaser.Graphics;

    preload() {
        this.game.load.image("map", "TestMap.png");
        this.game.load.image("marker", "LocationMarker.png");
        this.inputEnabled = true;
    }

    create() {
        let radius: number = 400;

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
        this.sydnyMarker.events.onInputDown.add(() => {
            let aa: any = $.Event("slide.show");
            aa.id = "main-category";

            $(document).trigger(aa);
        });
        //endregion

        //region jan
        this.janCircle = this.game.add.graphics(-10000, -10000);
        this.janCircle.lineStyle(2, Phaser.Color.getColor32(200, 244, 66, 226), 0.6);
        this.janCircle.beginFill(Phaser.Color.getColor32(60, 244, 66, 226), 0.5);
        this.janCircle.drawCircle(0, 0, radius / 2);
        this.janCircle.endFill();
        this.map.addChild(this.janCircle);

        this.janMarket = this.game.add.sprite(1093, 379, "marker");
        this.map.addChild(this.janMarket);
        this.janMarket.scale.set(0.4, 0.4);
        this.janMarket.anchor.set(0.5, 1);
        this.janMarket.inputEnabled = true;
        this.janMarket.events.onInputDown.add(() => {
            let aa: any = $.Event("slide.show");
            aa.id = "main-category";

            $(document).trigger(aa);
        });
        //endregion

        this.bitmapMap = this.game.add.bitmapData(this.map.width, this.map.height);
        this.bitmapMap.draw(this.game.cache.getImage("map"));
        this.bitmapMap.update();

        this.map.inputEnabled = true;
        this.map.input.draggable = true;
        this.map.events.onDragStop.add((sprite: Phaser.Sprite, point: Phaser.Pointer) => {
            if (point.timeUp - point.timeDown > 100) {
                return;
            }
            let localPosition: Phaser.Point = new Phaser.Point(point.position.x - this.map.x, point.position.y - this.map.y);

            this.graphicc.position.set(localPosition.x, localPosition.y);
            this.mapMarker.position.set(localPosition.x, localPosition.y);

            /*let returnArray: any = [];


            let hashMap: any = {};

            for (let x = 0, len = radius; x < len; x++) {
                for (let y = 0, len = radius; y < len; y++) {
                    let p: any = this.bitmapMap.getPixel(Phaser.Math.clamp((localPosition.x + (x - radius * 0.5)), 0, this.map.width), Phaser.Math.clamp((localPosition.y + (y - radius * 0.5)), 0, this.map.height));
                    let hexString: string = Phaser.Color.RGBtoString(p.r, p.g, p.b, p.a);
                    if (hashMap.hasOwnProperty(hexString)) {
                        hashMap[hexString]++
                    } else {
                        hashMap[hexString] = 1;
                    }
                }
            }

            for (let value in hashMap) {
                returnArray.push(value);
            }

            console.log(hashMap);

            //colors = returnArray;
            colors = hashMap;

            let aa: any = $.Event("slide.show");
            aa.id = "main-category";
            $(document).trigger(aa);*/
        }, this);

        let key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key1.onDown.add(() => {
            this.janCircle.position.set(1360, 650);
            this.janMarket.position.set(1360, 650);
        }, this);
    }
}

window.onload = () => {
    var game = new SimpleGame();
};