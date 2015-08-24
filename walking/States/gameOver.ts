/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/app.d.ts"/>

namespace walking.states {
	export var STATE_GAME_OVER = "gameOver";
	
	export class GameOver extends Phaser.State {
		game: Phaser.Game;
		gameOverSprite: Phaser.Sprite;

		constructor() {
			super();
		}

		create() {
			this.gameOverSprite = this.add.sprite(0, 0, graphics.GAME_OVER, 0);
			this.gameOverSprite.scale.setTo(
				this.game.width / this.gameOverSprite.width,
				this.game.height / this.gameOverSprite.height);
				
			this.input.onDown.add(()=>{
				this.game.state.start(states.STATE_TITLE_SCREEN,true);
			})
		}
	}
}