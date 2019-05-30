function Button(game, x, y, key, frame, player, mapLayer, box) {

  Phaser.Sprite.call(this, game, x, y, key, frame);
  this.game = game;
  this.player = player;
  this.mapLayer = mapLayer;
  this.box = box;

  this.scale.setTo(0.5); // Make it smaller
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.immovable = true;
  this.body.setSize(100, 45, 20, 80);
  //this.body.gravity.y = 3000;
}

Button.prototype = Object.create(Phaser.Sprite.prototype);
Button.prototype.constructor = Button;

Button.prototype.update = function() {
  this.hit = game.physics.arcade.overlap(this, this.player);
 // this.hit1 = game.physics.arcade.collide(this, this.player);
 // this.hit_box = game.physics.arcade.collide(this, this.box);
	game.physics.arcade.collide(this, this.mapLayer);

}
