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
	export const PROGRESS_VOID = "progresVoid";
	export const PRGRESS_FULL = "progressFull";
	
	export function loadImages() {
		bb.load.image(PADDLE, 'img/paddle.png');
		bb.load.image(BRICKGREEN, 'img/brick_green.png');
		bb.load.image(BRICKPURPLE, 'img/brick_purple.png');
		bb.load.image(BRICKRED, 'img/brick_red.png');
		bb.load.image(BRICKYELLOW, 'img/brick_yellow.png');
		bb.load.image(BALL, 'img/ball.png');
		bb.load.image(BACKGROUND_BLACK, 'img/bg_black.png');
		bb.load.image(BACKGROUND_BLUE, 'img/bg_blue.png');
		bb.load.image(LOGO, 'img/logo_game.png');		
		bb.load.spritesheet(START, "img/btn_start.png", 190, 49);
		bb.load.spritesheet(BACK, "img/btn_back.png", 190, 49);
	}
}