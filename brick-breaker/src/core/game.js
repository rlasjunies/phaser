/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _;
(function (_) {
    var Core;
    (function (Core) {
        var Game = (function (_super) {
            __extends(Game, _super);
            // -------------------------------------------------------------------------
            function Game(defaultGameWidth, defaultGameHeight, expectedOrientation, initialStates) {
                this.screenMetrics = Core.Utils.ScreenUtils.calculateScreenMetrics(defaultGameWidth, defaultGameHeight, expectedOrientation);
                _super.call(this, this.screenMetrics.gameWidth, this.screenMetrics.gameHeight, Phaser.AUTO, "phaser_game_HTML_ID", initialStates /* , transparent, antialias, physicsConfig */);
                // states
                //this.state.add('Boot', Boot);
                // start
                //this.state.start('Boot');
            }
            return Game;
        })(Phaser.Game);
        Core.Game = Game;
    })(Core = _.Core || (_.Core = {}));
})(_ || (_ = {}));
