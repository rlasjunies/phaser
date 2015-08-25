/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>

namespace _.states {
	export const STATES_MAIN: string = "mainState";

	export class Main extends Phaser.State {
		private numCols: number = 10;
		private numRows: number = 4;

		remainingLives: number = 1;
		totalPoints: number = 0;

		//lives: Phaser.Text;
		//points: Phaser.Text;
		scoringPanel: objects.ScoringPanel;
		
		bkg: Phaser.TileSprite;
		paddle: objects.Paddle;
		ball: objects.Ball;
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
			this.paddle = this.game.add.existing(new objects.Paddle(this.game,0,0))

			//Ball
			this.ball = this.game.add.existing(new objects.Ball(this.game, 0,0));
			this.ball.evtOutOfBounds.add(this.loseLife, this);
			
			this.resetPaddle();

			//Scoring Panel definition			
			this.scoringPanel = new objects.ScoringPanel(this.game, 1);

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

			this.game.input.onDown.add(this.ball.shootBall, this);

			//Sounds
			sounds.init();
		}

		removeBrick(ball: objects.Ball, brick: Phaser.Sprite) {
			brick.kill();
			this.totalPoints += 10;
			//TODO this.points.text = this.totalPoints + constant.POINTS;
			bb.score.hitBrick();
			sounds.hitBrick();
		}

		goToOver(){
			sounds.backgroundStop();
			this.game.state.start(states.STATES_GAME_OVER);	
		}
		
		loseLife() {
			this.resetPaddle();
			this.remainingLives--;
			if ( this.remainingLives <= 0){
				this.goToOver();
			}
			//TODO this.lives.text = constant.LIVES + this.remainingLives;
			bb.score.loseLife();
		}

		update() {
			this.game.physics.arcade.collide(this.ball, this.paddle, this.ball.hitPaddle, null, this);
			this.game.physics.arcade.collide(this.ball, this.bricks, this.removeBrick, null, this);

			if (this.ball.isShot === false) {
				this.ball.x = this.paddle.x;
			}

			if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
				this.ball.shootBall();
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
