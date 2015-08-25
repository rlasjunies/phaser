/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/app.d.ts"/>
  
namespace _{
    export class Game{
      game: Phaser.Game;
      public score: Score;
    
      constructor(){
        this.game = new Phaser.Game(640, 429, Phaser.AUTO, "phaser_game",{
          create: this.create,
      		preload: this.preload});
    
        this.score = new _.Score();     
        console.log("Game.constructor");
      }
      
      preload(){
        states.loadStates();
      }
      
      create(){        
      }
  }
}

var bb:_.Game;
window.onload = function () {
  bb = new _.Game();
};