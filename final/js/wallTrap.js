function WallTrap(game, x, y, key, frame, player) {

  Phaser.Sprite.call(this, game, x, y, key, frame);
  this.game = game;
  this.player = player;
  this.anchor.set(0.5);
  this.scale.y = 2;

  game.physics.enable(this, Phaser.Physics.ARCADE);
 // this.body.gravity.y = 500;


}

WallTrap.prototype = Object.create(Phaser.Sprite.prototype);
WallTrap.prototype.constructor = WallTrap;

WallTrap.prototype.update = function() {
	this.hit = game.physics.arcade.overlap(this, this.player);
	if (this.hit) {
		game.state.start('GamePlay', true, false);
	}

}
