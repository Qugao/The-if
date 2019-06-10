// rope prefab constructor function
function Rope(game, x, y, key, frame, player) {
  // call to Phaser.Sprite and spawn a new object in x, y position
  Phaser.Sprite.call(this, game, x, y, key, frame);
  // properties set up
  this.game = game;
  this.player = player;
  this.speed = 0.5;
  this.reach = false;
  this.scale.y = 1; // make rope longer
  this.anchor.set(0.5);
  game.physics.enable(this, Phaser.Physics.ARCADE);

}

Rope.prototype = Object.create(Phaser.Sprite.prototype);
Rope.prototype.constructor = Rope;

Rope.prototype.update = function() {
	// same as ladder take care player's behavior when player is climbing rope
	this.isClimbing = game.physics.arcade.overlap(this, this.player);
	// reset player's velocity and gravity to 0 so player wont slide away from rope
	if (this.isClimbing) {
		this.player.body.velocity.y = 0;
		this.player.body.velocity.x = 0;
		this.player.body.gravity.y = 0;
		// allow player to climb up and down in the rope
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
