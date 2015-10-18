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
        var HEIGHT = 24;
        var LIVES = "Lives: ";
        var POINTS = " points";
        var ScoringPanel = (function (_super) {
            __extends(ScoringPanel, _super);
            function ScoringPanel() {
                _super.call(this, bb);
                var blackLine = this.game.add.tileSprite(0, 0, this.game.world.width, HEIGHT, images.BACKGROUND_BLACK);
                blackLine.anchor.set(0, 1);
                blackLine.y = this.game.world.height;
                //Text
                var livesConfig = {
                    font: "18px sans-serif",
                    fill: "#ffffff",
                    align: "left"
                };
                this.lives = this.game.add.text(0, 0, "", livesConfig);
                this.lives.anchor.set(0, 1);
                this.lives.y = this.game.world.height;
                var pointsConfig = {
                    font: "18px sans-serif",
                    fill: "#ffffff",
                    align: "right"
                };
                this.points = this.game.add.text(0, 0, "" + POINTS, pointsConfig);
                this.points.anchor.set(1, 1);
                this.points.x = this.game.world.width;
                this.points.y = this.game.world.height;
                this.scoreRefresh(bb.score);
                bb.score.evtScoreChanged.add(this.scoreRefresh, this);
            }
            ScoringPanel.prototype.scoreRefresh = function (score) {
                this.lives.text = "" + LIVES + score.remainingLives;
                this.points.text = score.totalPoints + POINTS;
            };
            return ScoringPanel;
        })(Phaser.Group);
        objects.ScoringPanel = ScoringPanel;
    })(objects = _.objects || (_.objects = {}));
})(_ || (_ = {}));
