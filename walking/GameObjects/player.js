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
    var objects;
    (function (objects) {
        (function (PLAYER_STATE) {
            PLAYER_STATE[PLAYER_STATE["idle"] = 0] = "idle";
            PLAYER_STATE[PLAYER_STATE["walking"] = 1] = "walking";
        })(objects.PLAYER_STATE || (objects.PLAYER_STATE = {}));
        var PLAYER_STATE = objects.PLAYER_STATE;
        var Player = (function (_super) {
            __extends(Player, _super);
            function Player(game, x, y) {
                this.game = game;
                this.walkingSpeed = 0;
                this.rightArrow = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
                this.rightArrow.onDown.add(this.moveRight, this);
                this.leftArrow = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
                this.leftArrow.onDown.add(this.moveLessRight, this);
                this.escape = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
                this.escape.onDown.add(this.gameOver, this);
                _super.call(this, game, x, y, "HERO_WALKING", 0);
                this.anchor.set(0.0, 1.0);
                this.startIdle();
                console.log("player contructor");
            }
            Player.prototype.gameOver = function () {
                this.game.state.start(walking.states.STATE_GAME_OVER);
            };
            Player.prototype.update = function () {
                if (this.state === PLAYER_STATE.walking) {
                    this.x += (this.walkingSpeed / Player.MAX_SPEED) * (60 / this.game.time.physicsElapsedMS);
                    var stageWitdh = this.game.stage.getChildAt(0).getBounds().width;
                    if (this.x > stageWitdh * .75) {
                        this.x = stageWitdh * .25;
                    }
                }
            };
            Player.prototype.moveLessRight = function () {
                if (this.state != PLAYER_STATE.idle) {
                    this.walkingSpeed--;
                    if (this.walkingSpeed > 0) {
                        this.animations.currentAnim.speed = this.walkingSpeed;
                    }
                    else {
                        this.startIdle();
                    }
                }
            };
            Player.prototype.moveRight = function () {
                if (this.state === PLAYER_STATE.idle) {
                    this.startWalking();
                }
                else {
                    if (this.walkingSpeed < objects.Player.MAX_SPEED) {
                        this.walkingSpeed++;
                        this.animations.currentAnim.speed = this.walkingSpeed;
                    }
                }
            };
            Player.prototype.startWalking = function () {
                this.state = PLAYER_STATE.walking;
                this.walkingSpeed = 5;
                this.loadTexture("HERO_WALKING", 0);
                this.animations.add("walk");
                this.animations.play("walk", this.walkingSpeed, true);
            };
            Player.prototype.startIdle = function () {
                this.state = PLAYER_STATE.idle;
                this.walkingSpeed = 0;
                this.loadTexture("HERO_IDLE", 0);
                this.animations.add("idle");
                this.animations.play("idle", 15, true);
            };
            Player.MAX_SPEED = 30;
            return Player;
        })(Phaser.Sprite);
        objects.Player = Player;
    })(objects = walking.objects || (walking.objects = {}));
})(walking || (walking = {}));
