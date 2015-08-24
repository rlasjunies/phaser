/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/app.d.ts"/>

namespace walking.objects{
	
	export class Scene extends Phaser.Sprite{
		game: Phaser.Game;
		nextFrame:Phaser.Sprite;
		
		constructor(game:Phaser.Game, x:number, y:number){
			super(game, x,y, graphics.SCENE, 0);
			this.nextFrame = new Phaser.Sprite(this.game, this.width,0, graphics.SCENE, 0);
			this.game.add.existing(this.nextFrame);
		}		
	}
}