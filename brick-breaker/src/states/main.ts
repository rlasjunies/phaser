/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>

namespace _.states {
	export const STATES_MAIN: string = "mainState";

	export class Main extends Phaser.State {
		scoringPanel: objects.ScoringPanel;
		
		bkg: objects.Background;
		paddle: objects.Paddle;
		ball: objects.Ball;
		bricks: Phaser.Group;

		constructor() {
			super();
		}

		create() {
			bb.physics.startSystem(Phaser.Physics.ARCADE);
			bb.physics.arcade.checkCollision.down = false;

			//TileSprite
			this.bkg = this.game.add.existing(new objects.Background()); //this.game.add.tileSprite(0, 0, w, h, images.BACKGROUND_BLUE)
			this.paddle = this.game.add.existing(new objects.Paddle())
			this.ball = this.game.add.existing(new objects.Ball());
			this.ball.evtOutOfBounds.add(this.loseLife, this);
			this.scoringPanel = new objects.ScoringPanel();
			this.bricks = new objects.Bricks();
			
			this.reset();

			bb.input.onDown.add(this.ball.shootBall, this);
			bb.score.evtLifeEnded.add(this.endGame, this);			
			sounds.init();
			
			bb.scale.setShowAll();
bb.scale.pageAlignHorizontally = true;
bb.scale.pageAlignVeritcally = true;
bb.scale.refresh();

		}

		removeBrick(ball: objects.Ball, brick: Phaser.Sprite) {
			brick.kill();
			bb.score.hitBrick();
			sounds.hitBrick();
		}

		endGame(){
			sounds.backgroundStop();
			this.game.state.start(states.STATES_GAME_OVER);	
		}
		
		loseLife() {
			this.reset();
			bb.score.looseLife();
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

		reset() {			
			this.paddle.resetPaddle();
			this.ball.resetBall(this.paddle);
		}
	}
}
