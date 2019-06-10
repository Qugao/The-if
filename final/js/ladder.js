// groundtrap prefab constructor function
function Ladder(game, x, y, key, frame, player) {
  // call to Phaser.Sprite and spawn a new object in x, y position
  Phaser.Sprite.call(this, game, x, y, key, frame);
  // properties set up
  this.game = game;
  this.player = player;

  this.scale.y = 3; // Scale its size
  game.physics.enable(this, Phaser.Physics.ARCADE);

}

Ladder.prototype = Object.create(Phaser.Sprite.prototype);
Ladder.prototype.constructor = Ladder;

Ladder.prototype.update = function() {
	this.isClimbing = game.physics.arcade.overlap(this, this.player);
	// take care player's behavior when player is climbing ladder
	if (this.isClimbing) {
		// reset player's velocity and gravity to 0 so he wont falling
		this.player.body.velocity.y = 0;
		this.player.body.gravity.y = 0;
		// allow player to climb up and down in the ladder
		if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			this.player.body.velocity.y = -700;
		}

		if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
			this.player.body.velocity.y = 700;
		}

	} else {
		this.player.body.gravity.y = 1100; // reset player's gravity when he left the ladder
	}
}
