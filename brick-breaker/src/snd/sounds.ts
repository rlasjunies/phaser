/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>

namespace _.sounds{
	export let HIT_BRICK = "sfxHitBrick";
	export let HIT_PADDLE = "sfxHitPaddle";
	export let BACKGROUND = "bgmMusic";
	
	export let sfxHitBrick: Phaser.Sound;
	export let sfxHitPaddle: Phaser.Sound;
	export let sfxBackgroundMusic: Phaser.Sound;

	export function loadSounds(){
		bb.game.load.audio(HIT_BRICK, "snd/fx_hit_brick.wav");
		bb.game.load.audio(HIT_PADDLE, "snd/fx_hit_paddle.wav");
		bb.game.load.audio(BACKGROUND,"snd/bgm_electric_air.ogg");
	}
	
	export function init(){
		sfxHitBrick = bb.game.add.audio(sounds.HIT_BRICK);
		sfxHitBrick.volume = 1;
		sfxHitPaddle = bb.game.add.audio(sounds.HIT_PADDLE);
		sfxHitPaddle.volume = 1
		sfxBackgroundMusic = bb.game.add.audio(sounds.BACKGROUND);
		sfxBackgroundMusic.volume = 1;
	}
	
	export function hitPaddle(){
		sfxHitPaddle.play();
	}

	export function hitBrick(){
		sfxHitPaddle.play();
	}
	
	export function backgroundPlay(){
		sfxBackgroundMusic.loop = true;
		sfxBackgroundMusic.play();		
	}

	export function backgroundStop(){
		sfxBackgroundMusic.stop();		
	}	
	
}