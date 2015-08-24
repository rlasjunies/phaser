/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/app.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var walking;
(function (walking) {
    var states;
    (function (states) {
        states.STATE_GAME_PLAY = "gamePlayState";
        var GamePlayState = (function (_super) {
            __extends(GamePlayState, _super);
            function GamePlayState() {
                _super.call(this);
                console.log("game play state constructor");
            }
            GamePlayState.prototype.create = function () {
                this.scene = new walking.objects.Scene(this.game, 0, 0);
                this.player = new walking.objects.Player(this.game, 0, this.game.height - 50);
                this.game.add.existing(this.scene);
                this.game.add.existing(this.player);
                this.world.setBounds(0, 0, this.scene.width * 2, this.scene.height);
                this.world.camera.follow(this.player);
                console.log("create game play");
            };
            return GamePlayState;
        })(Phaser.State);
        states.GamePlayState = GamePlayState;
    })(states = walking.states || (walking.states = {}));
})(walking || (walking = {}));
