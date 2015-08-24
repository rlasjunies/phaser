/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports"], function (require, exports) {
    var namespace = bb.states, _a = void 0,  = _a.export, STATES_MAIN = _a.const, _b = _a.string, string = _b === void 0 ? "mainState" : _b;
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            _super.call(this);
            this.numCols = 10;
            this.numRows = 4;
        }
        Main.prototype.create = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.checkCollision.down = false;
            //TileSprite
            var w = this.game.world.width;
            var h = this.game.world.height;
            this.bkg = this.game.add.tileSprite(0, 0, w, h, images.BACKGROUND_BLUE);
            //Paddle
            this.paddleVelX = 500 / 1000;
            this.prevX = this.game.input.x;
            this.paddle = this.game.add.sprite(0, 0, bb.images.PADDLE);
            this.game.physics.arcade.enable(this.paddle);
            this.paddle.anchor.setTo(0.5, 1);
            this.paddleHalf = this.paddle.width / 2;
            var bodyPaddle = this.paddle.body;
            bodyPaddle.enable = true;
            bodyPaddle.immovable = true;
            //Ball
            this.ball = this.game.add.sprite(0, 0, images.BALL);
            this.game.physics.arcade.enable(this.ball);
            var bodyBall = this.ball.body;
            bodyBall.enable = true;
            bodyBall.bounce.set(1);
            bodyBall.collideWorldBounds = true;
            this.ball.isShot = false;
            this.ball.initialVelocityX = 200;
            this.ball.initialVelocityY = -300;
            this.resetPaddle();
            //Black line
            h = this.paddle.height;
            var blackLine = this.game.add.tileSprite(0, 0, w, h, images.BACKGROUND_BLACK);
            blackLine.anchor.set(0, 1);
            blackLine.y = this.game.world.height;
            this.bricks = this.game.add.group();
            var brickImage = [
                images.BRICKGREEN,
                images.BRICKPURPLE,
                images.BRICKRED,
                images.BRICKYELLOW
            ];
            this.bricks.enableBody = true;
            this.bricks.physicsBodyType = Phaser.Physics.ARCADE;
            for (var rowIndex = 0; rowIndex < this.numRows; rowIndex++) {
                var img = brickImage[rowIndex];
                for (var colIndex = 0; colIndex < this.numCols; colIndex++) {
                    var brick = this.bricks.create(0, 0, img);
                    var bodyBrick = brick.body;
                    bodyBrick.immovable = true;
                    brick.x = brick.width * colIndex;
                    brick.y = brick.height * rowIndex;
                }
            }
            this.game.input.onDown.add(this.shootBall, this);
        };
        Main.prototype.removeBrick = function (ball, brick) {
            brick.kill();
        };
        Main.prototype.shootBall = function () {
            if (this.ball.isShot) {
                return;
            }
            var velX = this.ball.initialVelocityX;
            var velY = this.ball.initialVelocityY;
            var rand = Math.floor(Math.random() * 2);
            if (rand % 2 === 0) {
                velX *= -1;
            }
            this.ball.isShot = true;
            var state = this.game.state.getCurrentState();
            var body = this.ball.body;
            body.velocity.set(velX, velY);
        };
        Main.prototype.update = function () {
            this.game.physics.arcade.collide(this.ball, this.paddle);
            this.game.physics.arcade.collide(this.ball, this.bricks, this.removeBrick, null, this);
            this.isLeftDown = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
            this.isRightDown = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
            if (this.prevX != this.game.input.x) {
                this.paddle.x = this.game.input.x;
            }
            else if (this.isRightDown && !this.isLeftDown) {
                this.paddle.x += this.paddleVelX * this.game.time.physicsElapsedMS;
            }
            else if (this.isLeftDown && !this.isRightDown) {
                this.paddle.x -= this.paddleVelX * this.game.time.physicsElapsedMS;
            }
            this.prevX = this.game.input.x;
            if (this.paddle.x - this.paddleHalf < 0) {
                this.paddle.x = 0 + this.paddleHalf;
            }
            if (this.paddle.x + this.paddleHalf > this.game.world.width) {
                this.paddle.x = this.game.world.width - this.paddleHalf;
            }
            if (this.ball.isShot === false) {
                this.ball.x = this.paddle.x;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.shootBall();
            }
        };
        Main.prototype.resetPaddle = function () {
            this.paddle.x = this.game.world.centerX;
            this.paddle.y = this.game.world.height - this.paddle.height;
            this.ball.x = this.paddle.x;
            this.ball.y = this.paddle.y - this.paddle.height * 2;
            this.ball.isShot = false;
            var body = this.ball.body;
            body.velocity.set(0);
        };
        return Main;
    })(Phaser.State);
    exports.Main = Main;
});
