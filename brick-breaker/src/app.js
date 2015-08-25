/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/app.d.ts"/>
var _;
(function (_) {
    var Score = (function () {
        function Score() {
            this.totalPoints = 0;
            this.initialRemainingLives = 1;
            this.evtScoreChanged = new Phaser.Signal();
            this.reinitialize();
        }
        Score.prototype.loseLife = function () {
            this.remainingLives--;
            this.evtScoreChanged.dispatch(this);
        };
        Score.prototype.hitBrick = function () {
            this.totalPoints += 10;
            this.evtScoreChanged.dispatch(this);
        };
        Score.prototype.reinitialize = function () {
            this.remainingLives = this.initialRemainingLives;
            this.totalPoints = 0;
        };
        return Score;
    })();
    _.Score = Score;
})(_ || (_ = {}));
var _;
(function (_) {
    var constant;
    (function (constant) {
        constant.GAME_ORVER = "GAME OVER";
        constant.CONGRATULATIONS = "CONGRATULATIONS";
    })(constant = _.constant || (_.constant = {}));
})(_ || (_ = {}));
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
var _;
(function (_) {
    var sounds;
    (function (sounds) {
        sounds.HIT_BRICK = "sfxHitBrick";
        sounds.HIT_PADDLE = "sfxHitPaddle";
        sounds.BACKGROUND = "bgmMusic";
        sounds.sfxHitBrick;
        sounds.sfxHitPaddle;
        sounds.sfxBackgroundMusic;
        function loadSounds() {
            bb.game.load.audio(sounds.HIT_BRICK, "snd/fx_hit_brick.wav");
            bb.game.load.audio(sounds.HIT_PADDLE, "snd/fx_hit_paddle.wav");
            bb.game.load.audio(sounds.BACKGROUND, "snd/bgm_electric_air.ogg");
        }
        sounds.loadSounds = loadSounds;
        function init() {
            sounds.sfxHitBrick = bb.game.add.audio(sounds.HIT_BRICK);
            sounds.sfxHitBrick.volume = 1;
            sounds.sfxHitPaddle = bb.game.add.audio(sounds.HIT_PADDLE);
            sounds.sfxHitPaddle.volume = 1;
            sounds.sfxBackgroundMusic = bb.game.add.audio(sounds.BACKGROUND);
            sounds.sfxBackgroundMusic.volume = 1;
        }
        sounds.init = init;
        function hitPaddle() {
            sounds.sfxHitPaddle.play();
        }
        sounds.hitPaddle = hitPaddle;
        function hitBrick() {
            sounds.sfxHitPaddle.play();
        }
        sounds.hitBrick = hitBrick;
        function backgroundPlay() {
            sounds.sfxBackgroundMusic.loop = true;
            sounds.sfxBackgroundMusic.play();
        }
        sounds.backgroundPlay = backgroundPlay;
        function backgroundStop() {
            sounds.sfxBackgroundMusic.stop();
        }
        sounds.backgroundStop = backgroundStop;
    })(sounds = _.sounds || (_.sounds = {}));
})(_ || (_ = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var _;
(function (_) {
    var objects;
    (function (objects) {
        var Paddle = (function (_super) {
            __extends(Paddle, _super);
            function Paddle(game, x, y) {
                this.game = game;
                this.paddleVelX = 500 / 1000;
                this.prevX = this.game.input.x;
                _super.call(this, game, x, y, images.PADDLE, 0);
                this.anchor.set(0.5, 1.0);
                this.paddleHalf = this.width / 2;
                this.game.physics.arcade.enable(this);
                var bodyPaddle = this.body;
                bodyPaddle.enable = true;
                bodyPaddle.immovable = true;
            }
            Paddle.prototype.update = function () {
                this.isLeftDown = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
                this.isRightDown = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
                if (this.prevX != this.game.input.x) {
                    this.x = this.game.input.x;
                }
                else if (this.isRightDown && !this.isLeftDown) {
                    this.x += this.paddleVelX * this.game.time.physicsElapsedMS;
                }
                else if (this.isLeftDown && !this.isRightDown) {
                    this.x -= this.paddleVelX * this.game.time.physicsElapsedMS;
                }
                this.prevX = this.game.input.x;
                if (this.x - this.paddleHalf < 0) {
                    this.x = 0 + this.paddleHalf;
                }
                if (this.x + this.paddleHalf > this.game.world.width) {
                    this.x = this.game.world.width - this.paddleHalf;
                }
            };
            return Paddle;
        })(Phaser.Sprite);
        objects.Paddle = Paddle;
    })(objects = _.objects || (_.objects = {}));
})(_ || (_ = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var _;
(function (_) {
    var objects;
    (function (objects) {
        var Ball = (function (_super) {
            __extends(Ball, _super);
            function Ball(game, x, y) {
                var _this = this;
                _super.call(this, game, x, y, images.BALL, 0);
                this.outOfBounds = function (ball) {
                    _this.evtOutOfBounds.dispatch(ball);
                };
                this.shootBall = function () {
                    if (_this.isShot) {
                        return;
                    }
                    var velX = _this.initialVelocityX;
                    var velY = _this.initialVelocityY;
                    var rand = Math.floor(Math.random() * 2);
                    if (rand % 2 === 0) {
                        velX *= -1;
                    }
                    _.sounds.hitPaddle();
                    _this.isShot = true;
                    var body = _this.body;
                    body.velocity.set(velX, velY);
                };
                this.hitPaddle = function (ball, paddle) {
                    _.sounds.hitPaddle();
                };
                this.isShot = false;
                this.initialVelocityX = 200;
                this.initialVelocityY = -300;
                this.game.physics.arcade.enable(this);
                var bodyBall = this.body;
                bodyBall.enable = true;
                bodyBall.bounce.set(1);
                bodyBall.collideWorldBounds = true;
                this.checkWorldBounds = true;
                this.events.onOutOfBounds.add(this.outOfBounds, this);
                this.evtOutOfBounds = new Phaser.Signal();
            }
            return Ball;
        })(Phaser.Sprite);
        objects.Ball = Ball;
    })(objects = _.objects || (_.objects = {}));
})(_ || (_ = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var _;
(function (_) {
    var objects;
    (function (objects) {
        var HEIGHT = 24;
        var LIVES = "Lives: ";
        var POINTS = " points";
        var ScoringPanel = (function (_super) {
            __extends(ScoringPanel, _super);
            function ScoringPanel(game, initialRemainingLive) {
                _super.call(this, game);
                var blackLine = this.game.add.tileSprite(0, 0, game.world.width, HEIGHT, images.BACKGROUND_BLACK);
                blackLine.anchor.set(0, 1);
                blackLine.y = this.game.world.height;
                //Text
                var livesConfig = {
                    font: "18px sans-serif",
                    fill: "#ffffff",
                    align: "left"
                };
                this.lives = this.game.add.text(0, 0, "", livesConfig);
                this.lives.anchor.set(0, 1);
                this.lives.y = this.game.world.height;
                var pointsConfig = {
                    font: "18px sans-serif",
                    fill: "#ffffff",
                    align: "right"
                };
                this.points = this.game.add.text(0, 0, "" + POINTS, pointsConfig);
                this.points.anchor.set(1, 1);
                this.points.x = this.game.world.width;
                this.points.y = this.game.world.height;
                this.scoreRefresh(bb.score);
                bb.score.evtScoreChanged.add(this.scoreRefresh, this);
            }
            ScoringPanel.prototype.scoreRefresh = function (score) {
                this.lives.text = "" + LIVES + score.remainingLives;
                this.points.text = score.totalPoints + POINTS;
            };
            return ScoringPanel;
        })(Phaser.Group);
        objects.ScoringPanel = ScoringPanel;
    })(objects = _.objects || (_.objects = {}));
})(_ || (_ = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var _;
(function (_) {
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
    })(states = _.states || (_.states = {}));
})(_ || (_ = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var _;
(function (_) {
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
                this.paddle = this.game.add.existing(new _.objects.Paddle(this.game, 0, 0));
                //Ball
                this.ball = this.game.add.existing(new _.objects.Ball(this.game, 0, 0));
                this.ball.evtOutOfBounds.add(this.loseLife, this);
                this.resetPaddle();
                //Scoring Panel definition			
                this.scoringPanel = new _.objects.ScoringPanel(this.game, 1);
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
                this.game.input.onDown.add(this.ball.shootBall, this);
                //Sounds
                _.sounds.init();
            };
            Main.prototype.removeBrick = function (ball, brick) {
                brick.kill();
                this.totalPoints += 10;
                //TODO this.points.text = this.totalPoints + constant.POINTS;
                bb.score.hitBrick();
                _.sounds.hitBrick();
            };
            Main.prototype.goToOver = function () {
                _.sounds.backgroundStop();
                this.game.state.start(states.STATES_GAME_OVER);
            };
            Main.prototype.loseLife = function () {
                this.resetPaddle();
                this.remainingLives--;
                if (this.remainingLives <= 0) {
                    this.goToOver();
                }
                //TODO this.lives.text = constant.LIVES + this.remainingLives;
                bb.score.loseLife();
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
    })(states = _.states || (_.states = {}));
})(_ || (_ = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var _;
(function (_) {
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
                _.sounds.loadSounds();
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
    })(states = _.states || (_.states = {}));
})(_ || (_ = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
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
/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/app.d.ts"/>
var _;
(function (_) {
    var Game = (function () {
        function Game() {
            this.game = new Phaser.Game(640, 429, Phaser.AUTO, "phaser_game", {
                create: this.create,
                preload: this.preload });
            this.score = new _.Score();
            console.log("Game.constructor");
        }
        Game.prototype.preload = function () {
            _.states.loadStates();
        };
        Game.prototype.create = function () {
        };
        return Game;
    })();
    _.Game = Game;
})(_ || (_ = {}));
var bb;
window.onload = function () {
    bb = new _.Game();
};
