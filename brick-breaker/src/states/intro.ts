/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>

namespace _.states{

	export const STATES_INTRO = "stateIntro"; 
	
	export class Intro extends Phaser.State{
		game:Phaser.Game;
		backgroundTile:Phaser.TileSprite;
		
		constructor(){
			super();
		}
		
		preload(){
		  images.loadImages();
	      sounds.loadSounds();
		}
		
		create(){
			var w = this.game.world.width;
			var h = this.game.world.height;
			
			this.backgroundTile = this.game.add.tileSprite(0,0,w,h,images.BACKGROUND_BLUE);

			var marginTop:number = 30; 
			
			var logo = this.game.add.image(0,0,images.LOGO);
			logo.anchor.x = .5;
			logo.x = this.game.world.centerX;
			logo.y = marginTop;
			
			
			var outFrame = 0;
			var overFrame = 1;
			var downFrame = 2;
			var btnStart = this.game.add.button(
				0,
				0,
				images.START, 
				goToMain, 
				this,
				overFrame,
				outFrame,
				downFrame);
			btnStart.anchor.x = .5;
			btnStart.x = this.game.world.centerX;
			btnStart.y = this.game.world.centerY;
			
bb.scale.setShowAll();
bb.scale.pageAlignHorizontally = true;
bb.scale.pageAlignVeritcally = true;
bb.scale.refresh();
		}
		
		update(){
			if ( this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
				states.goToMain();
			}
		}
	}
}