/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>

namespace bb.states {
	export const STATES_MAIN: string = "mainState";

	export interface IBallSprite extends Phaser.Sprite {
		isShot: boolean;
		initialVelocityX: number;
		initialVelocityY: number;
	}
	export class Main extends Phaser.State {
		private numCols: number = 10;
		private numRows: number = 4;
		private paddleVelX: number;
		private prevX: number;
		private paddleHalf: number;

		paddle: Phaser.Sprite;
		ball: IBallSprite;

		isLeftDown: boolean;// = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
		isRightDown: boolean;// = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);

		bricks: Phaser.Group;

		constructor() {
			super();
		}

		create() {
			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			this.game.physics.arcade.checkCollision.down = false;
			
			this.paddleVelX = 500 / 1000;
			this.prevX = this.game.input.x;

			this.paddle = this.game.add.sprite(0, 0, bb.images.PADDLE);
			this.game.physics.arcade.enable(this.paddle);
			this.paddle.anchor.setTo(0.5, 1);
			this.paddleHalf = this.paddle.width / 2;
			var bodyPaddle = <Phaser.Physics.Arcade.Body>this.paddle.body;
			bodyPaddle.enable = true;
			bodyPaddle.immovable = true;


			this.ball = <IBallSprite>this.game.add.sprite(0, 0, images.BALL);
			this.game.physics.arcade.enable(this.ball);
			var bodyBall = <Phaser.Physics.Arcade.Body>this.ball.body;
			bodyBall.enable = true;
			bodyBall.bounce.set(1);
			bodyBall.collideWorldBounds = true;

			this.ball.isShot = false;
			this.ball.initialVelocityX = 200;
			this.ball.initialVelocityY = -300;


			this.resetPaddle();

			this.bricks = this.game.add.group();
			let brickImage = [
				images.BRICKGREEN,
				images.BRICKPURPLE,
				images.BRICKRED,
				images.BRICKYELLOW
			]

			this.bricks.enableBody = true;
			this.bricks.physicsBodyType = Phaser.Physics.ARCADE;
			for (var rowIndex = 0; rowIndex < this.numRows; rowIndex++) {
				var img = brickImage[rowIndex];
				for (var colIndex = 0; colIndex < this.numCols; colIndex++) {
					var brick: Phaser.Sprite = this.bricks.create(0, 0, img);
					var bodyBrick = <Phaser.Physics.Arcade.Body>brick.body;
					bodyBrick.immovable = true;
					
					brick.x = brick.width * colIndex;
					brick.y = brick.height * rowIndex;
				}
			}

			this.game.input.onDown.add(this.shootBall, this);
		}
		
		removeBrick(ball, brick){
			brick.kill();						
		}

		shootBall() {
			if (this.ball.isShot) {
				return;
			}

			let velX = this.ball.initialVelocityX;
			let velY = this.ball.initialVelocityY;
			let rand = Math.floor(Math.random() * 2);

			if (rand % 2 === 0) {
				velX *= -1;
			}

			this.ball.isShot = true;

			let state = this.game.state.getCurrentState();
			var body = <Phaser.Physics.Arcade.Body>this.ball.body;
			body.velocity.set(velX, velY);



		}

		update() {
			this.game.physics.arcade.collide(this.ball, this.paddle);
			this.game.physics.arcade.collide(this.ball, this.bricks, this.removeBrick,null, this);

			this.isLeftDown = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
			this.isRightDown = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);

			if (this.prevX != this.game.input.x) {
				this.paddle.x = this.game.input.x;
			} else if (this.isRightDown && !this.isLeftDown) {
				this.paddle.x += this.paddleVelX * this.game.time.physicsElapsedMS;
			} else if (this.isLeftDown && !this.isRightDown) {
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
		}

		resetPaddle() {
			this.paddle.x = this.game.world.centerX;
			this.paddle.y = this.game.world.height - this.paddle.height;

			this.ball.x = this.paddle.x;
			this.ball.y = this.paddle.y - this.paddle.height * 2;
			this.ball.isShot = false;

			var body = <Phaser.Physics.Arcade.Body>this.ball.body;
			body.velocity.set(0);
		}
	}
}
