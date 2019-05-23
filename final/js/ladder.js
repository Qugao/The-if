function Ladder(game, x, y, key, frame, player) {

  Phaser.Sprite.call(this, game, x, y, key, frame);
  this.game = game;
  this.player = player;

  this.scale.y = 3; // Scale its size
  game.physics.enable(this, Phaser.Physics.ARCADE);

}

Ladder.prototype = Object.create(Phaser.Sprite.prototype);
Ladder.prototype.constructor = Ladder;

Ladder.prototype.update = function() {
	this.isClimbing = game.physics.arcade.overlap(this, this.player);

	if (this.isClimbing) {
		this.player.body.velocity.y = 0;
		this.player.body.gravity.y = 0;

		if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			this.player.body.velocity.y = -700;
		}

		if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
			this.player.body.velocity.y = 700;
		}
	} else {
		this.player.body.gravity.y = 3000;
	}
}
