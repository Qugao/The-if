// fog prefab constructor function
function Fog(game, x, y, key, frame) {
	// call to Phaser.Sprite and spawn a new object in x, y position
	Phaser.Sprite.call(this, game, x, y, key, frame);

	// properties set up
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.scale.setTo(5);
	this.body.velocity.x = 10;
}

Fog.prototype = Object.create(Phaser.Sprite.prototype);
Fog.prototype.constructor = Fog;

Fog.prototype.update = function() {

}
