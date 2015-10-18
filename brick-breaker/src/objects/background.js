/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _;
(function (_) {
    var objects;
    (function (objects) {
        var Background = (function (_super) {
            __extends(Background, _super);
            //background:Phaser.TileSprite
            function Background() {
                _super.call(this, bb, 0, 0, bb.world.width, bb.world.height, images.BACKGROUND_BLUE);
                // var w = this.game.world.width;
                // var h = this.game.world.height;
                // this.bkg = this.game.add.tileSprite(0, 0, w, h, images.BACKGROUND_BLUE)
            }
            Background.prototype.update = function () {
                this.tilePosition.y += 1;
            };
            return Background;
        })(Phaser.TileSprite);
        objects.Background = Background;
    })(objects = _.objects || (_.objects = {}));
})(_ || (_ = {}));
