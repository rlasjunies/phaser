/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>

namespace states{

	export function goToMain(){
		bb.game.state.start(states.STATES_MAIN);
	}

	export function goToIntro(){
		bb.game.state.start(states.STATES_INTRO);
	}
	
	export function loadStates(){
    	bb.game.state.add(states.STATES_INTRO, states.Intro, true);
		bb.game.state.add(states.STATES_MAIN, states.Main, false);
    	bb.game.state.add(states.STATES_GAME_OVER, states.GameOver, false);
	}

}