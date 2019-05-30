function Player(game, x, y, key, frame) {

	Phaser.Sprite.call(this, game, x, y, key, frame);
	this.game = game;

  this.animations.add('run',[12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], 8, true);
  this.animations.add('stand',[0,1,2,3,4,5,6,7,8,9,10,11], 10, true);
  this.animations.add('jump', [25, 26, 27, 28, 29, 30, 31, 32 , 33, 34, 35, 36, 37, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38], 15, false);
  this.anchor.set(0.5); // Set player an anchor so it will flip from center
 //this.scale.setTo(1); // Make size larger

  game.physics.enable(this, Phaser.Physics.ARCADE); // Give player physics property

  this.body.collideWorldBounds = true;
  this.body.drag.setTo(1000, 0);  // give player drag force so it will slide a little bit when player stopped moving
  this.body.setSize(45, 120, 55, 50); // Change player collision boxes


}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
      this.body.gravity.y = 1200;
      if(this.body.blocked.down || this.body.touching.down) {
        this.jumping = false; // Jump toggle switch
      } else {
        this.animations.play('jump', false);
      }

      if (this.body.touching.down || this.body.blocked.down) {
        if(game.input.keyboard.justPressed(Phaser.Keyboard.UP)) {
         //   this.body.setSize(18, 20, 15, 15);
            this.body.velocity.y = -600;
            //this.body.velocity.x = 300;
            this.jumping = true;
            this.animations.play('jump', false);
        }
      }

      if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.body.velocity.x = -300;
        this.scale.x = -1; // Fip player accroding to left, right direction
        if(this.body.blocked.down || this.body.touching.down) {
          this.animations.play('run');
        } // Playe the running animation while running
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.body.velocity.x = 300;
        this.scale.x = 1;
        if(this.body.blocked.down || this.body.touching.down) {
          this.animations.play('run');
        }
      } else {
        this.body.acceleration.x = 0;

        if(this.body.blocked.down || this.body.touching.down) {
          this.animations.play('stand');
        } // play standing animation when player is not moving
      }

      if(game.input.keyboard.justPressed(Phaser.Keyboard.P)) {
          console.log(this.body.gravity.y);
      }
}
