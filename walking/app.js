/// <reference path="./typings/tsd.d.ts"/>
/// <reference path="./typings/app.d.ts"/>
var walking;
(function (walking) {
    var graphics;
    (function (graphics) {
        graphics.SCENE = "scene";
        graphics.TITLE = "title";
        graphics.GAME_OVER = "gameover";
    })(graphics = walking.graphics || (walking.graphics = {}));
})(walking || (walking = {}));
var walking;
(function (walking) {
    var Game = (function () {
        function Game() {
            this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', {
                create: this.create,
                preload: this.preload
            });
            console.log("game constructor");
        }
        Game.prototype.preload = function () {
            // Graphics
            this.game.load.image(walking.graphics.TITLE, "Graphics/TitleScreen.png");
            this.game.load.image(walking.graphics.SCENE, "Graphics/scene720p.png");
            this.game.load.image(walking.graphics.GAME_OVER, "Graphics/GameOver.png");
            //Spritesheets
            this.game.load.atlasXML("HERO_WALKING", "Graphics/Hero_Walking.png", "Graphics/Hero_Walking.xml");
            this.game.load.atlasXML("HERO_IDLE", "Graphics/Hero_Idle.png", "Graphics/Hero_Idle.xml");
            // Audio
            this.game.load.audio("TitleSong", ["Sounds/TitleSong.mp3", "Sounds/TitleSong.ogg",
                "Sounds/TitleSong.wav"]);
        };
        Game.prototype.create = function () {
            this.game.state.add(walking.states.STATE_TITLE_SCREEN, walking.states.TitleScreenState, true);
            this.game.state.add(walking.states.STATE_GAME_PLAY, walking.states.GamePlayState, false);
            this.game.state.add(walking.states.STATE_GAME_OVER, walking.states.GameOver, false);
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        };
        return Game;
    })();
    walking.Game = Game;
})(walking || (walking = {}));
window.onload = function () {
    var game = new walking.Game();
};
