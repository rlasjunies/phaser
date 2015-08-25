/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/app.d.ts"/>
(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports"], function (require, exports) {
    var Score = (function () {
        function Score() {
            this.totalPoints = 0;
            this.initialRemainingLives = 1;
            this.evtScoreChanged = new Phaser.Signal();
            this.reinitialize();
        }
        Score.prototype.loseLife = function () {
            this.remainingLives--;
            this.evtScoreChanged.dispatch(this);
        };
        Score.prototype.hitBrick = function () {
            this.totalPoints += 10;
            this.evtScoreChanged.dispatch(this);
        };
        Score.prototype.reinitialize = function () {
            this.remainingLives = this.initialRemainingLives;
            this.totalPoints = 0;
        };
        return Score;
    })();
    exports.Score = Score;
});
