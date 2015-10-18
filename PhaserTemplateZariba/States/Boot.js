/// <reference path='../typings/app.d.ts' />
/// <reference path='../typings/tsd.d.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//Boot class for splash screen, logos etc
var GameName;
(function (GameName) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        //Preload your assets, spritesheets, sounds, animations etc.
        Boot.prototype.preload = function () {
            this.game.load.image("zaribaLogo", "Graphics/zaribaLogo.png");
        };
        //Initialize all your variables, events etc.
        Boot.prototype.create = function () {
            var _this = this;
            var bootLogo = this.game.add.image(this.game.width * 0.5, this.game.height * 0.5, "zaribaLogo");
            bootLogo.anchor.set(0.5, 0.5);
            this.game.time.events.add(2000, function () {
                _this.game.state.start("Game");
            }, this);
        };
        return Boot;
    })(Phaser.State);
    GameName.Boot = Boot;
})(GameName || (GameName = {}));
