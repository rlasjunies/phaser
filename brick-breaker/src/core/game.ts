/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>

namespace _.Core {
	export class Game extends Phaser.Game {
        public screenMetrics: Utils.ScreenMetrics;
        // -------------------------------------------------------------------------
        constructor(defaultGameWidth:number, 
            defaultGameHeight:number, 
            expectedOrientation:Utils.Orientation, initialStates:any) {
            this.screenMetrics = Utils.ScreenUtils.calculateScreenMetrics(defaultGameWidth, defaultGameHeight,
                expectedOrientation);

            super(this.screenMetrics.gameWidth, 
                this.screenMetrics.gameHeight, 
                Phaser.AUTO, 
                "phaser_game_HTML_ID",
                initialStates /* , transparent, antialias, physicsConfig */);
            
            // states
            //this.state.add('Boot', Boot);

            // start
            //this.state.start('Boot');
        }
    }
}