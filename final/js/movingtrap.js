function movingtrap(game, x, y, key, frame, player, scale_y, scale_x, mapLayer) {

  Phaser.Sprite.call(this, game, x, y, key, frame);
  this.game = game;
  this.player = player;
  this.mapLayer = mapLayer;

  this.scale.y = scale_y; // Scale its size
  this.scale.x = scale_x;
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.immovable = true;
  this.startMoving = false;
  this.movingSpeed = 150;
 // this.body.velocity.y = velocity;
}

movingtrap.prototype = Object.create(Phaser.Sprite.prototype);
movingtrap.prototype.constructor = movingtrap;

movingtrap.prototype.update = function() {
    this.hit = game.physics.arcade.collide(this.player, this);
    this.hitGround = game.physics.arcade.collide(this, this.mapLayer);

    if (this.startMoving) {
      if (this.hitGround) {
        this.body.velocity.y = -this.movingSpeed;
      }

      if (this.hitGround && this.y < 900) {
        this.body.velocity.y = this.movingSpeed;
      }
    }
}