// snow prefab constructor function
function Snow(game, key, frame, scale, rotation) {
	// call to Phaser.Sprite and spawn a new object in random x, y position
	Phaser.Sprite.call(this, game, game.rnd.integerInRange(0,game.width), game.rnd.integerInRange(0,game.height-61), key, frame);

	// properties set up
	this.anchor.set(0.5);
	this.scale.x = scale;
	this.scale.y = scale;
	this.rotation = rotation;
	// transparent
	this.alpha = 0.5;
	// set up physics property
	game.physics.enable(this);
	this.physicsBodyType = Phaser.Physics.ARCADE;
	// make flake rotate
	this.body.angularVelocity = Math.random() * 180;
	// use gravity and velocity make flake drop
	this.body.gravity.y = Math.random() * 50;	
	this.body.gravity.x = Math.random() * 50;
	this.body.velocity.y = Math.random() * 100;
    this.body.velocity.x = Math.random() * 100;
    // make this object able to detect world bounds
	this.checkWorldBounds = true;
	// if out of world bounds then call out function
	this.events.onOutOfBounds.add(out, this);
}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Snow)
Snow.prototype = Object.create(Phaser.Sprite.prototype);
Snow.prototype.constructor = Snow;

// override Phaser.Sprite update to flip its direction when press R button
Snow.prototype.update = function() {
	if(game.input.keyboard.justPressed(Phaser.Keyboard.R)) {
		this.body.velocity.x = this.body.velocity.x * -1;
	}
}

function out(snow) {
	// send snow to opposite side and reset its velocity
    this.x = game.width - this.x;
    this.y = game.height - this.y;
    this.body.velocity.y = Math.random() * 100;
    this.body.velocity.x = Math.random() * 100;
}