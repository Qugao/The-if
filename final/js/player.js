function Player(game, x, y, key, frame) {

	Phaser.Sprite.call(this, game, x, y, key, frame);
	this.game = game;

  this.animations.add('run',[8, 9, 10, 11, 12], 8, true);
  this.animations.add('stand',[0,1,2,3], 4, true);
  this.animations.add('jump', [15, 16, 17, 18, 19, 20, 21, 22 ,23, 23, 23], 8, true);
  this.anchor.set(0.5); // Set player an anchor so it will flip from center
  this.scale.setTo(3); // Make size larger

  game.physics.enable(this, Phaser.Physics.ARCADE); // Give player physics property

  this.body.collideWorldBounds = true;
  this.body.drag.setTo(1000, 0);  // give player drag force so it will slide a little bit when player stopped moving
  this.body.setSize(18, 31, 15, 5); // Change player collision boxes
  this.body.gravity.y = 500;


}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
      if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.body.velocity.x = -300;
        this.scale.x = -3; // Fip player accroding to left, right direction
        this.animations.play('run'); // Playe the running animation while running
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.body.velocity.x = 300;
        this.scale.x = 3;
        this.animations.play('run');
      } else {
        this.body.acceleration.x = 0;
        this.animations.play('stand'); // play standing animation when player is not moving
      }

      if(this.body.blocked.down) {
        this.body.setSize(18, 31, 15, 5); // IF player is grounded then he should have normal collision box
        this.jumps = 3; // Triple jump counter
        this.jumping = false; // Jump toggle switch
      } else {
        this.animations.play('jump', true);
      }

      if (this.jumps > 0) {
        if(game.input.keyboard.justPressed(Phaser.Keyboard.UP)) {
            this.body.setSize(18, 20, 15, 15);
            this.body.velocity.y = -1200;
            //this.body.velocity.x = 300;
            this.jumping = true;
            this.animations.play('jump', true);
            this.jumps--;
        }
      }

      if(game.input.keyboard.justPressed(Phaser.Keyboard.P)) {
          console.log(this.jumps);
      }
}
