/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/app.d.ts"/>

namespace walking.states{
	
	export var STATE_TITLE_SCREEN = "TitleScreenState";
	
	export class TitleScreenState extends Phaser.State{
		game: Phaser.Game;
		music: Phaser.Sound;
		titleScreenImage: Phaser.Sprite;
		
		constructor(){
			super();
			console.log("title screen constructor");
		}
		
		preload(){
						
		}
		
		create(){
			this.titleScreenImage = this.add.sprite(0,0, graphics.TITLE);
			this.titleScreenImage.scale.set(
				this.game.width / this.titleScreenImage.width,
				this.game.height / this.titleScreenImage.height);
		
			this.music = this.game.add.audio("TitleSong");
			this.music.volume = 10;
			this.music.loop = true;
			this.music.play();
			this.input.onDown.add(this.titleClicked, this);
			console.log("create of titlescreen");
		}
		
		titleClicked(){
			this.music.stop();
			this.game.state.start(states.STATE_GAME_PLAY)
		}
	}
}