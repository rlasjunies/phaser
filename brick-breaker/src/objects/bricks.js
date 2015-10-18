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
        var Bricks = (function (_super) {
            __extends(Bricks, _super);
            function Bricks() {
                _super.call(this, bb);
                this.numCols = 10;
                this.numRows = 4;
                //this.bricks = this.game.add.group();
                var brickImage = [
                    images.BRICKGREEN,
                    images.BRICKPURPLE,
                    images.BRICKRED,
                    images.BRICKYELLOW
                ];
                this.enableBody = true;
                this.physicsBodyType = Phaser.Physics.ARCADE;
                for (var rowIndex = 0; rowIndex < this.numRows; rowIndex++) {
                    var img = brickImage[rowIndex];
                    for (var colIndex = 0; colIndex < this.numCols; colIndex++) {
                        var brick = this.create(0, 0, img);
                        var bodyBrick = brick.body;
                        bodyBrick.immovable = true;
                        brick.x = brick.width * colIndex;
                        brick.y = brick.height * rowIndex;
                    }
                }
            }
            return Bricks;
        })(Phaser.Group);
        objects.Bricks = Bricks;
    })(objects = _.objects || (_.objects = {}));
})(_ || (_ = {}));
