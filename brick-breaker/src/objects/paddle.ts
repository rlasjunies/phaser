/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>

namespace _.objects{

	export class Paddle extends Phaser.Sprite{
		private rightArrow: Phaser.Key;
		private leftArrow: Phaser.Key;
		private paddleVelX: number;
		private prevX: number;
		private paddleHalf: number;

		private isLeftDown: boolean;
		private isRightDown: boolean;

		constructor(){
			this.game = bb.game;

			this.paddleVelX = 500 / 1000;
			this.prevX = this.game.input.x;
			super(bb.game,0,0, images.PADDLE,0);

			this.anchor.set(0.5, 1.0);
			this.paddleHalf = this.width / 2;
			
			this.game.physics.arcade.enable(this);
			var bodyPaddle = <Phaser.Physics.Arcade.Body>this.body;
			bodyPaddle.enable = true;
			bodyPaddle.immovable = true;
		}	
		
		update(){
			this.isLeftDown = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
			this.isRightDown = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);

			if (this.prevX != this.game.input.x) {
				this.x = this.game.input.x;
			} else if (this.isRightDown && !this.isLeftDown) {
				this.x += this.paddleVelX * this.game.time.physicsElapsedMS;
			} else if (this.isLeftDown && !this.isRightDown) {
				this.x -= this.paddleVelX * this.game.time.physicsElapsedMS;
			}
			this.prevX = this.game.input.x;

			if (this.x - this.paddleHalf < 0) {
				this.x = 0 + this.paddleHalf;
			}
			if (this.x + this.paddleHalf > this.game.world.width) {
				this.x = this.game.world.width - this.paddleHalf;
			}
		}
		
		resetPaddle(){
			this.x = this.game.world.centerX;
			this.y = this.game.world.height - this.height;
		}
	}
}