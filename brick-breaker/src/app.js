var constant;
(function (constant) {
    constant.GAME_ORVER = "GAME OVER";
    constant.CONGRATULATIONS = "CONGRATULATIONS";
    constant.LIVES = "Lives: ";
    constant.POINTS = " points";
})(constant || (constant = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var images;
(function (images) {
    images.PADDLE = 'imgPaddle';
    images.BRICKGREEN = "brickGreen";
    images.BRICKPURPLE = "brickPurple";
    images.BRICKRED = "brickRed";
    images.BRICKYELLOW = "brickYellow";
    images.BALL = "ball";
    images.BACKGROUND_BLUE = "backgroundBlue";
    images.BACKGROUND_BLACK = "backgroundBlack";
    images.LOGO = "logo";
    images.START = "start";
    images.BACK = "back";
    function loadImages() {
        bb.game.load.image(images.PADDLE, 'img/paddle.png');
        bb.game.load.image(images.BRICKGREEN, 'img/brick_green.png');
        bb.game.load.image(images.BRICKPURPLE, 'img/brick_purple.png');
        bb.game.load.image(images.BRICKRED, 'img/brick_red.png');
        bb.game.load.image(images.BRICKYELLOW, 'img/brick_yellow.png');
        bb.game.load.image(images.BALL, 'img/ball.png');
        bb.game.load.image(images.BACKGROUND_BLACK, 'img/bg_black.png');
        bb.game.load.image(images.BACKGROUND_BLUE, 'img/bg_blue.png');
        bb.game.load.image(images.LOGO, 'img/logo_game.png');
        bb.game.load.spritesheet(images.START, "img/btn_start.png", 190, 49);
        bb.game.load.spritesheet(images.BACK, "img/btn_back.png", 190, 49);
    }
    images.loadImages = loadImages;
})(images || (images = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var sounds;
(function (sounds) {
    sounds.HIT_BRICK = "sfxHitBrick";
    sounds.HIT_PADDLE = "sfxHitPaddle";
    sounds.BACKGROUND = "bgmMusic";
    function loadSounds() {
        bb.game.load.audio(sounds.HIT_BRICK, "snd/fx_hit_brick.wav");
        bb.game.load.audio(sounds.HIT_PADDLE, "snd/fx_hit_paddle.wav");
        bb.game.load.audio(sounds.BACKGROUND, "snd/bgm_electric_air.ogg");
    }
    sounds.loadSounds = loadSounds;
})(sounds || (sounds = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var states;
(function (states) {
    function goToMain() {
        bb.game.state.start(states.STATES_MAIN);
    }
    states.goToMain = goToMain;
    function goToIntro() {
        bb.game.state.start(states.STATES_INTRO);
    }
    states.goToIntro = goToIntro;
    function loadStates() {
        bb.game.state.add(states.STATES_INTRO, states.Intro, true);
        bb.game.state.add(states.STATES_MAIN, states.Main, false);
        bb.game.state.add(states.STATES_GAME_OVER, states.GameOver, false);
    }
    states.loadStates = loadStates;
})(states || (states = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var states;
(function (states) {
    states.STATES_MAIN = "mainState";
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            _super.call(this);
            this.numCols = 10;
            this.numRows = 4;
            this.remainingLives = 1;
            this.totalPoints = 0;
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
            this.paddle = this.game.add.sprite(0, 0, images.PADDLE);
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
            this.ball.checkWorldBounds = true;
            this.ball.events.onOutOfBounds.add(this.loseLife, this);
            this.resetPaddle();
            //Black line
            h = this.paddle.height;
            var blackLine = this.game.add.tileSprite(0, 0, w, h, images.BACKGROUND_BLACK);
            blackLine.anchor.set(0, 1);
            blackLine.y = this.game.world.height;
            //Text
            this.lives = this.game.add.text(0, 0, "" + constant.LIVES + this.remainingLives, {});
            this.lives.fontSize = 18;
            this.lives.fill = "#ffffff";
            this.lives.align = "left";
            this.lives.font = "sans-serif";
            this.lives.anchor.set(0, 1);
            this.lives.y = this.game.world.height;
            var txtConfig = {
                font: "18px sans-serif",
                fill: "#ffffff",
                align: "right"
            };
            this.points = this.game.add.text(0, 0, this.totalPoints + constant.POINTS, txtConfig);
            this.points.anchor.set(1);
            this.points.x = this.game.world.width;
            this.points.y = this.game.world.height;
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
            //Sounds
            this.sfxHitBrick = this.game.add.audio(sounds.HIT_BRICK);
            this.sfxHitBrick.volume = 1;
            this.sfxHitPaddle = this.game.add.audio(sounds.HIT_PADDLE);
            this.sfxHitPaddle.volume = 1;
            this.bgmMusic = this.game.add.audio(sounds.BACKGROUND);
            this.bgmMusic.volume = 1;
            //this.bgmMusic.loop = true;
            //this.bgmMusic.play();
        };
        Main.prototype.removeBrick = function (ball, brick) {
            brick.kill();
            this.totalPoints += 10;
            this.points.text = this.totalPoints + constant.POINTS;
            this.sfxHitBrick.play();
        };
        Main.prototype.hitPaddle = function (ball, paddle) {
            this.sfxHitPaddle.play();
        };
        Main.prototype.goToOver = function () {
            this.bgmMusic.stop();
            this.game.state.start(states.STATES_GAME_OVER);
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
            this.sfxHitPaddle.play();
        };
        Main.prototype.loseLife = function () {
            this.resetPaddle();
            this.remainingLives--;
            if (this.remainingLives <= 0) {
                this.goToOver();
            }
            this.lives.text = constant.LIVES + this.remainingLives;
        };
        Main.prototype.update = function () {
            this.game.physics.arcade.collide(this.ball, this.paddle, this.hitPaddle, null, this);
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
})(states || (states = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var states;
(function (states) {
    states.STATES_INTRO = "stateIntro";
    var Intro = (function (_super) {
        __extends(Intro, _super);
        function Intro() {
            _super.call(this);
        }
        Intro.prototype.preload = function () {
            images.loadImages();
            sounds.loadSounds();
        };
        Intro.prototype.create = function () {
            var w = this.game.world.width;
            var h = this.game.world.height;
            this.backgroundTile = this.game.add.tileSprite(0, 0, w, h, images.BACKGROUND_BLUE);
            var marginTop = 30;
            var logo = this.game.add.image(0, 0, images.LOGO);
            logo.anchor.x = .5;
            logo.x = this.game.world.centerX;
            logo.y = marginTop;
            var outFrame = 0;
            var overFrame = 1;
            var downFrame = 2;
            var btnStart = this.game.add.button(0, 0, images.START, states.goToMain, this, overFrame, outFrame, downFrame);
            btnStart.anchor.x = .5;
            btnStart.x = this.game.world.centerX;
            btnStart.y = this.game.world.centerY;
        };
        Intro.prototype.update = function () {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                states.goToMain();
            }
        };
        return Intro;
    })(Phaser.State);
    states.Intro = Intro;
})(states || (states = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
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
            this.over = this.game.add.text(0, 0, constant.GAME_ORVER, txtOverConfig);
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
})(states || (states = {}));
/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/app.d.ts"/>
var Game = (function () {
    function Game() {
        this.game = new Phaser.Game(640, 429, Phaser.AUTO, "phaser_game", {
            create: this.create,
            preload: this.preload });
        console.log("Game.constructor");
    }
    Game.prototype.preload = function () {
        states.loadStates();
    };
    Game.prototype.create = function () {
    };
    return Game;
})();
var bb;
window.onload = function () {
    bb = new Game();
};
