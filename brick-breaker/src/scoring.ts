/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/app.d.ts"/>
namespace _ {
	export class Score {
		evtScoreChanged: Phaser.Signal;
		evtLifeEnded: Phaser.Signal;
		
		remainingLives: number;
		totalPoints: number = 0;
		initialRemainingLives: number = 1;
		constructor() {
			this.evtScoreChanged = new Phaser.Signal();
			this.evtLifeEnded = new Phaser.Signal();
			this.reinitialize();
		}

		looseLife() {
			this.remainingLives--;
			if ( this.remainingLives <= 0){
				this.evtLifeEnded.dispatch(this);
			}
			this.evtScoreChanged.dispatch(this);
		}

		hitBrick() {
			this.totalPoints += 10;
			this.evtScoreChanged.dispatch(this);
		}
		reinitialize() {
			this.remainingLives = this.initialRemainingLives;
			this.totalPoints = 0;
		}

	}
}
