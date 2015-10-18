/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/app.d.ts"/>
var _;
(function (_) {
    var Score = (function () {
        function Score() {
            this.totalPoints = 0;
            this.initialRemainingLives = 1;
            this.evtScoreChanged = new Phaser.Signal();
            this.evtLifeEnded = new Phaser.Signal();
            this.reinitialize();
        }
        Score.prototype.looseLife = function () {
            this.remainingLives--;
            if (this.remainingLives <= 0) {
                this.evtLifeEnded.dispatch(this);
            }
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
    _.Score = Score;
})(_ || (_ = {}));
