// groundtrap prefab constructor function
function GroundTrap(game, x, y, key, frame, player) {
  // call to Phaser.Sprite and spawn a new object in x, y position
  Phaser.Sprite.call(this, game, x, y, key, frame);
  // properties set up
  this.game = game;
  this.player = player;

  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(100, 90, 30, 70); // adjust collision box

}

GroundTrap.prototype = Object.create(Phaser.Sprite.prototype);
GroundTrap.prototype.constructor = GroundTrap;

GroundTrap.prototype.update = function() {
	this.hit = game.physics.arcade.overlap(this, this.player);
	// if player hit this object then he will be killed and start a new game
	if (this.hit) {
		game.camera.fade(0x000000, 1000); // fade in a black screen
		this.player.body.moves = false;
	}

}
