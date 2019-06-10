// check point prefab constructor function
function CheckPoint(game, x, y, key, frame, player, mapLayer) {
  // call to Phaser.Sprite and spawn a new object in x, y position
  Phaser.Sprite.call(this, game, x, y, key, frame);
  // properties set up
  this.game = game;
  this.player = player;
  this.mapLayer = mapLayer;
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.gravity.y = 500;
  this.check = game.add.audio('check'); // check sound effect

}

CheckPoint.prototype = Object.create(Phaser.Sprite.prototype);
CheckPoint.prototype.constructor = CheckPoint;

CheckPoint.prototype.update = function() {
	this.hit = game.physics.arcade.overlap(this, this.player);
	game.physics.arcade.collide(this, this.mapLayer);

	// if this is hitted by player then update checkpoint x,y global varaible to this checkpoint's x,y
	if (this.hit) {
		updateCheckPoint(this.player); // call update function to update spawn location
		this.body.velocity.y = -100; // move up a little bit
		this.body.enable = false; // make sure this check point wont be touch again 
		this.check.play(); // play the sound
		game.add.tween(this).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 1, 2000, true); // make this check point flashing
		console.log("New CheckPoint: " + this.player.x);
	}

}
