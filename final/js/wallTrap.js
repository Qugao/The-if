// groundtrap prefab constructor function
function WallTrap(game, x, y, key, frame, player) {
  // call to Phaser.Sprite and spawn a new object in x, y position
  Phaser.Sprite.call(this, game, x, y, key, frame);
  // properties set up
  this.game = game;
  this.player = player;
  this.anchor.set(0.5);
  this.scale.y = 2;

  game.physics.enable(this, Phaser.Physics.ARCADE);

}

WallTrap.prototype = Object.create(Phaser.Sprite.prototype);
WallTrap.prototype.constructor = WallTrap;

WallTrap.prototype.update = function() {
	this.hit = game.physics.arcade.overlap(this, this.player);
  // if player hit this object then he will be killed and start a new game
	if (this.hit) {
		game.camera.fade(0x000000, 1000);
    this.player.body.moves = false;
	}

}
