/// <reference path="../typings/tsd.d.ts"/>
namespace bb{
  
  export class Game{
    game: Phaser.Game;
    
    constructor(){
      this.game = new Phaser.Game(640, 429, Phaser.AUTO, "phaser_game");
    }
    
    preload(){
    }
    
    create(){
    }
  
    update(){
    }
    
  } 
}

var game:bb.Game;
window.onload = function () {
  game = new bb.Game();
};