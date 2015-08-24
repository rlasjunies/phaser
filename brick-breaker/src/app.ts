/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/app.d.ts"/>
  
class Game{
  game: Phaser.Game;
  
  constructor(){
    this.game = new Phaser.Game(640, 429, Phaser.AUTO, "phaser_game",{
      create: this.create,
  		preload: this.preload});
    console.log("Game.constructor");
  }
  
  preload(){
    states.loadStates();
  }
  
  create(){        
  }
}

var bb:Game;
window.onload = function () {
  bb = new Game();
};