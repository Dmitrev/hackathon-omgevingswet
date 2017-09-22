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

    preload() {
        this.game.load.image("map", "TestMap.png");
        this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        //this.game.scale.height = window.innerHeight;
    }

    create() {
        this.map = this.game.add.sprite(0, 0, "map");
    }

    update() {

    }
}

window.onload = () => {
    var game = new SimpleGame();

};