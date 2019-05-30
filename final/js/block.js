function Block(game, x, y, key, frame, player) {

  Phaser.Sprite.call(this, game, x, y, key, frame);
  this.game = game;
  this.player = player;

  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.immovable = true;
  this.body.tilePadding.x=32;
  this.body.tilePadding.y=32;
//  this.body.setSize(250, 20, 2, 40);

}

Block.prototype = Object.create(Phaser.Sprite.prototype);
Block.prototype.constructor = Block;

Block.prototype.update = function() {
	this.hit = game.physics.arcade.collide(this, this.player);
	if (this.hit && this.player.body.touching.up) {
		game.state.start('GamePlay', true, false);
	}
}
