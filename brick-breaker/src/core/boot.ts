module _.Core {

    export class Boot extends Phaser.State {
        // -------------------------------------------------------------------------
        constructor() {
            super();
        }

        // -------------------------------------------------------------------------
        init() {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = false;

            var screenDims = Utils.ScreenUtils.screenMetrics;

            if (this.game.device.desktop) {
                console.log("DESKTOP");
                this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
                this.scale.setUserScale(screenDims.scaleX, screenDims.scaleY);
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
            }
            else {
                console.log("MOBILE");
                this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
                this.scale.setUserScale(screenDims.scaleX, screenDims.scaleY);
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
                this.scale.forceOrientation(true, false);
            }

            console.log(screenDims);
        } 

        // -------------------------------------------------------------------------
        preload() {
            //this.load.image("Test", "assets/test.png");
        }

        // -------------------------------------------------------------------------
        create() {
            //this.stage.backgroundColor = 0x8080FF;

            //var bg: Phaser.Image = this.add.sprite(this.world.centerX, this.world.centerY, "Test");
            //bg.anchor.setTo(0.5, 0.5);
        }
    }
}
