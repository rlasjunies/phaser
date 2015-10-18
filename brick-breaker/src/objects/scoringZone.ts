/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>

namespace _.objects {
	let HEIGHT = 24;
	let LIVES = "Lives: ";
	let POINTS = " points";

	export class ScoringPanel extends Phaser.Group {
		game: Phaser.Game;
		lives: Phaser.Text;
		points: Phaser.Text;

		constructor() {
			super(bb)

			var blackLine = this.game.add.tileSprite(0, 0, this.game.world.width, HEIGHT, images.BACKGROUND_BLACK)
			blackLine.anchor.set(0, 1);
			blackLine.y = this.game.world.height;
			
			//Text
			var livesConfig = {
				font: "18px sans-serif",
				fill: "#ffffff",
				align: "left"
			}
			this.lives = this.game.add.text(0, 0, "", livesConfig);
			this.lives.anchor.set(0, 1);
			this.lives.y = this.game.world.height;

			var pointsConfig = {
				font: "18px sans-serif",
				fill: "#ffffff",
				align: "right"
			}
			this.points = this.game.add.text(0, 0, "" + POINTS, pointsConfig);
			this.points.anchor.set(1, 1);
			this.points.x = this.game.world.width;
			this.points.y = this.game.world.height;

			this.scoreRefresh(bb.score);
			
			bb.score.evtScoreChanged.add(this.scoreRefresh, this);
		}

		scoreRefresh(score: _.Score) {
			this.lives.text = `${LIVES}${score.remainingLives}`
			this.points.text = score.totalPoints + POINTS
		}
	}
}