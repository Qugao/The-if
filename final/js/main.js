'use strict';
// Team: Quan Gao, Bo Yang, NaiXin Lou
// Source: https://drive.google.com/file/d/1C5PZWEgVSOIt4hDRZJE1HgJHPFnuk2yS/view?usp=sharing
// Git: https://github.com/VanquishGQ/First_Prototype_1
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
		game.load.image('button', 'assets/img/Button.png');
		game.load.image('trap', 'assets/img/Wall_Trap_R_0001.png');
		game.load.image('trap2', 'assets/img/Trap_Circle_0003.png');
		game.load.image('spike', 'assets/img/Spikes_0003.png');
		game.load.image('item', 'assets/img/item.png',300, 300);
		game.load.spritesheet('hero', 'assets/img/hero.png',50 ,37);
	    game.load.tilemap('test', 'assets/map/t10.json', null, Phaser.Tilemap.TILED_JSON);

	    game.load.image('swingTrap', 'assets/img/SwingTrap.png');
	    game.load.image('block', 'assets/img/Block.png');
	    game.load.image('rope', 'assets/img/Rope.png');
	    game.load.image('wallTrap', 'assets/img/WallTrap.png');
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
	this.player;
	this.box;
	this.box2;
	this.groundTrap;
 
};
GamePlay.prototype = {

	init: function() {

	},

	create: function() {
		// Set up game's physics properties
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.TILE_BIAS = 32;
		// play music
		//music = new Phaser.Sound(game,'bgm',1, true);
		//music.play();
		// Set up game map and background color
		game.stage.backgroundColor = "#e0e0e0";
		this.map = game.add.tilemap('test');
		this.map.addTilesetImage('ground', 'ground');
		this.map.setCollisionByExclusion([]); // Make map is able to collide with other objects
		this.mapLayer = this.map.createLayer('Tile Layer 1'); // Crate a map layer
		this.mapLayer.resizeWorld();

		this.player = new Player(game, 5800, 363, 'hero', 0); // add player to game
		game.add.existing(this.player);

		this.ladder = new Ladder(game, 600, 345, 'ladder', 0, this.player); // add player to game
		game.add.existing(this.ladder);

		this.box = new Box(game, 980, 305, 'box', 0, this.player); // add player to game
		game.add.existing(this.box);

		this.swingTrap = new SwingTrap(game, 800, 470, 'trap2', 0, this.player); // add player to game
		game.add.existing(this.swingTrap);


		this.groundTrap = new GroundTrap(game, 900, 930, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap);

		this.groundTrap2 = new GroundTrap(game, 1000, 930, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap2);
/*
		this.button = this.add.sprite(2090, 800, 'button');
		this.button.scale.setTo(0.5); // Make it smaller
		game.physics.enable(this.button, Phaser.Physics.ARCADE);
		this.button.body.gravity.y = 3000;
*/
		this.button = new Button(game, 2090, 800, 'button', 0, this.player); // add player to game
		game.add.existing(this.button);

		this.droppingBlock = new Block(game, 2000, 400, 'block', 0, this.player); // add player to game
		game.add.existing(this.droppingBlock);

		this.droppingBlock2 = new Block(game, 2400, 600, 'block', 0, this.player); // add player to game
		game.add.existing(this.droppingBlock2);

		this.box2 = new Box(game, 2500, 100, 'box', 0, this.player); // add player to game
		game.add.existing(this.box2);
		this.box2.body.gravity.y = 0;

		this.groundTrap3 = new GroundTrap(game, 5000, 930, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap3);

		this.groundTrap4 = new GroundTrap(game, 5100, 930, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap4);

		this.groundTrap5 = new GroundTrap(game, 5200, 930, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap5);
		
		this.groundTrap6 = new GroundTrap(game, 5300, 930, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap6);

		this.rope = new Rope(game, 4700, 300, 'rope', 0, this.player); // add player to game
		game.add.existing(this.rope);

		this.rope2 = new Rope(game, 4900, 300, 'rope', 0, this.player); // add player to game
		game.add.existing(this.rope2);

		this.rope3 = new Rope(game, 5100, 300, 'rope', 0, this.player); // add player to game
		game.add.existing(this.rope3);

		this.rope4 = new Rope(game, 5300, 300, 'rope', 0, this.player); // add player to game
		game.add.existing(this.rope4);

		this.rope5 = new Rope(game, 4500, 300, 'rope', 0, this.player); // add player to game
		game.add.existing(this.rope5);

		this.wallTrap = new WallTrap(game, 6000, 800, 'wallTrap', 0, this.player); // add player to game
		game.add.existing(this.wallTrap);

		this.wallTrap2 = new WallTrap(game, 8400, 800, 'wallTrap', 0, this.player); // add player to game
		game.add.existing(this.wallTrap2);
		this.wallTrap2.scale.x = -1;

		this.button3 = new Button(game, 6400, 800, 'button', 0, this.player, this.mapLayer); // add player to game
		game.add.existing(this.button3);

		this.box3 = new Box(game, 6600, 400, 'box', 0, this.player); // add player to game
		game.add.existing(this.box3);
		this.box3.body.gravity.y = 0;

		this.button4 = new Button(game, 7000, 800, 'button', 0, this.player, this.mapLayer); // add player to game
		game.add.existing(this.button4);

		this.box4 = new Box(game, 7200, 400, 'box', 0, this.player); // add player to game
		game.add.existing(this.box4);
		this.box4.body.gravity.y = 0;

		this.button5 = new Button(game, 7600, 800, 'button', 0, this.player, this.mapLayer); // add player to game
		game.add.existing(this.button5);

		this.box5 = new Box(game, 7800, 400, 'box', 0, this.player); // add player to game
		game.add.existing(this.box5);
		this.box5.body.gravity.y = 0;

		


		game.camera.follow(this.player);

		
	},


	update: function() {
		game.physics.arcade.collide(this.player, this.mapLayer);
		game.physics.arcade.collide(this.box, this.mapLayer);
		game.physics.arcade.collide(this.box3, this.mapLayer);
		game.physics.arcade.collide(this.box4, this.mapLayer);
		game.physics.arcade.collide(this.box5, this.mapLayer);
		game.physics.arcade.collide(this.button, this.mapLayer);
		game.physics.arcade.collide(this.droppingBlock2, this.mapLayer);
		game.physics.arcade.collide(this.droppingBlock2, this.box2);
		game.physics.arcade.collide(this.droppingBlock2, this.player);
		game.physics.arcade.collide(this.mapLayer, this.box2);
		game.physics.arcade.collide(this.mapLayer, this.wallTrap);
		game.physics.arcade.collide(this.mapLayer, this.wallTrap2);

		game.physics.arcade.collide(this.box3, this.box4);
		game.physics.arcade.collide(this.box4, this.box5);
		game.physics.arcade.collide(this.box5, this.box3);

		game.physics.arcade.collide(this.wallTrap, this.box3);
		game.physics.arcade.collide(this.wallTrap2, this.box3);

		if (this.button.hit) {
			this.droppingBlock.body.velocity.y = 900;
			this.droppingBlock2.body.velocity.y = 750;
			this.box2.body.gravity.y = 3000;
			this.button.destroy();
		}

		if (this.button3.hit) {
			this.box3.body.gravity.y = 1000;
			this.button3.destroy();
		}

		if (this.button4.hit) {
			this.box4.body.gravity.y = 1000;
			this.button4.destroy();
		}

		if (this.button5.hit) {
			this.box5.body.gravity.y = 1000;
			this.button5.destroy();
		}

		if (this.player.body.x >= 6100 && this.player.body.x <= 8400 && this.player.body.y <= 970) {
			this.wallTrap2.body.moves = true;
			this.wallTrap.body.moves = true;
			this.wallTrap.body.velocity.x = 50;
			this.wallTrap2.body.velocity.x = -50;
		} else {
			this.wallTrap2.body.moves = false;
			this.wallTrap.body.moves = false;
		}




	},

	// debug
	render: function() {
		game.debug.bodyInfo(this.player, 32, 32);
		game.debug.body(this.player);
		game.debug.body(this.swingTrap);
		game.debug.body(this.groundTrap);
		game.debug.body(this.droppingBlock2);
		game.debug.body(this.rope);

		game.debug.bodyInfo(this.box2, 32, 128);
	}

}

// add states
game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
// start game at main menu state
game.state.start('MainMenu');
