/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>

namespace images {

	export const PADDLE = 'imgPaddle';
	export const BRICKGREEN = "brickGreen";
	export const BRICKPURPLE = "brickPurple";
	export const BRICKRED = "brickRed";
	export const BRICKYELLOW = "brickYellow";
	export const BALL = "ball";
	export const BACKGROUND_BLUE = "backgroundBlue";
	export const BACKGROUND_BLACK = "backgroundBlack"
	export const LOGO = "logo"; 
	export const START = "start"; 
	export const BACK = "back"; 
	
	export function loadImages() {
		bb.game.load.image(PADDLE, 'img/paddle.png');
		bb.game.load.image(BRICKGREEN, 'img/brick_green.png');
		bb.game.load.image(BRICKPURPLE, 'img/brick_purple.png');
		bb.game.load.image(BRICKRED, 'img/brick_red.png');
		bb.game.load.image(BRICKYELLOW, 'img/brick_yellow.png');
		bb.game.load.image(BALL, 'img/ball.png');
		bb.game.load.image(BACKGROUND_BLACK, 'img/bg_black.png');
		bb.game.load.image(BACKGROUND_BLUE, 'img/bg_blue.png');
		bb.game.load.image(LOGO, 'img/logo_game.png');		
		bb.game.load.spritesheet(START, "img/btn_start.png", 190, 49);
		bb.game.load.spritesheet(BACK, "img/btn_back.png", 190, 49);
	}
}