/// <reference path='../typings/app.d.ts' />
/// <reference path='../typings/tsd.d.ts' />



//Boot class for splash screen, logos etc


module GameName{
    export class Boot extends Phaser.State{

        //Preload your assets, spritesheets, sounds, animations etc.
        preload(){
            this.game.load.image("zaribaLogo", "Graphics/zaribaLogo.png");
        }

        //Initialize all your variables, events etc.
        create(){
            var bootLogo:Phaser.Image = this.game.add.image
            (this.game.width*0.5,this.game.height*0.5, "zaribaLogo");
            bootLogo.anchor.set(0.5,0.5);

            this.game.time.events.add(2000, ()=> {
                this.game.state.start("Game");
            },this);
        }
    }
}