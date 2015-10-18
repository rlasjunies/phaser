/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _;
(function (_) {
    var states;
    (function (states) {
        states.STATES_GAME_OVER = "gameOver";
        var GameOver = (function (_super) {
            __extends(GameOver, _super);
            function GameOver() {
                _super.call(this);
            }
            GameOver.prototype.create = function () {
                var w = this.game.world.width;
                var h = this.game.world.height;
                this.background = this.game.add.tileSprite(0, 0, w, h, images.BACKGROUND_BLUE);
                var outFrame = 0;
                var overFrame = 1;
                var downFrame = 2;
                var margin = 60;
                var btnStart = this.game.add.button(0, 0, images.START, states.goToMain, this, overFrame, outFrame, downFrame);
                btnStart.anchor.set(.5, 1);
                btnStart.x = this.game.world.centerX;
                btnStart.y = this.game.world.height - margin;
                var txtOverConfig = {
                    font: "40px sans-serif",
                    fill: "#ffffff",
                    align: "center"
                };
                this.over = this.game.add.text(0, 0, _.constant.GAME_ORVER, txtOverConfig);
                this.over.anchor.x = .5;
                this.over.x = this.game.world.centerX;
                this.over.y = margin * 2;
            };
            GameOver.prototype.update = function () {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    states.goToIntro();
                }
            };
            return GameOver;
        })(Phaser.State);
        states.GameOver = GameOver;
    })(states = _.states || (_.states = {}));
})(_ || (_ = {}));
