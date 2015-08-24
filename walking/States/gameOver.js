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
        states.STATE_GAME_OVER = "gameOver";
        var GameOver = (function (_super) {
            __extends(GameOver, _super);
            function GameOver() {
                _super.call(this);
            }
            GameOver.prototype.create = function () {
                var _this = this;
                this.gameOverSprite = this.add.sprite(0, 0, walking.graphics.GAME_OVER, 0);
                this.gameOverSprite.scale.setTo(this.game.width / this.gameOverSprite.width, this.game.height / this.gameOverSprite.height);
                this.input.onDown.add(function () {
                    _this.game.state.start(states.STATE_TITLE_SCREEN, true);
                });
            };
            return GameOver;
        })(Phaser.State);
        states.GameOver = GameOver;
    })(states = walking.states || (walking.states = {}));
})(walking || (walking = {}));
