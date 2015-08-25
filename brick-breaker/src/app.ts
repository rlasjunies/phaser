/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/app.d.ts"/>
  
namespace _{
    export class Game{
      game: Phaser.Game;
      score: Score;
    
      constructor(){
        this.game = new Phaser.Game(640, 429, Phaser.AUTO, "phaser_game",{
          create: this.create,
      		preload: this.preload});
    
        this.score = new _.Score();     
      }
      
      preload(){
        states.loadStates();
      }
      
      create(){        
        this.game.scale.pageAlignHorizontally=true;
        if( !this.game.device.desktop){
          this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        }
        this.game.scale.refresh();
      }
  }
}

var bb:_.Game;
window.onload = function () {
  bb = new _.Game();
};