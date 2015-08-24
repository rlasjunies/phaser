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
    var states;
    (function (states) {
        states.STATE_TITLE_SCREEN = "TitleScreenState";
        var TitleScreenState = (function (_super) {
            __extends(TitleScreenState, _super);
            function TitleScreenState() {
                _super.call(this);
                console.log("title screen constructor");
            }
            TitleScreenState.prototype.preload = function () {
            };
            TitleScreenState.prototype.create = function () {
                this.titleScreenImage = this.add.sprite(0, 0, walking.graphics.TITLE);
                this.titleScreenImage.scale.set(this.game.width / this.titleScreenImage.width, this.game.height / this.titleScreenImage.height);
                this.music = this.game.add.audio("TitleSong");
                this.music.volume = 10;
                this.music.loop = true;
                this.music.play();
                this.input.onDown.add(this.titleClicked, this);
                console.log("create of titlescreen");
            };
            TitleScreenState.prototype.titleClicked = function () {
                this.music.stop();
                this.game.state.start(states.STATE_GAME_PLAY);
            };
            return TitleScreenState;
        })(Phaser.State);
        states.TitleScreenState = TitleScreenState;
    })(states = walking.states || (walking.states = {}));
})(walking || (walking = {}));
