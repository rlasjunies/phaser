/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var bb;
(function (bb) {
    var images;
    (function (images) {
        images.PADDLE = 'imgPaddle';
        images.BRICKGREEN = "brickGreen";
        images.BRICKPURPLE = "brickPurple";
        images.BRICKRED = "brickRed";
        images.BRICKYELLOW = "brickYellow";
        images.BALL = "ball";
        function loadImage(g) {
            g.game.load.image(images.PADDLE, 'img/paddle.png');
            g.game.load.image(images.BRICKGREEN, 'img/brick_green.png');
            g.game.load.image(images.BRICKPURPLE, 'img/brick_purple.png');
            g.game.load.image(images.BRICKRED, 'img/brick_red.png');
            g.game.load.image(images.BRICKYELLOW, 'img/brick_yellow.png');
            g.game.load.image(images.BALL, 'img/ball.png');
        }
        images.loadImage = loadImage;
    })(images = bb.images || (bb.images = {}));
})(bb || (bb = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var bb;
(function (bb) {
    var states;
    (function (states) {
        states.STATES_MAIN = "mainState";
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
                this.paddleVelX = 500 / 1000;
                this.prevX = this.game.input.x;
                this.paddle = this.game.add.sprite(0, 0, bb.images.PADDLE);
                this.game.physics.arcade.enable(this.paddle);
                this.paddle.anchor.setTo(0.5, 1);
                this.paddleHalf = this.paddle.width / 2;
                var bodyPaddle = this.paddle.body;
                bodyPaddle.enable = true;
                bodyPaddle.immovable = true;
                this.ball = this.game.add.sprite(0, 0, bb.images.BALL);
                this.game.physics.arcade.enable(this.ball);
                var bodyBall = this.ball.body;
                bodyBall.enable = true;
                bodyBall.bounce.set(1);
                bodyBall.collideWorldBounds = true;
                this.ball.isShot = false;
                this.ball.initialVelocityX = 200;
                this.ball.initialVelocityY = -300;
                this.resetPaddle();
                this.bricks = this.game.add.group();
                var brickImage = [
                    bb.images.BRICKGREEN,
                    bb.images.BRICKPURPLE,
                    bb.images.BRICKRED,
                    bb.images.BRICKYELLOW
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
        states.Main = Main;
    })(states = bb.states || (bb.states = {}));
})(bb || (bb = {}));
/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/app.d.ts"/>
var bb;
(function (bb) {
    var Game = (function () {
        function Game() {
            this.game = new Phaser.Game(640, 429, Phaser.AUTO, "phaser_game", {
                create: this.create,
                preload: this.preload });
            console.log("Game.constructor");
        }
        Game.prototype.preload = function () {
            bb.images.loadImage(this);
        };
        Game.prototype.create = function () {
            this.game.state.add(bb.states.STATES_MAIN, bb.states.Main, true);
            console.log("Game.Create - constructor");
        };
        return Game;
    })();
    bb.Game = Game;
})(bb || (bb = {}));
var game;
window.onload = function () {
    game = new bb.Game();
};
