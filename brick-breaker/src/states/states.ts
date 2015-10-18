/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>

namespace _.states{

	export function goToMain(){
		bb.state.start(states.STATES_MAIN);
	}

	export function goToIntro(){
		bb.state.start(states.STATES_INTRO);
	}
	
	export function loadStates(){
    	bb.state.add(states.STATES_INTRO, states.Intro, true);
		bb.state.add(states.STATES_MAIN, states.Main, false);
    	bb.state.add(states.STATES_GAME_OVER, states.GameOver, false);
	}

}