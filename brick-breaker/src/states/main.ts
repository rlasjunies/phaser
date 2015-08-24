/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>

namespace states {
	export const STATES_MAIN: string = "mainState";

	export interface IBallSprite extends Phaser.Sprite {
		isShot: boolean;
		initialVelocityX: number;
		initialVelocityY: number;
		//checkWorldBounds: boolean;
	}

	export class Main extends Phaser.State {
		private numCols: number = 10;
		private numRows: number = 4;
		private paddleVelX: number;
		private prevX: number;
		private paddleHalf: number;

		remainingLives: number = 1;
		totalPoints: number = 0;

		lives: Phaser.Text;
		points: Phaser.Text;

		bkg: Phaser.TileSprite;
		paddle: Phaser.Sprite;
		ball: IBallSprite;

		sfxHitBrick: Phaser.Sound;
		sfxHitPaddle: Phaser.Sound;
		bgmMusic: Phaser.Sound;

		isLeftDown: boolean;// = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
		isRightDown: boolean;// = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);

		bricks: Phaser.Group;

		constructor() {
			super();
		}

		create() {
			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			this.game.physics.arcade.checkCollision.down = false;


			//TileSprite
			var w = this.game.world.width;
			var h = this.game.world.height;
			this.bkg = this.game.add.tileSprite(0, 0, w, h, images.BACKGROUND_BLUE)

			//Paddle
			this.paddleVelX = 500 / 1000;
			this.prevX = this.game.input.x;

			this.paddle = this.game.add.sprite(0, 0, images.PADDLE);
			this.game.physics.arcade.enable(this.paddle);
			this.paddle.anchor.setTo(0.5, 1);
			this.paddleHalf = this.paddle.width / 2;

			var bodyPaddle = <Phaser.Physics.Arcade.Body>this.paddle.body;
			bodyPaddle.enable = true;
			bodyPaddle.immovable = true;

			//Ball
			this.ball = <IBallSprite>this.game.add.sprite(0, 0, images.BALL);
			this.game.physics.arcade.enable(this.ball);
			var bodyBall = <Phaser.Physics.Arcade.Body>this.ball.body;
			bodyBall.enable = true;
			bodyBall.bounce.set(1);
			bodyBall.collideWorldBounds = true;

			this.ball.isShot = false;
			this.ball.initialVelocityX = 200;
			this.ball.initialVelocityY = -300
			this.ball.checkWorldBounds = true;
			this.ball.events.onOutOfBounds.add(this.loseLife, this);

			this.resetPaddle();

			//Black line
			h = this.paddle.height;
			var blackLine = this.game.add.tileSprite(0, 0, w, h, images.BACKGROUND_BLACK)
			blackLine.anchor.set(0, 1);
			blackLine.y = this.game.world.height;
			
			//Text
			this.lives = this.game.add.text(0, 0, `${constant.LIVES}${this.remainingLives}`, {});
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
			}
			this.points = this.game.add.text(0, 0, this.totalPoints + constant.POINTS, txtConfig);
			this.points.anchor.set(1);
			this.points.x = this.game.world.width;
			this.points.y = this.game.world.height;


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

			//Sounds
			this.sfxHitBrick = this.game.add.audio(sounds.HIT_BRICK);
			this.sfxHitBrick.volume = 1;
			this.sfxHitPaddle = this.game.add.audio(sounds.HIT_PADDLE);
			this.sfxHitPaddle.volume = 1
			this.bgmMusic = this.game.add.audio(sounds.BACKGROUND);
			this.bgmMusic.volume = 1;

			//this.bgmMusic.loop = true;
			//this.bgmMusic.play();
		}

		removeBrick(ball: IBallSprite, brick: Phaser.Sprite) {
			brick.kill();
			this.totalPoints += 10;
			this.points.text = this.totalPoints + constant.POINTS;
			this.sfxHitBrick.play();
		}

		hitPaddle(ball: IBallSprite, paddle: Phaser.Sprite) {
			this.sfxHitPaddle.play();
		}

		goToOver(){
			this.bgmMusic.stop();
			this.game.state.start(states.STATES_GAME_OVER);	
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

			this.sfxHitPaddle.play();
		}

		loseLife() {
			this.resetPaddle();
			this.remainingLives--;
			if ( this.remainingLives <= 0){
				this.goToOver();
			}
			this.lives.text = constant.LIVES + this.remainingLives;
		}

		update() {
			this.game.physics.arcade.collide(this.ball, this.paddle, this.hitPaddle, null, this);
			this.game.physics.arcade.collide(this.ball, this.bricks, this.removeBrick, null, this);

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
