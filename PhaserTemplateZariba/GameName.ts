/// <reference path='./typings/app.d.ts' />
/// <reference path='./typings/tsd.d.ts' />

/* Rename "GameName" (this class and the file itself) to the name of the new game */
module GameName {
    class GameName extends Phaser.Game {

        constructor(width?:number, height?:number) {
            super(width, height, Phaser.AUTO, 'phaserDiv', {create: this.create});
        }


        create() {
            this.state.add("Preloader", Preloader, true);
        }
    }

    window.onload = () => {
        new GameName(1280,720);
    };
}