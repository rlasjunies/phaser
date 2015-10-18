/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var _;
(function (_) {
    var states;
    (function (states) {
        function goToMain() {
            bb.state.start(states.STATES_MAIN);
        }
        states.goToMain = goToMain;
        function goToIntro() {
            bb.state.start(states.STATES_INTRO);
        }
        states.goToIntro = goToIntro;
        function loadStates() {
            bb.state.add(states.STATES_INTRO, states.Intro, true);
            bb.state.add(states.STATES_MAIN, states.Main, false);
            bb.state.add(states.STATES_GAME_OVER, states.GameOver, false);
        }
        states.loadStates = loadStates;
    })(states = _.states || (_.states = {}));
})(_ || (_ = {}));
