/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>

namespace bb.images {

	export const PADDLE = 'imgPaddle';
	export const BRICKGREEN = "brickGreen";
	export const BRICKPURPLE = "brickPurple";
	export const BRICKRED = "brickRed";
	export const BRICKYELLOW = "brickYellow";
	export const BALL = "ball";
	
	export function loadImage(g: bb.Game) {
		g.game.load.image(PADDLE, 'img/paddle.png');
		g.game.load.image(BRICKGREEN, 'img/brick_green.png');
		g.game.load.image(BRICKPURPLE, 'img/brick_purple.png');
		g.game.load.image(BRICKRED, 'img/brick_red.png');
		g.game.load.image(BRICKYELLOW, 'img/brick_yellow.png');
		g.game.load.image(BALL, 'img/ball.png');
	}

	// export class Image {
	// 	loadImage(g: bb.Game) {
	// 		g.game.load.image(PADDLE, 'img/paddle.png');
	// 	}
	// }
}