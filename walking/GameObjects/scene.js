/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/app.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var walking;
(function (walking) {
    var objects;
    (function (objects) {
        var Scene = (function (_super) {
            __extends(Scene, _super);
            function Scene(game, x, y) {
                _super.call(this, game, x, y, walking.graphics.SCENE, 0);
                this.nextFrame = new Phaser.Sprite(this.game, this.width, 0, walking.graphics.SCENE, 0);
                this.game.add.existing(this.nextFrame);
            }
            return Scene;
        })(Phaser.Sprite);
        objects.Scene = Scene;
    })(objects = walking.objects || (walking.objects = {}));
})(walking || (walking = {}));
