function GroundTrap(game, x, y, key, frame, player) {

  Phaser.Sprite.call(this, game, x, y, key, frame);
  this.game = game;
  this.player = player;

  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(100, 90, 12, 60);

}

GroundTrap.prototype = Object.create(Phaser.Sprite.prototype);
GroundTrap.prototype.constructor = GroundTrap;

GroundTrap.prototype.update = function() {
	this.hit = game.physics.arcade.overlap(this, this.player);

	if (this.hit) {
		game.state.start('GamePlay', true, false);
	}

}
