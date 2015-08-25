/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>

namespace _.objects {


	export class Background extends Phaser.TileSprite{
		//background:Phaser.TileSprite
		constructor(){
			super(bb.game,0,0,bb.game.world.width, bb.game.world.height, images.BACKGROUND_BLUE);
			
			// var w = this.game.world.width;
			// var h = this.game.world.height;
			// this.bkg = this.game.add.tileSprite(0, 0, w, h, images.BACKGROUND_BLUE)

		}
		
		update(){
			this.tilePosition.y+=1;
		}
	}
}