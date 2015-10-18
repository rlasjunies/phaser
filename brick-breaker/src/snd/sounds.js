/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var _;
(function (_) {
    var sounds;
    (function (sounds) {
        sounds.HIT_BRICK = "sfxHitBrick";
        sounds.HIT_PADDLE = "sfxHitPaddle";
        sounds.BACKGROUND = "bgmMusic";
        function loadSounds() {
            bb.load.audio(sounds.HIT_BRICK, "snd/fx_hit_brick.wav");
            bb.load.audio(sounds.HIT_PADDLE, "snd/fx_hit_paddle.wav");
            bb.load.audio(sounds.BACKGROUND, "snd/bgm_electric_air.ogg");
        }
        sounds.loadSounds = loadSounds;
        function init() {
            sounds.sfxHitBrick = bb.add.audio(sounds.HIT_BRICK);
            sounds.sfxHitBrick.volume = 1;
            sounds.sfxHitPaddle = bb.add.audio(sounds.HIT_PADDLE);
            sounds.sfxHitPaddle.volume = 1;
            sounds.sfxBackgroundMusic = bb.add.audio(sounds.BACKGROUND);
            sounds.sfxBackgroundMusic.volume = 1;
        }
        sounds.init = init;
        function hitPaddle() {
            sounds.sfxHitPaddle.play();
        }
        sounds.hitPaddle = hitPaddle;
        function hitBrick() {
            sounds.sfxHitPaddle.play();
        }
        sounds.hitBrick = hitBrick;
        function backgroundPlay() {
            sounds.sfxBackgroundMusic.loop = true;
            sounds.sfxBackgroundMusic.play();
        }
        sounds.backgroundPlay = backgroundPlay;
        function backgroundStop() {
            sounds.sfxBackgroundMusic.stop();
        }
        sounds.backgroundStop = backgroundStop;
    })(sounds = _.sounds || (_.sounds = {}));
})(_ || (_ = {}));
