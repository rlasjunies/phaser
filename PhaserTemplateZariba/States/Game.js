//This is your main game class
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path='../typings/app.d.ts' />
/// <reference path='../typings/tsd.d.ts' />
var GameName;
(function (GameName) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this);
        }
        Game.prototype.preload = function () {
        };
        Game.prototype.create = function () {
            var bmd = this.game.add.bitmapData(200, 200);
            bmd.ctx.beginPath();
            bmd.ctx.fillStyle = "#FF0000";
            bmd.ctx.strokeStyle = "#F00";
            bmd.ctx.lineWidth = 20;
            bmd.ctx.arc(bmd.width / 2, bmd.height / 2, 50, 0, 2 * Math.PI);
            bmd.ctx.closePath();
            bmd.ctx.fill();
            bmd.ctx.stroke();
            var bmdSprite = this.game.add.sprite(400, 400, bmd);
            bmdSprite.anchor.set(0.5, 0.5);
            var tween = this.game.add.tween(bmdSprite);
            tween.to({ alpha: 0 }, 1000, Phaser.Easing.Default, true, 100, 100, true);
            var tweenPosition = this.game.add.tween(bmdSprite.position);
            tweenPosition.to({ y: this.game.height }, 1000, Phaser.Easing.Default, true, 100, 100, true);
        };
        return Game;
    })(Phaser.State);
    GameName.Game = Game;
})(GameName || (GameName = {}));
