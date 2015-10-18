/// <reference path='../typings/app.d.ts' />
/// <reference path='../typings/tsd.d.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameName;
(function (GameName) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            /* Preload assets that will be used in all states - e.g. the game logo */
            //this.game.load.image("gameLogo", "../Graphics/gameLogo.png");
        };
        Preloader.prototype.create = function () {
            this.initStates();
            this.setScale();
            this.game.state.start("Boot");
        };
        Preloader.prototype.initStates = function () {
            this.game.state.add("Boot", GameName.Boot);
            this.game.state.add("Game", GameName.Game);
        };
        Preloader.prototype.setScale = function () {
            this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        };
        return Preloader;
    })(Phaser.State);
    GameName.Preloader = Preloader;
})(GameName || (GameName = {}));
