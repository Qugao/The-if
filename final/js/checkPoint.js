function CheckPoint(game, x, y, key, frame, player, mapLayer) {

  Phaser.Sprite.call(this, game, x, y, key, frame);
  this.game = game;
  this.player = player;
  this.mapLayer = mapLayer;

  game.physics.enable(this, Phaser.Physics.ARCADE);
  //this.body.setSize(100, 90, 12, 60);
  this.body.gravity.y = 500;

}

CheckPoint.prototype = Object.create(Phaser.Sprite.prototype);
CheckPoint.prototype.constructor = CheckPoint;

CheckPoint.prototype.update = function() {
	this.hit = game.physics.arcade.overlap(this, this.player);
	game.physics.arcade.collide(this, this.mapLayer);

	if (this.hit) {
		updateCheckPoint(this.player);
		this.destroy();
		console.log("New CheckPoint: " + this.player.x);
	}

}
