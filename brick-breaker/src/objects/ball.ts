/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>

namespace _.objects {

	export class Ball extends Phaser.Sprite {
		isShot: boolean;
		initialVelocityX: number;
		initialVelocityY: number;
		
		evtOutOfBounds:Phaser.Signal;
		
		constructor() {
			super(bb.game, 0, 0, images.BALL, 0);
			this.isShot = false;
			this.initialVelocityX = 200;
			this.initialVelocityY = -300


			this.game.physics.arcade.enable(this);
			var bodyBall = <Phaser.Physics.Arcade.Body>this.body;
			bodyBall.enable = true;
			bodyBall.bounce.set(1);
			bodyBall.collideWorldBounds = true;

			this.checkWorldBounds = true;
			this.events.onOutOfBounds.add(this.outOfBounds, this);
			
			this.evtOutOfBounds = new Phaser.Signal();
		}

		outOfBounds = (ball:Ball) => { 
			this.evtOutOfBounds.dispatch(ball);
		}

		shootBall = () => {
			if (this.isShot) {
				return;
			}

			let velX = this.initialVelocityX;
			let velY = this.initialVelocityY;
			let rand = Math.floor(Math.random() * 2);

			if (rand % 2 === 0) {
				velX *= -1;
			}
			
			sounds.hitPaddle();
			
			this.isShot = true;

			var body = <Phaser.Physics.Arcade.Body>this.body;
			body.velocity.set(velX, velY);
		}
		
		hitPaddle = (ball: objects.Ball, paddle: Phaser.Sprite) => {
			sounds.hitPaddle();
		}
		
		resetBall(paddle:Paddle){
			this.x = paddle.x;
			this.y = paddle.y - paddle.height * 2;
			this.isShot = false;

			var body = <Phaser.Physics.Arcade.Body>this.body;
			body.velocity.set(0);
		}
	}
}