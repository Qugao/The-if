function circleTrap(game, x, y, key, frame, player) {

  Phaser.Sprite.call(this, game, x, y, key, frame);
  this.game = game;
  this.player = player;
  this.speed = 1;
  this.reach = false;

  this.scale.x=0.7;
  this.scale.y=0.7;
  this.anchor.set(0.5);
  game.physics.enable(this, Phaser.Physics.ARCADE);


}

circleTrap.prototype = Object.create(Phaser.Sprite.prototype);
circleTrap.prototype.constructor = circleTrap;

circleTrap.prototype.update = function() {
	this.hit = game.physics.arcade.overlap(this, this.player);

	if (this.hit) {
		game.state.start('GamePlay', true, false);
	}
	this.angle += 2;
}