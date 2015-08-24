/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/app.d.ts"/>

namespace walking.states {

	export var STATE_GAME_PLAY = "gamePlayState";
	
	export class GamePlayState extends Phaser.State {
		game: Phaser.Game;
		player: objects.Player; 
		scene: objects.Scene;
		constructor() {
			super();
			
			console.log("game play state constructor");
		}

		create() {
			this.scene = new objects.Scene(this.game, 0, 0);
			this.player = new objects.Player(this.game,0, this.game.height - 50);

			this.game.add.existing(this.scene);
			this.game.add.existing(this.player);
			
			this.world.setBounds(0,0,this.scene.width*2,this.scene.height);
			this.world.camera.follow(this.player);			
			console.log("create game play");
		}
	}
}