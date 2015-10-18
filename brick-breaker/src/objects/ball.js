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
        var Ball = (function (_super) {
            __extends(Ball, _super);
            function Ball() {
                var _this = this;
                _super.call(this, bb, 0, 0, images.BALL, 0);
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
            Ball.prototype.resetBall = function (paddle) {
                this.x = paddle.x;
                this.y = paddle.y - paddle.height * 2;
                this.isShot = false;
                var body = this.body;
                body.velocity.set(0);
            };
            return Ball;
        })(Phaser.Sprite);
        objects.Ball = Ball;
    })(objects = _.objects || (_.objects = {}));
})(_ || (_ = {}));
