'use strict';
// Team: Quan Gao, Bo Yang, NaxXin Lou
// Source: https://drive.google.com/file/d/1C5PZWEgVSOIt4hDRZJE1HgJHPFnuk2yS/view?usp=sharing
var game = new Phaser.Game(1280, 640, Phaser.AUTO);
var message;
var style = { font: '24px Helvetica', fill: '#FFF'};
var checkPoint_x = 400;
var music;
// MainMenu state
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {

		// Load tmp assest
		game.load.audio('bgm', 'assets/audio/bgm.mp3');
		game.load.image('ground', 'assets/img/Carrier_0001.png');
		game.load.image('box', 'assets/img/Box_Small_0003.png');
		game.load.image('ladder', 'assets/img/Ladder_Iron_0001.png');
		game.load.image('button', 'assets/img/Trap_Circle_0001.png');
		game.load.image('trap', 'assets/img/Wall_Trap_R_0001.png');
		game.load.image('trap2', 'assets/img/Trap_Circle_0003.png');
		game.load.image('spike', 'assets/img/Spikes_0003.png');
		game.load.image('item', 'assets/img/item.png',300, 300);
		game.load.spritesheet('hero', 'assets/img/hero.png',50 ,37);
	    game.load.tilemap('test', 'assets/map/t10.json', null, Phaser.Tilemap.TILED_JSON);
	},
	create: function() {
		message = game.add.text(game.world.centerX, game.world.centerY, "Press SPACEBAR to restart game\nArrow keys to move\nHold C to push and pull boxes", style);
		message.anchor.set(0.5);
	},
	update: function() {
        // jump to game play
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay', true, false);
		}
	}
}



// GameOver state
var GameOver = function(game) {};
GameOver.prototype = {
	create: function() {

	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay', true, false);
		}
	}
}

// GamePlay State
var GamePlay = function(game) {
	// Local varaibles
	this.SCALE = 3;
	this.MAX_X_VELOCITY = 500;	
	this.MAX_Y_VELOCITY = 2500;
	this.ACCELERATION = 400;
	this.DRAG = 1000;
	this.GRAVITY = 2600;
	this.JUMP_SPEED = -700;
	this.MAX_JUMPS = 3;
	this.speed = 1;
	this.reach = false;
 
};
GamePlay.prototype = {

	init: function() {

	},

	create: function() {
		// Set up game's physics properties
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.TILE_BIAS = 32;
		// play music
		music = new Phaser.Sound(game,'bgm',1, true);
		music.play();
		// Set up game map and background color
		game.stage.backgroundColor = "#e0e0e0";
		this.map = game.add.tilemap('test');
		this.map.addTilesetImage('ground', 'ground');
		this.map.setCollisionByExclusion([]); // Make map is able to collide with other objects
		this.mapLayer = this.map.createLayer('Tile Layer 1'); // Crate a map layer
		this.mapLayer.resizeWorld();

		// Check point set up
		this.checkPoint = this.add.sprite(1800, 945, 'item');
		game.physics.enable(this.checkPoint, Phaser.Physics.ARCADE); // Give it a physics property so it can collide with player
		this.checkPoint.body.gravity.y = 3000;

		// Ladder set up
		this.ladder = this.add.sprite(600, 345, 'ladder');
		this.ladder.scale.y = 3; // Scale its size
		game.physics.enable(this.ladder, Phaser.Physics.ARCADE);

		// Spikes trap set up
		this.spike = this.add.sprite(1200, 945, 'spike');
		game.physics.enable(this.spike, Phaser.Physics.ARCADE);
		this.spike.scale.x = 3; // Make this trap wider

		// Player Set up
		this.player = this.add.sprite(checkPoint_x, 963, 'hero', 0);
		// Add animations to player
		this.player.animations.add('run',[8, 9, 10, 11, 12], 8, true);
		this.player.animations.add('stand',[0,1,2,3], 4, true);
		this.player.animations.add('jump', [15, 16, 17, 18, 19, 20, 21, 22 ,23, 23, 23], 8, false);
		this.player.anchor.set(0.5); // Set player an anchor so it will flip from center
		this.player.scale.setTo(3); // Make size larger

		game.physics.enable(this.player, Phaser.Physics.ARCADE); // Give player physics property

		this.player.body.collideWorldBounds = true;
		this.player.body.maxVelocity.x = this.MAX_X_VELOCITY; // Limit its x, y velocity so player wont move too fast
		this.player.body.maxVelocity.y = this.MAX_Y_VELOCITY;
		this.player.body.drag.setTo(this.DRAG, 0);	// give player drag force so it will slide a little bit when player stopped moving
		this.player.body.setSize(18, 31, 15, 5); // Change player collision boxes
		this.player.body.gravity.y = 3000;

		// Box 1 set up
		this.box = this.add.sprite(2750, 533, 'box');
		this.box.anchor.set(0.5);
		// Box physics properties
		game.physics.enable(this.box, Phaser.Physics.ARCADE);
		this.box.body.maxVelocity.x = this.MAX_X_VELOCITY;
		this.box.body.maxVelocity.y = this.MAX_Y_VELOCITY;
		this.box.body.drag.setTo(this.DRAG, 0);
		this.box.body.collideWorldBounds = true;

		// Set up BOX 2 same as Box 1
		this.box_2 = this.add.sprite(980, 305, 'box');
		this.box_2.anchor.set(0.5);
		game.physics.enable(this.box_2, Phaser.Physics.ARCADE);
		this.box_2.body.maxVelocity.x = this.MAX_X_VELOCITY;
		this.box_2.body.maxVelocity.y = this.MAX_Y_VELOCITY;
		this.box_2.body.drag.setTo(this.DRAG, 0);
		this.box_2.body.gravity.y = 3000;
		this.box_2.body.collideWorldBounds = true;

		// Button set up
		this.button = this.add.sprite(2090, 800, 'button');
		this.button.scale.setTo(0.5); // Make it smaller
		game.physics.enable(this.button, Phaser.Physics.ARCADE);
		this.button.body.gravity.y = 3000;

		// Traps set up
		// Trap 1
		this.trap_1 = this.add.sprite(2200, 600, 'trap');
		this.trap_1.scale.setTo(0.9);
		game.physics.enable(this.trap_1, Phaser.Physics.ARCADE);
		this.trap_1.body.velocity.y = 0; 
		this.trap_1.body.immovable = true;
		this.trap_1.body.setSize(256, 80);
		// Trap 2
		this.trap_2 = this.add.sprite(2600, 600, 'trap');
		this.trap_2.scale.setTo(0.9);
		game.physics.enable(this.trap_2, Phaser.Physics.ARCADE);
		this.trap_2.body.velocity.y = 0;
		this.trap_2.body.setSize(256, 80);
		// Trap 3
		this.trap_3 = this.add.sprite(700, 600, 'trap2');
		this.trap_3.scale.setTo(0.5); 
		this.trap_3.anchor.set(0.5);
		game.physics.enable(this.trap_3, Phaser.Physics.ARCADE);
		this.trap_3.pivot.x = 300;	// Give trap 3 a pivot point that it can rotated around
		this.trap_3.angle = -180;	// Set up started angle from down direction
		this.trap_3.body.setSize(180, 180, 30, 30);


		// Make camera follow the player
		game.camera.follow(this.player);
	},


	update: function() {

		// Angle detector
		// Keep this trap's angle is in between -180 and 0 degree
		if (this.trap_3.angle >= 0 && this.reach == false) {
			// if trap reachs 0 degree then we stopped rotation and toggle the 'reach' swtich
			this.trap_3.angle = 0;
			this.reach = true;
		} else {
			// otherwise we just keep increasing trap's angle until its reach 0 degree
			this.trap_3.angle += this.speed;
		}
		// When 'reach' switch is toggled we need make this trap go back to its start postion
		if (this.reach == true) {
				// We keep decreasing its angle unitl it goes to 0 degrees
				this.trap_3.angle -= 2 * this.speed;
				// If it goes beyond -180 then it will become -180 degree which is our started position
				if (this.trap_3.angle <= 180 && this.trap_3.angle >= 0) {
					this.trap_3.angle = 180;
					this.reach = false;
				}
			
		}
		
		// Collision event for every objects
		var check = game.physics.arcade.collide(this.checkPoint, this.player);
		game.physics.arcade.collide(this.mapLayer, this.checkPoint);

		game.physics.arcade.collide(this.player, this.mapLayer);
		game.physics.arcade.collide(this.button, this.mapLayer);
		game.physics.arcade.collide(this.box, this.mapLayer);
		game.physics.arcade.collide(this.box_2, this.mapLayer);
		game.physics.arcade.collide(this.box, this.trap_1);

		var box_player = game.physics.arcade.collide(this.box, this.player);
		var button_player = game.physics.arcade.collide(this.button, this.player);

		game.physics.arcade.collide(this.trap_1, this.mapLayer);
		var t = game.physics.arcade.collide(this.trap_2, this.mapLayer);
		var a = game.physics.arcade.collide(this.trap_2, this.box); 

		var trap1_player = game.physics.arcade.collide(this.trap_1, this.player);
		var trap2_player = game.physics.arcade.collide(this.trap_2, this.player);
		var trap3_player = game.physics.arcade.collide(this.trap_3, this.player);
		var spike_player = game.physics.arcade.collide(this.spike, this.player);

		var onLadder = game.physics.arcade.overlap(this.player, this.ladder); 
		var box_2_player = game.physics.arcade.collide(this.box_2, this.player);

		// If player hit check point then we update the global varaible and use it for respawn position
		if (check) {
			console.log("new check point: " + this.checkPoint.x);
			checkPoint_x = this.checkPoint.x; // Update value
			this.checkPoint.destroy(); // make it disappear when player hitted button
		}
		// if Box that on the top of trap 2 hit the trap 2 then they all stop moving so they won't push each other out of the map
		if (a) {
			this.box.body.velocity.y = 0;
			this.trap_2.body.velocity.y = 0;
		}
		// Collision event for trap 2
		if (trap2_player) {
			// If player is pushing the box on the top of the trap then we need give gravity back to box
			if (this.player.body.touching.left || this.player.body.touching.right) {
				this.box.body.gravity.y = 100;
			}
			// Make sure trap is not moving
			this.trap_2.body.velocity.x = 0;
			this.trap_2.body.immovable = true;
			// If player hit the buttom of the trap then player dies
			if (this.player.body.touching.up) {
				console.log("dead");
				game.state.start('GamePlay', true, false); // restart game from check point
				music.stop(); // stop music so it wont overlap
			}
		}
		// If player hit the buttom of the trap then player dies
		if (trap1_player && this.player.body.touching.up) {
				console.log("dead");
				game.state.start('GamePlay', true, false);
				music.stop();
		}
		// If player hit the trap then player dies
		if (trap3_player) {
				console.log("dead");
				game.state.start('GamePlay', true, false);
				music.stop();
		}
		// If player hit the trap then player dies
		if (spike_player) {
				console.log("dead");
				game.state.start('GamePlay', true, false);
				music.stop();
		}
		// If player hit the button then active trap 2
		if (button_player) {
			console.log("Trap drop");
			// trap 2 and box drop from the sky
			this.trap_1.body.velocity.y = 100;
			this.trap_2.body.velocity.y = 50;
			this.box.body.velocity.y = 50;
			this.button.destroy(); // make button disappear
		}

		// detect if player is overlapped with ladder
		if (onLadder) {
			// if player overlapped the ladder then player should not be effected by gravity anymore
			this.player.body.gravity.y = 0;
			this.player.body.velocity.y = 0;
			// Player can climb straight up or down when press the UP, DOWN arrow keys
			if(this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
				this.player.body.velocity.y = this.JUMP_SPEED;
			}
			if(this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
				this.player.body.velocity.y = -this.JUMP_SPEED;
			}
		} else {
			// if player is not on the ladder then he should be effected by gravity
			this.player.body.gravity.y = 3000;
		}

		// Pushing event for player and box
		// Player need hold C key and move to pull or push the boxes
		//						If player stand on the box then it should not be consider as pushing
		if (box_player && this.input.keyboard.isDown(Phaser.Keyboard.C) && !this.box.body.touching.up) {
			//	Player and boxes moving together 
			if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				this.player.body.velocity.x = -150;
				this.box.body.velocity.x = -300;
			} else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				this.player.body.velocity.x = 150;
				this.box.body.velocity.x = 300;
			} else {
				this.player.body.acceleration.x = 0; // IF no key pressed then they both should not be moving
				this.box.body.acceleration.x = 0;
			}
		}

		// Same as above but this is for box 2
		if (box_2_player && this.input.keyboard.isDown(Phaser.Keyboard.C) && !this.box_2.body.touching.up) {
			if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				this.player.body.velocity.x = -150;
				this.box_2.body.velocity.x = -300;
			} else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				this.player.body.velocity.x = 150;
				this.box_2.body.velocity.x = 300;
			} else {
				this.player.body.acceleration.x = 0;
				this.box_2.body.acceleration.x = 0;
			}
		}

		// If player is not pushing then box should not move and player moves only
		if (!box_player || !this.input.keyboard.isDown(Phaser.Keyboard.C)) {
			this.box.body.acceleration.x = 0; // Make box not moving
			this.box.body.immovable = true;
			if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				this.player.body.acceleration.x = -this.ACCELERATION;
				this.player.scale.x = -3; // Flip player accroding to left, right direction
				this.player.animations.play('run'); // Playe the running animation while running
			} else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				this.player.body.acceleration.x = this.ACCELERATION;
				this.player.scale.x = 3;
				this.player.animations.play('run');
			} else {
				this.player.body.acceleration.x = 0;
				this.player.animations.play('stand'); // play standing animation when player is not moving
			}
		}

		// Grounded detector
		this.isGrounded = this.player.body.blocked.down;

	    if(this.isGrounded || box_player) {
	    	this.player.body.setSize(18, 31, 15, 5); // IF player is grounded then he should have normal collision box
	    	this.jumps = this.MAX_JUMPS; // Triple jump counter
	    	this.jumping = false; // Jump toggle switch
	    } else {
	    	this.player.animations.play('jump'); // if not grounded then play jumping animations
	    }
	    // allow steady velocity change up to a certain key down duration
	    if(this.jumps > 0 && this.input.keyboard.downDuration(Phaser.Keyboard.UP, 150)) {
	    	this.player.body.setSize(18, 20, 15, 15);	// Player have smaller collision box when jumping
	        this.player.body.velocity.y = this.JUMP_SPEED;
	        this.jumping = true;
	    } 
	    // finally, letting go of the UP key subtracts a jump
	    if(this.jumping && this.input.keyboard.upDuration(Phaser.Keyboard.UP)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }
			
			

	},

	// debug
	render: function() {

	}

}

// add states
game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
// start game at main menu state
game.state.start('MainMenu');
