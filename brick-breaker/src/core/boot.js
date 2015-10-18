var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _;
(function (_) {
    var Core;
    (function (Core) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            // -------------------------------------------------------------------------
            function Boot() {
                _super.call(this);
            }
            // -------------------------------------------------------------------------
            Boot.prototype.init = function () {
                this.input.maxPointers = 1;
                this.stage.disableVisibilityChange = false;
                var screenDims = Core.Utils.ScreenUtils.screenMetrics;
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
            };
            // -------------------------------------------------------------------------
            Boot.prototype.preload = function () {
                //this.load.image("Test", "assets/test.png");
            };
            // -------------------------------------------------------------------------
            Boot.prototype.create = function () {
                //this.stage.backgroundColor = 0x8080FF;
                //var bg: Phaser.Image = this.add.sprite(this.world.centerX, this.world.centerY, "Test");
                //bg.anchor.setTo(0.5, 0.5);
            };
            return Boot;
        })(Phaser.State);
        Core.Boot = Boot;
    })(Core = _.Core || (_.Core = {}));
})(_ || (_ = {}));
