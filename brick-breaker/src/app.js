/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/app.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _;
(function (_) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 600, 800, _.Core.Utils.Orientation.PORTRAIT, { preload: this.preload, create: this.create });
            // this.game = new Phaser.Game(800, 600, Phaser.AUTO, "phaser_game",{
            //   create: this.create,
            // 	preload: this.preload});    
            this.score = new _.Score();
        }
        Game.prototype.preload = function () {
            console.log("game Preloaded!");
            _.states.loadStates();
        };
        Game.prototype.create = function () {
            console.log("game created!");
            //          game.stage.fullScreenScaleMode = Phaser.StageScaleMode.SHOW_ALL;
            // game.stage.scale.setShowAll();
            // game.stage.scale.pageAlignHorizontally = true;
            // game.stage.scale.pageAlignVeritcally = true;
            // game.stage.scale.refresh();
            bb.scale.pageAlignHorizontally = true;
            bb.scale.pageAlignVertically = true;
            if (!bb.device.desktop) {
                bb.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            }
            bb.scale.refresh();
        };
        return Game;
    })(_.Core.Game);
    _.Game = Game;
})(_ || (_ = {}));
var bb;
window.onload = function () {
    bb = new _.Game();
};
