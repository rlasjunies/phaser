/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/app.d.ts"/>
  
namespace _{
    export class Game extends Core.Game{
      //game: Phaser.Game;
      score: Score;
    
      constructor() {
        
        super(600, 800, Core.Utils.Orientation.PORTRAIT, {preload: this.preload, create: this.create});
        
        // this.game = new Phaser.Game(800, 600, Phaser.AUTO, "phaser_game",{
        //   create: this.create,
      	// 	preload: this.preload});    
        this.score = new _.Score();     
      }
      
      preload(){
        console.log("game Preloaded!");
        states.loadStates();
      }
       
      create(){
        console.log("game created!");
         
//          game.stage.fullScreenScaleMode = Phaser.StageScaleMode.SHOW_ALL;
// game.stage.scale.setShowAll();
// game.stage.scale.pageAlignHorizontally = true;
// game.stage.scale.pageAlignVeritcally = true;
// game.stage.scale.refresh();
         
         bb.scale.pageAlignHorizontally=true;
         bb.scale.pageAlignVertically=true;
        if( !bb.device.desktop){
           bb.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         }
         bb.scale.refresh();
      }
}
}

var bb:_.Game;
window.onload = function () {
  bb = new _.Game();
};