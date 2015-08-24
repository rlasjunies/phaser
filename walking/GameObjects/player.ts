/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/app.d.ts"/>

namespace walking.objects {

	export enum PLAYER_STATE {
		idle,
		walking
	}
	export class Player extends Phaser.Sprite {
		game: Phaser.Game;
		state: PLAYER_STATE;

		rightArrow: Phaser.Key;
		leftArrow: Phaser.Key;
		escape: Phaser.Key;

		walkingSpeed: number;

		public static MAX_SPEED: number = 30;

		constructor(game: Phaser.Game, x: number, y: number) {
			this.game = game;
			this.walkingSpeed = 0;

			this.rightArrow = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
			this.rightArrow.onDown.add(this.moveRight, this)
			this.leftArrow = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
			this.leftArrow.onDown.add(this.moveLessRight, this);
			this.escape = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
			this.escape.onDown.add(this.gameOver, this);

			super(game, x, y, "HERO_WALKING", 0);

			this.anchor.set(0.0, 1.0);
			this.startIdle();

			console.log("player contructor");
		}

		gameOver() {
			this.game.state.start(states.STATE_GAME_OVER);
		}

		update() {
			if (this.state === PLAYER_STATE.walking) {
				this.x += (this.walkingSpeed / Player.MAX_SPEED) * (60 / this.game.time.physicsElapsedMS)

				var stageWitdh = this.game.stage.getChildAt(0).getBounds().width;
				if (this.x > stageWitdh * .75) {
					this.x = stageWitdh * .25;
				}
			}
		}

		moveLessRight() {
			if (this.state != PLAYER_STATE.idle) {
				this.walkingSpeed--;

				if (this.walkingSpeed > 0) {
					this.animations.currentAnim.speed = this.walkingSpeed;
				} else {
					this.startIdle();
				}
			}
		}

		moveRight() {
			if (this.state === PLAYER_STATE.idle) {
				this.startWalking();
			} else {
				if (this.walkingSpeed < objects.Player.MAX_SPEED) {
					this.walkingSpeed++;
					this.animations.currentAnim.speed = this.walkingSpeed;
				}
			}
		}


		startWalking() {
			this.state = PLAYER_STATE.walking;
			this.walkingSpeed = 5;
			this.loadTexture("HERO_WALKING", 0);
			this.animations.add("walk");
			this.animations.play("walk", this.walkingSpeed, true);
		}

		startIdle() {
			this.state = PLAYER_STATE.idle;
			this.walkingSpeed = 0;
			this.loadTexture("HERO_IDLE", 0);
			this.animations.add("idle");
			this.animations.play("idle", 15, true);
		}
	}
}
