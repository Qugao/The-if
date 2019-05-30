function Rope(game, x, y, key, frame, player) {

  Phaser.Sprite.call(this, game, x, y, key, frame);
  this.game = game;
  this.player = player;
  this.speed = 0.5;
  this.reach = false;

  this.scale.y = 1;
  this.anchor.set(0.5);
  game.physics.enable(this, Phaser.Physics.ARCADE);
  //this.pivot.x = 500;	// Give trap 3 a pivot point that it can rotated around
  //this.angle = -90;	// Set up started angle from down direction
  //this.body.setSize(180, 180, 30, 30);



}

Rope.prototype = Object.create(Phaser.Sprite.prototype);
Rope.prototype.constructor = Rope;

Rope.prototype.update = function() {
	this.isClimbing = game.physics.arcade.overlap(this, this.player);

	if (this.isClimbing) {
		this.player.body.velocity.y = 0;
		this.player.body.velocity.x = 0;
		this.player.body.gravity.y = 0;

		if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			this.player.body.velocity.y = -700;
		}

		if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
			this.player.body.velocity.y = 700;
		}
	} else {
		this.player.body.gravity.y = 300;
		this.player.jumps = 3;
	}
}
