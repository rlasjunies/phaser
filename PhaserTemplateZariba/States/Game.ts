//This is your main game class

/// <reference path='../typings/app.d.ts' />
/// <reference path='../typings/tsd.d.ts' />


module GameName{
    export class Game extends Phaser.State{
        constructor(){

            super();
        }

        preload(){

        }

        create(){
            var bmd = this.game.add.bitmapData(200,200);

            bmd.ctx.beginPath();
            bmd.ctx.fillStyle="#FF0000";
            bmd.ctx.strokeStyle="#F00";
            bmd.ctx.lineWidth = 20;
            bmd.ctx.arc(bmd.width/2,bmd.height/2,50,0,2*Math.PI);
            bmd.ctx.closePath();
            bmd.ctx.fill();
            bmd.ctx.stroke();

            var bmdSprite = this.game.add.sprite(400,400,bmd);
            bmdSprite.anchor.set(0.5,0.5);

            var tween = this.game.add.tween(bmdSprite);
            tween.to({alpha:0},1000,Phaser.Easing.Default,true,100,100,true);
            var tweenPosition = this.game.add.tween(bmdSprite.position);
            tweenPosition.to({y:this.game.height},1000,Phaser.Easing.Default,true,100,100,true);


        }
    }
}