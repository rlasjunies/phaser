/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/app.d.ts"/>

namespace bb{
  
  export class Game{
    game: Phaser.Game;
    
    constructor(){
      this.game = new Phaser.Game(640, 429, Phaser.AUTO, "phaser_game",{
        create: this.create,
				preload: this.preload});
      console.log("Game.constructor");
    }
    
    preload(){
      bb.images.loadImage(this);
    }
    
    create(){        
      this.game.state.add(bb.states.STATES_MAIN, bb.states.Main, true);
      console.log("Game.Create - constructor");
    }
      
  } 
}

var game:bb.Game;
window.onload = function () {
  game = new bb.Game();
};