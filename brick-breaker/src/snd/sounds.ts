/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>

namespace sounds{
	export var HIT_BRICK = "sfxHitBrick";
	export var HIT_PADDLE = "sfxHitPaddle";
	export var BACKGROUND = "bgmMusic";
	
	export function loadSounds(){
		bb.game.load.audio(HIT_BRICK, "snd/fx_hit_brick.wav");
		bb.game.load.audio(HIT_PADDLE, "snd/fx_hit_paddle.wav");
		bb.game.load.audio(BACKGROUND,"snd/bgm_electric_air.ogg");
	}

}