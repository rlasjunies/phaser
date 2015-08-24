/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>

namespace states {

	export const STATES_GAME_OVER = "gameOver";

	export class GameOver extends Phaser.State {
		game: Phaser.Game;
		background: Phaser.TileSprite;
		over: Phaser.Text;
		
		constructor() {
			super();
		}

		create() {
			var w = this.game.world.width;
			var h = this.game.world.height;

			this.background = this.game.add.tileSprite(0, 0, w, h, images.BACKGROUND_BLUE);

			var outFrame = 0;
			var overFrame = 1;
			var downFrame = 2;
			var margin = 60;
			var btnStart = this.game.add.button(
				0,
				0,
				images.START,
				goToMain,
				this,
				overFrame,
				outFrame,
				downFrame);
			btnStart.anchor.set(.5,1);
			btnStart.x = this.game.world.centerX;
			btnStart.y = this.game.world.height - margin;

			var txtOverConfig = {
				font: "40px sans-serif",
				fill: "#ffffff",
				align: "center"
			}
		
			this.over = this.game.add.text(
				0,
				0,
				constant.GAME_ORVER,
				txtOverConfig);
			this.over.anchor.x = .5;
			this.over.x = this.game.world.centerX;
			this.over.y = margin * 2;	
		}

		update() {
			if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
				states.goToIntro();
			}
		}
	}
}