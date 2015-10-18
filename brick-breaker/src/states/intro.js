/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _;
(function (_) {
    var states;
    (function (states) {
        states.STATES_INTRO = "stateIntro";
        var Intro = (function (_super) {
            __extends(Intro, _super);
            function Intro() {
                _super.call(this);
            }
            Intro.prototype.preload = function () {
                images.loadImages();
                _.sounds.loadSounds();
            };
            Intro.prototype.create = function () {
                var w = this.game.world.width;
                var h = this.game.world.height;
                this.backgroundTile = this.game.add.tileSprite(0, 0, w, h, images.BACKGROUND_BLUE);
                var marginTop = 30;
                var logo = this.game.add.image(0, 0, images.LOGO);
                logo.anchor.x = .5;
                logo.x = this.game.world.centerX;
                logo.y = marginTop;
                var outFrame = 0;
                var overFrame = 1;
                var downFrame = 2;
                var btnStart = this.game.add.button(0, 0, images.START, states.goToMain, this, overFrame, outFrame, downFrame);
                btnStart.anchor.x = .5;
                btnStart.x = this.game.world.centerX;
                btnStart.y = this.game.world.centerY;
                bb.scale.setShowAll();
                bb.scale.pageAlignHorizontally = true;
                bb.scale.pageAlignVeritcally = true;
                bb.scale.refresh();
            };
            Intro.prototype.update = function () {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    states.goToMain();
                }
            };
            return Intro;
        })(Phaser.State);
        states.Intro = Intro;
    })(states = _.states || (_.states = {}));
})(_ || (_ = {}));
