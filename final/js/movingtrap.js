// movingtrap prefab constructor function
function movingtrap(game, x, y, key, frame, player, scale_y, scale_x, mapLayer) {
  // call to Phaser.Sprite and spawn a new object in x, y position
  Phaser.Sprite.call(this, game, x, y, key, frame);
  // properties set up
  this.game = game;
  this.player = player;
  this.mapLayer = mapLayer;
  this.scale.y = scale_y; // Scale its size
  this.scale.x = scale_x;
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.immovable = true;
  this.startMoving = false; // flag toggle for moving
  this.movingSpeed = 150; // give this a default moving speed
  this.sound = game.add.audio('step');
}

movingtrap.prototype = Object.create(Phaser.Sprite.prototype);
movingtrap.prototype.constructor = movingtrap;

movingtrap.prototype.update = function() {
    this.hit = game.physics.arcade.collide(this.player, this);
    this.hitGround = game.physics.arcade.collide(this, this.mapLayer);
    // if player is walking on the its surface game will play step sound effect
    if (this.hit && this.player.isWalking) {
      this.sound.play('',0,2,false,false); 
    } else {
      this.sound.stop(); // stop sound effect otherwise
    }

    // bouncing blocks
    if (this.startMoving) {
      // move into different direction when it hits ground
      if (this.hitGround) {
        this.body.velocity.y = -this.movingSpeed;
      }
      // if this is in the ground then make it moving up
      if (this.hitGround && this.y < 900) {
        this.body.velocity.y = this.movingSpeed;
      }
    }
}