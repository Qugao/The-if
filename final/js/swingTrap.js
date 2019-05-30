function SwingTrap(game, x, y, key, frame, player) {

  Phaser.Sprite.call(this, game, x, y, key, frame);
  this.game = game;
  this.player = player;
  this.speed = 1;
  this.reach = false;

  this.scale.setTo(0.5); 
  this.anchor.set(0.5);
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.pivot.x = 500;	// Give trap 3 a pivot point that it can rotated around
  this.angle = -180;	// Set up started angle from down direction
  this.body.setSize(180, 180, 30, 30);



}

SwingTrap.prototype = Object.create(Phaser.Sprite.prototype);
SwingTrap.prototype.constructor = SwingTrap;

SwingTrap.prototype.update = function() {
	this.hit = game.physics.arcade.overlap(this, this.player);

	if (this.angle >= 0 && this.reach == false) {
			// if trap reachs 0 degree then we stopped rotation and toggle the 'reach' swtich
			this.angle = 0;
			this.reach = true;
		} else {
			// otherwise we just keep increasing trap's angle until its reach 0 degree
			this.angle += this.speed;
		}
		// When 'reach' switch is toggled we need make this trap go back to its start postion
	if (this.reach == true) {
				// We keep decreasing its angle unitl it goes to 0 degrees
		this.angle -= 2 * this.speed;
				// If it goes beyond -180 then it will become -180 degree which is our started position
			if (this.angle <= 180 && this.angle >= 0) {
				this.angle = 180;
				this.reach = false;
			}
			
	}

	if (this.hit) {
		game.state.start('GamePlay', true, false);
	}
	
}
