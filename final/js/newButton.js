// button prefab constructor function
function newButton(game, x, y, key, frame, player, mapLayer, big_box) {
  // call to Phaser.Sprite and spawn a new object in x, y position
  Phaser.Sprite.call(this, game, x, y, key, frame);
  // properties set up
  this.game = game;
  this.player = player;
  this.mapLayer = mapLayer;
  this.big_box = big_box;
  this.scale.setTo(0.5); // Make it smaller
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.immovable = true;
  this.toggled = false;
  this.sound = game.add.audio('button');
  this.body.setSize(50, 50, 85, 40); // change collision box
}

newButton.prototype = Object.create(Phaser.Sprite.prototype);
newButton.prototype.constructor = newButton;

newButton.prototype.update = function() {
  // collision with different sprites
  this.hit = game.physics.arcade.overlap(this, this.player);
  this.hit1 = game.physics.arcade.collide(this, this.player);
  this.hit2 = game.physics.arcade.collide(this, this.big_box);
  game.physics.arcade.collide(this, this.mapLayer);
  // play sound only once
  if (this.hit && !this.toggled) {
    this.sound.play();
    this.toggled = true;
  }

  if (this.hit1 && !this.toggled) {
    this.sound.play();
    this.toggled = true;
  }

  if (this.hit2 && !this.toggled) {
    this.sound.play();
    this.toggled = true;
  }

}