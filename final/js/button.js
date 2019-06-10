// button prefab constructor function
function Button(game, x, y, key, frame, player, mapLayer, box) {
  // call to Phaser.Sprite and spawn a new object in x, y position
  Phaser.Sprite.call(this, game, x, y, key, frame);
  // properties set up
  this.game = game;
  this.player = player;
  this.mapLayer = mapLayer;
  this.box = box;
  this.scale.setTo(0.5); // Make it smaller
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.immovable = true;
  this.body.setSize(100, 45, 20, 80); // adjust collision box
  this.sound = game.add.audio('button'); // click sound
  this.toggled = false; // check if button is toggled

}

Button.prototype = Object.create(Phaser.Sprite.prototype);
Button.prototype.constructor = Button;

Button.prototype.update = function() {
  this.hit = game.physics.arcade.overlap(this, this.player);
	game.physics.arcade.collide(this, this.mapLayer);
  // if this is not been toggled before then play sound only once
  if (this.hit && !this.toggled) {
    this.sound.play();
    this.toggled = true;
  }

}
