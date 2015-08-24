/// <reference path="./typings/tsd.d.ts"/>
/// <reference path="./typings/app.d.ts"/>

namespace walking.graphics{
	export var SCENE = "scene";
	export var TITLE = "title";
	export var GAME_OVER = "gameover";
}
namespace walking{
	
	export class Game{
		game: Phaser.Game;
		
		constructor(){
			this.game = new Phaser.Game(1280,720, Phaser.AUTO, 'content', {
				create: this.create,
				preload: this.preload
			});
			console.log(`game constructor`)
		}

		preload(){
			// Graphics
            this.game.load.image(graphics.TITLE, "Graphics/TitleScreen.png");
            this.game.load.image(graphics.SCENE, "Graphics/scene720p.png");
            this.game.load.image(graphics.GAME_OVER, "Graphics/GameOver.png");

            //Spritesheets
            this.game.load.atlasXML("HERO_WALKING", "Graphics/Hero_Walking.png", "Graphics/Hero_Walking.xml");
            this.game.load.atlasXML("HERO_IDLE", "Graphics/Hero_Idle.png", "Graphics/Hero_Idle.xml");

            // Audio
            this.game.load.audio("TitleSong", ["Sounds/TitleSong.mp3", "Sounds/TitleSong.ogg",
 "Sounds/TitleSong.wav"]);
				
		}
		
		create(){
			this.game.state.add(states.STATE_TITLE_SCREEN, states.TitleScreenState, true);
			this.game.state.add(states.STATE_GAME_PLAY, states.GamePlayState,false)
			this.game.state.add(states.STATE_GAME_OVER, states.GameOver,false)

			this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;	
		}
	}
}

window.onload = () => {
	var game = new walking.Game();
};