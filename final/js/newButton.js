function newButton(game, x, y, key, frame, player, mapLayer, big_box) {

  Phaser.Sprite.call(this, game, x, y, key, frame);
  this.game = game;
  this.player = player;
  this.mapLayer = mapLayer;
  this.big_box = big_box;
  this.scale.setTo(0.5); // Make it smaller
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.immovable = true;
  this.body.setSize(50, 50, 85, 40);
  //this.body.gravity.y = 3000;
}

newButton.prototype = Object.create(Phaser.Sprite.prototype);
newButton.prototype.constructor = newButton;

newButton.prototype.update = function() {
  this.hit = game.physics.arcade.overlap(this, this.player);
  this.hit1 = game.physics.arcade.collide(this, this.player);
  this.hit2 = game.physics.arcade.collide(this, this.big_box);
  game.physics.arcade.collide(this, this.mapLayer);

}