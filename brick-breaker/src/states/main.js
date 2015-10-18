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
        states.STATES_MAIN = "mainState";
        var Main = (function (_super) {
            __extends(Main, _super);
            function Main() {
                _super.call(this);
            }
            Main.prototype.create = function () {
                bb.physics.startSystem(Phaser.Physics.ARCADE);
                bb.physics.arcade.checkCollision.down = false;
                //TileSprite
                this.bkg = this.game.add.existing(new _.objects.Background()); //this.game.add.tileSprite(0, 0, w, h, images.BACKGROUND_BLUE)
                this.paddle = this.game.add.existing(new _.objects.Paddle());
                this.ball = this.game.add.existing(new _.objects.Ball());
                this.ball.evtOutOfBounds.add(this.loseLife, this);
                this.scoringPanel = new _.objects.ScoringPanel();
                this.bricks = new _.objects.Bricks();
                this.reset();
                bb.input.onDown.add(this.ball.shootBall, this);
                bb.score.evtLifeEnded.add(this.endGame, this);
                _.sounds.init();
                bb.scale.setShowAll();
                bb.scale.pageAlignHorizontally = true;
                bb.scale.pageAlignVeritcally = true;
                bb.scale.refresh();
            };
            Main.prototype.removeBrick = function (ball, brick) {
                brick.kill();
                bb.score.hitBrick();
                _.sounds.hitBrick();
            };
            Main.prototype.endGame = function () {
                _.sounds.backgroundStop();
                this.game.state.start(states.STATES_GAME_OVER);
            };
            Main.prototype.loseLife = function () {
                this.reset();
                bb.score.looseLife();
            };
            Main.prototype.update = function () {
                this.game.physics.arcade.collide(this.ball, this.paddle, this.ball.hitPaddle, null, this);
                this.game.physics.arcade.collide(this.ball, this.bricks, this.removeBrick, null, this);
                if (this.ball.isShot === false) {
                    this.ball.x = this.paddle.x;
                }
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.ball.shootBall();
                }
            };
            Main.prototype.reset = function () {
                this.paddle.resetPaddle();
                this.ball.resetBall(this.paddle);
            };
            return Main;
        })(Phaser.State);
        states.Main = Main;
    })(states = _.states || (_.states = {}));
})(_ || (_ = {}));
