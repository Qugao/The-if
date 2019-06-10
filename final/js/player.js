// player prefab constructor function
function Player(game, x, y, key, frame) {
  // call to Phaser.Sprite and spawn a new object in x, y position  
	Phaser.Sprite.call(this, game, x, y, key, frame);
  // properties set up
	this.game = game;
  // add animations
  this.animations.add('run',[12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], 8, true);
  this.animations.add('stand',[0,1,2,3,4,5,6,7,8,9,10,11], 10, true);
  this.animations.add('jump', [25, 26, 27, 28, 29, 30, 31, 32 , 33, 34, 35, 36, 37, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38], 15, false);
  this.anchor.set(0.5); // Set player an anchor so it will flip from center

  game.physics.enable(this, Phaser.Physics.ARCADE); // Give player physics property

  this.body.collideWorldBounds = true;
  this.body.drag.setTo(1000, 0);  // give player drag force so it will slide a little bit when player stopped moving
  this.body.setSize(45, 120, 55, 50); // Change player collision boxes
  // add sound effect
  this.sound = game.add.audio('step');
  this.jumpSound = game.add.audio('jump');
  // detect user input
  this.cursors = this.game.input.keyboard.createCursorKeys();

}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
      // make sure player's gravity is same
      this.body.gravity.y = 1100;

      // detect if player is walking then play the foot step sound effect
      if (this.body.onFloor() && this.isWalking) {
        this.sound.play('',0,2,false,false); 
      } else {
        this.sound.stop();
      }

      // if player's down direction is blocked or touched then player consider as standing in the ground
      if (this.body.blocked.down || this.body.touching.down) {
        this.jumping = false; // Jump toggle switch
      } else {
        this.animations.play('jump', false); // otherwise play jump animation
      }

      if (this.body.blocked.down || this.body.touching.down) {
        // make player jump when player press up
        if (game.input.keyboard.justPressed(Phaser.Keyboard.UP)) {
            this.jumpSound.play();
            this.body.velocity.y = -600;
            this.jumping = true; // toggle jump switch so player can only jump once
            this.isWalking = false; // switch off walking switch
        }
      }
      // walking
      // left
      if (this.cursors.left.isDown) {
        this.body.velocity.x = -300;
        this.scale.x = -1; 

        if(this.body.blocked.down || this.body.touching.down) {
          this.animations.play('run');
          this.isWalking = true; // tell game player is walking
        } 
      // right  
      } else if (this.cursors.right.isDown) {
        this.body.velocity.x = 300;
        this.scale.x = 1;

        if(this.body.blocked.down || this.body.touching.down) {
          this.animations.play('run');
          this.isWalking = true;
        }
      // stand
      } else {
        this.body.acceleration.x = 0;

        if(this.body.blocked.down || this.body.touching.down) {
          this.animations.play('stand');
          this.isWalking = false; // stand is not considered as walking
        } 
      }

}
