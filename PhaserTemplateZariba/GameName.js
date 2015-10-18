/// <reference path='./typings/app.d.ts' />
/// <reference path='./typings/tsd.d.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* Rename "GameName" (this class and the file itself) to the name of the new game */
var GameName;
(function (GameName_1) {
    var GameName = (function (_super) {
        __extends(GameName, _super);
        function GameName(width, height) {
            _super.call(this, width, height, Phaser.AUTO, 'phaser-div', { create: this.create });
        }
        GameName.prototype.create = function () {
            this.state.add("Preloader", GameName_1.Preloader, true);
        };
        return GameName;
    })(Phaser.Game);
    window.onload = function () {
        new GameName(1280, 720);
    };
})(GameName || (GameName = {}));
