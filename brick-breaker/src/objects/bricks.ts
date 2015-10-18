/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/app.d.ts"/>

namespace _.objects{
	export class Bricks extends Phaser.Group{
		private numCols: number = 10;
		private numRows: number = 4;

		constructor(){
			super(bb);
		
			//this.bricks = this.game.add.group();
			let brickImage = [
				images.BRICKGREEN,
				images.BRICKPURPLE,
				images.BRICKRED,
				images.BRICKYELLOW
			]

			this.enableBody = true;
			this.physicsBodyType = Phaser.Physics.ARCADE;
			for (var rowIndex = 0; rowIndex < this.numRows; rowIndex++) {
				var img = brickImage[rowIndex];
				for (var colIndex = 0; colIndex < this.numCols; colIndex++) {
					var brick: Phaser.Sprite = this.create(0, 0, img);
					var bodyBrick = <Phaser.Physics.Arcade.Body>brick.body;
					bodyBrick.immovable = true;

					brick.x = brick.width * colIndex;
					brick.y = brick.height * rowIndex;
				}
			}
		}
	}
}