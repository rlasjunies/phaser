/// <reference path="../typings/tsd.d.ts"/>
var bb;
(function (bb) {
    var Game = (function () {
        function Game() {
            this.game = new Phaser.Game(640, 429, Phaser.AUTO, "phaser_game");
        }
        Game.prototype.preload = function () {
        };
        Game.prototype.create = function () {
        };
        Game.prototype.update = function () {
        };
        return Game;
    })();
    bb.Game = Game;
})(bb || (bb = {}));
var game;
window.onload = function () {
    game = new bb.Game();
};
