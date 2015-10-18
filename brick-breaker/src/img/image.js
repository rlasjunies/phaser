/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>
var images;
(function (images) {
    images.PADDLE = 'imgPaddle';
    images.BRICKGREEN = "brickGreen";
    images.BRICKPURPLE = "brickPurple";
    images.BRICKRED = "brickRed";
    images.BRICKYELLOW = "brickYellow";
    images.BALL = "ball";
    images.BACKGROUND_BLUE = "backgroundBlue";
    images.BACKGROUND_BLACK = "backgroundBlack";
    images.LOGO = "logo";
    images.START = "start";
    images.BACK = "back";
    images.PROGRESS_VOID = "progresVoid";
    images.PRGRESS_FULL = "progressFull";
    function loadImages() {
        bb.load.image(images.PADDLE, 'img/paddle.png');
        bb.load.image(images.BRICKGREEN, 'img/brick_green.png');
        bb.load.image(images.BRICKPURPLE, 'img/brick_purple.png');
        bb.load.image(images.BRICKRED, 'img/brick_red.png');
        bb.load.image(images.BRICKYELLOW, 'img/brick_yellow.png');
        bb.load.image(images.BALL, 'img/ball.png');
        bb.load.image(images.BACKGROUND_BLACK, 'img/bg_black.png');
        bb.load.image(images.BACKGROUND_BLUE, 'img/bg_blue.png');
        bb.load.image(images.LOGO, 'img/logo_game.png');
        bb.load.spritesheet(images.START, "img/btn_start.png", 190, 49);
        bb.load.spritesheet(images.BACK, "img/btn_back.png", 190, 49);
    }
    images.loadImages = loadImages;
})(images || (images = {}));
