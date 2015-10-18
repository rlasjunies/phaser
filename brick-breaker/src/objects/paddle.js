/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _;
(function (_) {
    var objects;
    (function (objects) {
        var Paddle = (function (_super) {
            __extends(Paddle, _super);
            function Paddle() {
                _super.call(this, bb, 0, 0, images.PADDLE, 0);
                this.touchOldX = undefined;
                this.touchNewX = undefined;
                this.touchActive = false;
                this.touchMove = 0;
                this.game = bb;
                this.paddleVelX = 500 / 1000;
                this.prevX = this.game.input.x;
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
                // if ( bb.device.touch && this.touchActive){
                // 	this.touchOldX = this.touchNewX;
                // 	this.touchNewX = bb.input.x;
                // 	this.touchMove = 0;
                // 	if ( this.touchOldX != undefined && this.touchNewX !=undefined){
                // 		this.touchMove = this.touchNewX - this.touchOldX;
                // 	}
                // 	this.x += this.touchMove;
                // 	
                // 	//console.log("myTouchMove:" + this.touchMove);
                // 	//console.log("pixi:" + this.touchmove(null))
                // }
                if (this.x - this.paddleHalf < 0) {
                    this.x = 0 + this.paddleHalf;
                }
                if (this.x + this.paddleHalf > this.game.world.width) {
                    this.x = this.game.world.width - this.paddleHalf;
                }
            };
            Paddle.prototype.resetPaddle = function () {
                this.x = this.game.world.centerX;
                this.y = this.game.world.height - this.height;
            };
            return Paddle;
        })(Phaser.Sprite);
        objects.Paddle = Paddle;
    })(objects = _.objects || (_.objects = {}));
})(_ || (_ = {}));
