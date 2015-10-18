
/// <reference path='../typings/app.d.ts' />
/// <reference path='../typings/tsd.d.ts' />


module GameName {
    export class Preloader extends Phaser.State {

        preload() {
            /* Preload assets that will be used in all states - e.g. the game logo */
            //this.game.load.image("gameLogo", "../Graphics/gameLogo.png");

        }

        create() {

            this.initStates();
            this.setScale();

            this.game.state.start("Boot");
        }

        initStates() {
            this.game.state.add("Boot", Boot);
            this.game.state.add("Game", Game);
        }

        setScale() {
            this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        }
    }
}