'use strict';
// Team: Quan Gao, Bo Yang, NaiXin Lou
// Git: https://github.com/VanquishGQ/The-if

var game = new Phaser.Game(1280, 680, Phaser.AUTO); // Game window size
var message; // Message varaible
var tMessage // tutorial message
var style = { font: '24px Helvetica', fill: '#FFF'}; // Text style
var music;
// these varaible are used to move button fall into the ground when it is triggered
var z;
var z1;
var z2;
var z3;
var z4;
var z5;
var z6;
var z7;
var z8;
// global x, y location for player's spawning point
var checkPoint_x = 400;
var checkPoint_y = 1263;
// timer varaibles
var total = 0;
var timer;

// MainMenu state
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {

		// Load tmp assest
		// Aduio
		game.load.audio('bgm', 'assets/audio/bgm.mp3');
		game.load.audio('step', 'assets/audio/footStep.mp3');
		game.load.audio('check', 'assets/audio/check.mp3');
		game.load.audio('jump', 'assets/audio/jump.wav');
		game.load.audio('push', 'assets/audio/push1.mp3');
		game.load.audio('button', 'assets/audio/button.mp3');
		game.load.audio('chain', 'assets/audio/chain.wav');

		// image and spritesheet
		game.load.image('ground', 'assets/img/ground.png');
		game.load.image('b', 'assets/img/background.jpg');
		game.load.image('box', 'assets/img/Box_Small_0003.png');
		game.load.image('Big_box', 'assets/img/Box_Large_0001.png');
		game.load.image('ladder', 'assets/img/Ladder_Iron_0001.png');
		game.load.image('button', 'assets/img/Button.png');
		game.load.image('checkPoint', 'assets/img/checkPoint.png');
		game.load.image('fog', 'assets/img/fog.png');
		game.load.image('button_1', 'assets/img/Button_0004.png');
		game.load.image('trap', 'assets/img/Wall_Trap_R_0001.png');
		game.load.image('trap2', 'assets/img/Trap_Circle_0003.png');
		game.load.image('trap3', 'assets/img/Small_Circular Saw Blade_0010.png');
		game.load.image('spike', 'assets/img/Spikes_0003.png');
		game.load.spritesheet('hero', 'assets/img/seth.png', 160, 200);
		game.load.spritesheet('portal', 'assets/img/portal.png', 320, 320);
		game.load.image('swingTrap', 'assets/img/SwingTrap.png');
	    game.load.image('block', 'assets/img/Block.png');
	    game.load.image('rope', 'assets/img/Rope.png');
		game.load.image('wallTrap', 'assets/img/WallTrap.png');
		game.load.image('barrier', 'assets/img/block.png');
		game.load.image('circle_trap', 'assets/img/Large_Circular Saw Blade_0002.png');
		game.load.image('title', 'assets/img/title.png');
		game.load.image('titleBackground', 'assets/img/titleBackground.jpg');

		// map
		game.load.tilemap('test', 'assets/map/t10.json', null, Phaser.Tilemap.TILED_JSON);

	},
	create: function() {
		// Jump to game play after black screen fade in
		game.camera.onFadeComplete.add(resetFade1, this);

		// background and game title
		var titleBackground = game.add.sprite(game.world.centerX, game.world.centerY, 'titleBackground');
		titleBackground.anchor.set(0.5);

		var title = game.add.sprite(game.world.centerX, game.world.centerY, 'title');
		title.anchor.set(0.5);
		title.scale.setTo(0.6);		
	},
	update: function() {
        // jump to game play
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.camera.fade(0x000000, 1000);
		}
	}
}
// GamePlay State
var GamePlay = function(game) {};
GamePlay.prototype = {

	init: function() {

	},

	create: function() {
		// Background music set up and play
		music = new Phaser.Sound(game,'bgm',1, true);
		music.play();

		// Reset screen during gameplay after black screen faded in
		game.camera.onFadeComplete.add(resetFade, this);

		// Set up game map physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.TILE_BIAS = 32;

		// Game map background
		game.stage.backgroundColor = "#e0e0e0";
		var myimage = game.add.sprite(0,200, 'b');
		myimage.scale.setTo(2);
		var myimage2 = game.add.sprite(21000,200, 'b');
		myimage2.scale.setTo(2);

		// Add game map and set up map layer
		this.map = game.add.tilemap('test');
		this.map.addTilesetImage('ground', 'ground');
		this.map.setCollisionByExclusion([]); // Make map is able to collide with other objects
		this.mapLayer = this.map.createLayer('Tile Layer 1'); // Crate a map layer
		this.mapLayer.resizeWorld();

		// Create final game portal
		this.portal = game.add.sprite(29500,1000, 'portal', 0);
		this.portal.animations.add('open',[0,1,2,3,4,5,6,7,8], 8, true); // animations
		this.portal.play('open');
		game.physics.enable(this.portal, Phaser.Physics.ARCADE); // enable object physics body

		// Create player from Player prefab
		// Let player spawn in checkPoint x,y so it will be updated when player reach check points
		this.player = new Player(game, checkPoint_x, checkPoint_y, 'hero', 0); 
		game.add.existing(this.player);

		// Start message
		this.message1 = game.add.text(400, 1100, "Where am I ?", style);
		this.message1.anchor.set(0.5);

		/*
			Start create game object from their own prefabs in designed position
		*/

		// ************* Game level 1 *************

		// Check point
		this.checkPoint = new CheckPoint(game, 4275, 896, 'checkPoint', 0, this.player);
		game.add.existing(this.checkPoint);

		// Ladder
		this.ladder = new Ladder(game, 600, 650, 'ladder', 0, this.player);
		game.add.existing(this.ladder);

		// Box
		this.box = new Box(game, 980, 305, 'box', 0, this.player, this.box2);
		game.add.existing(this.box);

		// Traps
		this.groundTrap = new GroundTrap(game, 900, 1190, 'spike', 0, this.player);
		game.add.existing(this.groundTrap);
		this.groundTrap2 = new GroundTrap(game, 1000, 1190, 'spike', 0, this.player);
		game.add.existing(this.groundTrap2);

		// Button
		this.button = new Button(game, 2090, 1250, 'button', 0, this.player);
		game.add.existing(this.button);
        z1 = this.button.y;

		this.droppingBlock = new Block(game, 2000, 400, 'block', 0, this.player);
		game.add.existing(this.droppingBlock);
		this.droppingBlock2 = new Block(game, 2400, 600, 'block', 0, this.player);
		game.add.existing(this.droppingBlock2);





		// ************* Game level 2 *************
		// Boxes
		this.box2 = new Box(game, 2500, 450, 'box', 0, this.player,  this.box);  
		game.add.existing(this.box2);
		this.box2.scale.setTo(1.1);
		this.box3 = new Box(game, 6600, 400, 'box', 0, this.player, this.box4, this.button4);  
		game.add.existing(this.box3);
		this.box3.body.gravity.y = 0;
		this.box4 = new Box(game, 7200, 400, 'box', 0, this.player, this.box5);  
		game.add.existing(this.box4);
		this.box4.body.gravity.y = 0;
		this.box5 = new Box(game, 7800, 400, 'box', 0, this.player);  
		game.add.existing(this.box5);
		this.box5.body.gravity.y = 0;

		// Spikes trap
		this.groundTrap3 = new GroundTrap(game, 5000, 1190, 'spike', 0, this.player); 
		game.add.existing(this.groundTrap3);
		this.groundTrap4 = new GroundTrap(game, 5100, 1190, 'spike', 0, this.player); 
		game.add.existing(this.groundTrap4);
		this.groundTrap5 = new GroundTrap(game, 5200, 1190, 'spike', 0, this.player); 
		game.add.existing(this.groundTrap5);
		this.groundTrap6 = new GroundTrap(game, 5300, 1190, 'spike', 0, this.player); 
		game.add.existing(this.groundTrap6);

		// Chain sound
		this.chainSound = game.add.audio('chain');

		// Wall traps
		this.wallTrap = new WallTrap(game, 5900, 1250, 'wallTrap', 0, this.player);
		game.add.existing(this.wallTrap);
		this.wallTrap2 = new WallTrap(game, 9000, 1250, 'wallTrap', 0, this.player); 
		game.add.existing(this.wallTrap2);
		this.wallTrap2.scale.x = -1;

		// Ropes
		this.rope = new Rope(game, 4700, 600, 'rope', 0, this.player);  
		game.add.existing(this.rope);
		this.rope2 = new Rope(game, 4900, 600, 'rope', 0, this.player);  
		game.add.existing(this.rope2);
		this.rope3 = new Rope(game, 5100, 600, 'rope', 0, this.player);  
		game.add.existing(this.rope3);
		this.rope4 = new Rope(game, 5300, 600, 'rope', 0, this.player);  
		game.add.existing(this.rope4);
		this.rope5 = new Rope(game, 4500, 600, 'rope', 0, this.player);  
		game.add.existing(this.rope5);

		// Buttons
		this.button3 = new Button(game, 6400, 1250, 'button', 0, this.player, this.mapLayer);  
		game.add.existing(this.button3);
		z2 = this.button3.y;
		this.button4 = new Button(game, 7000, 1250, 'button', 0, this.player, this.mapLayer);  
		game.add.existing(this.button4);
		z3 = this.button4.y;
		this.button5 = new Button(game, 7600, 1250, 'button', 0, this.player, this.mapLayer);  
		game.add.existing(this.button5);
        z = this.button5.y;

        // 2nd check point
		this.checkPoint2 = new CheckPoint(game, 9100, 1184, 'checkPoint', 0, this.player, this.mapLayer);
		game.add.existing(this.checkPoint2);


		// ************* Game level3 *************

		// Swinging trap
		this.swingTrap1 = new SwingTrap(game, 9650, 950, 'trap2', 0, this.player);  
		game.add.existing(this.swingTrap1);

		// Ladder & ropes
		this.swingRope1 = new circleTrap(game, 10250, 1220, 'trap3', 0, this.player);  
		game.add.existing(this.swingRope1);
		this.swingRope1.body.setSize(180, 180, 30, 30);

		this.ladder1 = new Ladder(game, 11100, 720, 'ladder', 0, this.player);  
		game.add.existing(this.ladder1);

		// Box
		this.big_box = new Box(game,11470,0,'Big_box',0,this.player);
		game.add.existing(this.big_box);

		this.box6 = new Box(game, 10025, 400, 'box', 0, this.player);  
		game.add.existing(this.box6);

		// Spike traps
		this.groundTrap7 = new GroundTrap(game, 11600, 640, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap7);
		this.groundTrap8 = new GroundTrap(game, 11700, 640, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap8);
		this.groundTrap9 = new GroundTrap(game, 11800, 640, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap9);
		this.groundTrap10 = new GroundTrap(game, 11900, 640, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap10);
		this.groundTrap11 = new GroundTrap(game, 12000, 640, 'spike', 0, this.player); 
		game.add.existing(this.groundTrap11);
		this.groundTrap12 = new GroundTrap(game, 12100, 640, 'spike', 0, this.player); 
		game.add.existing(this.groundTrap12);
		this.groundTrap13 = new GroundTrap(game, 12200, 640, 'spike', 0, this.player); 
		game.add.existing(this.groundTrap13);

		// Button
		this.button_L = new newButton(game, 12290, 590, 'button_1', 0, this.big_box,this.mapLayer,this.big_box);  
		game.add.existing(this.button_L);
		z4=this.button_L.x;

		// moving trap
		this.movingTrap = new movingtrap(game, 12600, 900, 'barrier', 0, this.player, 7, 1);  
		game.add.existing(this.movingTrap);
		z5=this.movingTrap.y;

		// Chain saw trap
		this.circle_trap = new circleTrap(game, 12790, 1395, 'circle_trap', 0, this.player);  
		game.add.existing(this.circle_trap);

		// Blocks (Use moving trap as a part of map layer)
		this.movingTrap1 = new movingtrap(game, 13500, 1250, 'barrier', 0, this.player, 1, 0.3);  
		game.add.existing(this.movingTrap1);
		this.movingTrap2 = new movingtrap(game, 14400, 1200, 'barrier', 0, this.player, 2, 0.3);  
		game.add.existing(this.movingTrap2);
		this.movingTrap3 = new movingtrap(game, 15300, 1180, 'barrier', 0, this.player, 3, 0.3);  
		game.add.existing(this.movingTrap3);
		this.movingTrap4 = new movingtrap(game, 16200, 1180, 'barrier', 0, this.player, 3.5, 0.3);  
		game.add.existing(this.movingTrap4);
		this.movingTrap5 = new movingtrap(game, 17100, 1180, 'barrier', 0, this.player, 4.5, 0.3);  
		game.add.existing(this.movingTrap5);
		this.movingTrap6 = new movingtrap(game, 18000, 1180, 'barrier', 0, this.player, 5, 0.3);  
		game.add.existing(this.movingTrap6);

		// 3rd Check point
		this.checkPoint3 = new CheckPoint(game, 18333, 1184, 'checkPoint', 0, this.player, this.mapLayer);
		game.add.existing(this.checkPoint3);

		// Moving traps
		this.movingTrap7 = new movingtrap(game, 19300, 450, 'barrier', 0, this.player, 1.5, 0.5, this.mapLayer);  
		game.add.existing(this.movingTrap7);
		this.movingTrap7.movingSpeed += 30; // Set their up & down speed
		this.movingTrap7.body.velocity.y = this.movingTrap7.movingSpeed;
		this.movingTrap7.startMoving = true; // Allow moving trap to move 

		this.movingTrap9 = new movingtrap(game, 19740, 450, 'barrier', 0, this.player, 1.5, 0.5, this.mapLayer);  
		game.add.existing(this.movingTrap9);
		this.movingTrap9.movingSpeed += 50;
		this.movingTrap9.body.velocity.y = this.movingTrap9.movingSpeed;
		this.movingTrap9.startMoving = true;

		this.movingTrap11 = new movingtrap(game, 20180, 450, 'barrier', 0, this.player, 1.5, 0.5, this.mapLayer);  
		game.add.existing(this.movingTrap11);
		this.movingTrap11.body.velocity.y = 150;
		this.movingTrap11.startMoving = true;

		this.movingTrap12 = new movingtrap(game, 20500, 950, 'barrier', 0, this.player, 1.5, 0.5, this.mapLayer);  
		game.add.existing(this.movingTrap12);
		this.movingTrap12.body.velocity.y = 150;
		this.movingTrap12.startMoving = true;

		// Another group of spikes traps
		this.groundTrap32 = new GroundTrap(game, 19300, 1200, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap32);
		this.groundTrap33 = new GroundTrap(game, 19720, 1200, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap33);
		this.groundTrap34 = new GroundTrap(game, 20140, 1200, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap34);
		this.groundTrap35 = new GroundTrap(game, 20500, 1200, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap35);

		// Check points
		this.checkPoint5 = new CheckPoint(game, 21500, 700, 'checkPoint', 0, this.player, this.mapLayer);
		game.add.existing(this.checkPoint5);
		this.checkPoint4 = new CheckPoint(game, 25000, 922, 'checkPoint', 0, this.player, this.movingTrap17);
		game.add.existing(this.checkPoint4);

		// Maplayer blocks
		this.movingTrap13 = new movingtrap(game, 22350, 1175, 'barrier', 0, this.player, 3.5, 1);  
		game.add.existing(this.movingTrap13);
		this.movingTrap14 = new movingtrap(game, 22750, 1100, 'barrier', 0, this.player, 3.5, 1);  
		game.add.existing(this.movingTrap14);
		this.movingTrap14 = new movingtrap(game, 23250, 1100, 'barrier', 0, this.player, 3.5, 1);  
		game.add.existing(this.movingTrap14);
		this.movingTrap15 = new movingtrap(game, 23750, 1100, 'barrier', 0, this.player, 3.5, 1);  
		game.add.existing(this.movingTrap15);
		this.movingTrap16 = new movingtrap(game, 24250, 1050, 'barrier', 0, this.player, 4.5, 1);  
		game.add.existing(this.movingTrap16);
		this.movingTrap17 = new movingtrap(game, 24950, 1050, 'barrier', 0, this.player, 4.5, 1);  
		game.add.existing(this.movingTrap17);





		// ************* Game level 4 *************
		// Ropes
		this.rope6 = new Rope(game, 24700, 600, 'rope', 0, this.player);  
		game.add.existing(this.rope6);
		this.rope7 = new Rope(game, 25400, 600, 'rope', 0, this.player);  
		game.add.existing(this.rope7);
		this.rope8 = new Rope(game, 25650, 600, 'rope', 0, this.player);  
		game.add.existing(this.rope8);

		// Maplayer block
		this.movingTrap18 = new movingtrap(game, 23250, 500, 'barrier', 0, this.player, 4.5, 1, this.mapLayer);  
		game.add.existing(this.movingTrap18);

		// Spike traps
		this.groundTrap14 = new GroundTrap(game, 22606, 1190, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap14);
		this.groundTrap15 = new GroundTrap(game, 23006, 1190, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap15);
		this.groundTrap16 = new GroundTrap(game, 23120, 1190, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap16);
		this.groundTrap17 = new GroundTrap(game, 23506, 1190, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap17);
		this.groundTrap18 = new GroundTrap(game, 23616, 1190, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap18);
		this.groundTrap19 = new GroundTrap(game, 24006, 1190, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap19);
		this.groundTrap20 = new GroundTrap(game, 24116, 1190, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap20);
		this.groundTrap21 = new GroundTrap(game, 24506, 1190, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap21);
		this.groundTrap22 = new GroundTrap(game, 24616, 1190, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap22);
		this.groundTrap23 = new GroundTrap(game, 24726, 1190, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap23);
		this.groundTrap24 = new GroundTrap(game, 24836, 1190, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap24);
		this.groundTrap25 = new GroundTrap(game, 25206, 1190, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap25);
		this.groundTrap26 = new GroundTrap(game, 25316, 1190, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap26);
		this.groundTrap27 = new GroundTrap(game, 25426, 1190, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap27);
		this.groundTrap28 = new GroundTrap(game, 25526, 1190, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap28);
		this.groundTrap29 = new GroundTrap(game, 25626, 1190, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap29);
		this.groundTrap30 = new GroundTrap(game, 25736, 1190, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap30);
		this.groundTrap31 = new GroundTrap(game, 25846, 1190, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap31);

		// Swinging trap
		this.swingTrap3 = new SwingTrap(game, 22650, 750, 'trap2', 0, this.player);  
		game.add.existing(this.swingTrap3);
		this.swingTrap4 = new SwingTrap(game, 26560, 530, 'trap2', 0, this.player);  
		game.add.existing(this.swingTrap4);
		this.swingTrap5 = new SwingTrap(game, 27220, 530, 'trap2', 0, this.player);  
		game.add.existing(this.swingTrap5);
		this.swingTrap6 = new SwingTrap(game, 27840, 530, 'trap2', 0, this.player);  
		game.add.existing(this.swingTrap6);

		// Wall traps
		this.wallTrap3 = new WallTrap(game, 25953, 200, 'wallTrap', 0, this.player);  
		game.add.existing(this.wallTrap3);
		this.wallTrap4 = new WallTrap(game, 28455, 550, 'wallTrap', 0, this.player);  
		game.add.existing(this.wallTrap4);
		this.wallTrap4.scale.x = -1;


		// Use for loop to create fogs effect through out game
		for (var i = 0; i < 30; i++) {
			this.fog = new Fog(game, i * 1800, 900, 'fog', 0);  
			game.add.existing(this.fog);
		}

   		// Game camera set up, make it focus on player
		game.camera.follow(this.player, 0.05, 0.05);

		// Create a Timer
    	timer = game.time.create(false);
		// Set a TimerEvent to occur after 1 seconds
   		timer.loop(1000, updateCounter, this);
   		timer.start();

		message = game.add.text(32, 16, "Time: " + total, style);
	  	message.fixedToCamera = true; // Make timer stays on the screen all the time
	  	message.cameraOffset.setTo(32, 16);

	  	// Game dialog messages
	  	this.message2 = game.add.text(this.checkPoint.x, this.checkPoint.y - 80, 
			"Ha, Ha, Looks like you are confused about what happened to you. Don’t worry\n"
			+ "I just want to play a game with you and you cannot refuse me\n" + 
			"unless you want to stay in this space forever", style);
		this.message2.anchor.set(0.5);
		this.message2.alpha = 0; // Make them invisible and make them visible when player arrive each check points

		this.message3 = game.add.text(this.checkPoint2.x, this.checkPoint2.y - 80, 
			"I will take it as you accept this game. I know you are a good thief with a special talent."
			, style);
		this.message3.anchor.set(0.5);
		this.message3.alpha = 0;

		this.message4 = game.add.text(this.checkPoint3.x, this.checkPoint3.y - 80, 
			"So it is your talent to set a time loop at a specific location.\n"
			+ "This is why you can stole everything.\n" + 
			"You are almost there. Looks like I made it so easy to you.", style);
		this.message4.anchor.set(0.5);
		this.message4.alpha = 0;
		
		// tip messages
		this.tMessage = game.add.text(650, 1395, "Use arrow keys to move, UP key to jump\n" + "DOWN UP key to climb down and up on ladder and rope\n"
			 + "Now, climb up the ladder in front of you and try to figure out how to jump over the spike trap", style);
		this.tMessage.anchor.set(0.5);

		this.tMessage2 = game.add.text(1350, 550, "if box is in the corner\n" + "hold C to drag box out\n", style);
		this.tMessage2.anchor.set(0.5);
	},


	update: function() {
		// Collision event for ALL the objects!
		game.physics.arcade.collide(this.player, this.mapLayer);
		game.physics.arcade.collide(this.box, this.mapLayer);
		game.physics.arcade.collide(this.box3, this.mapLayer);
		game.physics.arcade.collide(this.box4, this.mapLayer);
		game.physics.arcade.collide(this.box5, this.mapLayer);
		game.physics.arcade.collide(this.box6, this.mapLayer);
		game.physics.arcade.collide(this.button, this.mapLayer);
		game.physics.arcade.collide(this.droppingBlock, this.mapLayer);
		game.physics.arcade.collide(this.droppingBlock2, this.mapLayer);
		game.physics.arcade.collide(this.player, this.box2);
		game.physics.arcade.collide(this.player, this.box);
		game.physics.arcade.collide(this.droppingBlock2, this.box2);
		game.physics.arcade.collide(this.droppingBlock, this.box2);
		game.physics.arcade.collide(this.mapLayer, this.box2);
		game.physics.arcade.collide(this.mapLayer, this.wallTrap);
		game.physics.arcade.collide(this.mapLayer, this.wallTrap2);
		game.physics.arcade.collide(this.box, this.droppingBlock);
		game.physics.arcade.collide(this.box, this.box2);
		game.physics.arcade.collide(this.box, this.box2);
		game.physics.arcade.collide(this.box3, this.box4);
		game.physics.arcade.collide(this.box4, this.box5);
		game.physics.arcade.collide(this.box5, this.box3);
		game.physics.arcade.collide(this.box7, this.mapLayer);
		game.physics.arcade.collide(this.box8, this.mapLayer);
		game.physics.arcade.collide(this.box5, this.box3);

		game.physics.arcade.collide(this.wallTrap, this.box3);
		game.physics.arcade.collide(this.wallTrap2, this.box3);
		game.physics.arcade.collide(this.wallTrap, this.box4);
		game.physics.arcade.collide(this.wallTrap2, this.box4);
		game.physics.arcade.collide(this.wallTrap, this.box5);
		game.physics.arcade.collide(this.wallTrap2, this.box5);
		game.physics.arcade.collide(this.big_box, this.mapLayer);
		game.physics.arcade.collide(this.big_box, this.button_L);
		game.physics.arcade.collide(this.big_box, this.groundTrap7, this.collideSpike);
		game.physics.arcade.collide(this.big_box, this.groundTrap8, this.collideSpike);
		game.physics.arcade.collide(this.big_box, this.groundTrap9, this.collideSpike);
		game.physics.arcade.collide(this.big_box, this.groundTrap10, this.collideSpike);
		game.physics.arcade.collide(this.big_box, this.groundTrap11, this.collideSpike);
		game.physics.arcade.collide(this.big_box, this.groundTrap12, this.collideSpike);
		game.physics.arcade.collide(this.big_box, this.groundTrap13, this.collideSpike);
		game.physics.arcade.collide(this.movingTrap, this.mapLayer);

		game.physics.arcade.collide(this.mapLayer, this.wallTrap3);
		game.physics.arcade.collide(this.mapLayer, this.wallTrap4);

		game.physics.arcade.collide(this.checkPoint, this.mapLayer);

		// Active dropping block trap when player hit button
		if (this.button.hit) { 
			// Blocks and box drop to the ground together
			this.droppingBlock.body.velocity.y = 900;
			this.droppingBlock2.body.velocity.y = 750; 
			this.box2.body.gravity.y = 1000; 
			this.button.y =z1+15;
		}

		// Active dropping block when player hit button
		if (this.button3.hit) {
			this.box3.body.gravity.y = 500;
			this.button3.y =z2+15;
		}

		if (this.button4.hit) {
			this.box4.body.gravity.y = 500;
			this.button4.y =z3+15;
		}

		if (this.button5.hit) {
			this.box5.body.gravity.y = 500;
			this.button5.y =z+15;

		}
		
		if (this.button_L.hit1) {
			this.button_L.x=z4+6;
		}

		if(this.button_L.hit2) {
			this.movingTrap.y=z5+300;
		}

		// Make sure box3, box4, box5 will be pushed in the same when they stacked up together
		if (checkOverlap(this.box3,this.box4)){
			// When they stacked up they will not moving
			if (this.box3.body.velocity.x == 0) {
				this.box4.body.velocity.x = 0;
			} else {
				// Make them moving in the same speed
				this.box4.body.velocity.x = this.box3.body.velocity.x + 30;
			}
		}

		if (checkOverlap1(this.box5,this.box4)){
			if(this.box4.body.velocity.x == 0){
				this.box5.body.velocity.x = 0;
			} else {
				this.box5.body.velocity.x = this.box4.body.velocity.x + 30;
			}
		}

		if (checkOverlap2(this.box5,this.box3)) {
			if (this.box3.body.velocity.x == 0) {
				this.box5.body.velocity.x = 0;
			} else {
				this.box5.body.velocity.x = this.box3.body.velocity.x + 30;
			}
		}

		// Logics for triggert the traps
		// When player arrive in between 2 wall traps then active traps 
		if (this.player.body.x >= 6100 && this.player.body.x <= 8400 && this.player.body.y <= 1300) {
			// 2 wall traps will move toward each other
			this.wallTrap2.body.moves = true;
			this.wallTrap.body.moves = true;
			this.wallTrap.body.velocity.x = 50;
			this.wallTrap2.body.velocity.x = -50;
			this.chainSound.play();
		} else {
			// do not let them moving if player is not there
			this.wallTrap2.body.moves = false;
			this.wallTrap.body.moves = false;
		}

		// Active chain saw when player arrive in designed location
		if (this.player.body.x >= 13000 && this.player.body.x <= 18076 && this.circle_trap.x<=17920) {
			this.circle_trap.body.moves = true;
			this.circle_trap.body.velocity.x = 280;
			// If chain saw arrive destination then it will be fall into the ground and stop moving
			if (this.circle_trap.x >= 17000) {
				this.circle_trap.body.velocity.y = 50;
			}
		} else {
			// do not let them moving if player is not there
			this.circle_trap.body.moves = false;
		}

		// Active final wall traps
		if (this.player.body.x >= 26070 && this.player.body.x <= 28350) {
			this.wallTrap3.body.moves = true;
			this.wallTrap4.body.moves = true;
			this.wallTrap3.body.velocity.x = 50;
			this.wallTrap4.body.velocity.x = -50;
			// let wall trap 3 blocked player's way
			if (this.wallTrap3.y < this.wallTrap4.y) {
				this.wallTrap3.body.velocity.y = 100;
			}
		} else {
			// do not let them moving if player is not there
			this.wallTrap3.body.moves = false;
			this.wallTrap4.body.moves = false;
		}

		// When player start take off then destroy first message so it won't appear again
		if (Math.abs(this.player.x - this.message1.x >= 100)) {
			this.message1.destroy();
		}

		// Make each dialog messages visible when player arrive in check points
		if (this.checkPoint.hit) {
			this.message2.alpha = 1;
		}

		if (this.checkPoint2.hit) {
			this.message3.alpha = 1;
		}

		if (this.checkPoint3.hit) {
			this.message4.alpha = 1;
		}

		// Make each dialog message disappear after player left the checkpoint 
		if (this.message2.alpha == 1 && Math.abs(this.player.x - this.checkPoint.x >= 300)) {
			this.message2.alpha = 0;
		}

		if (this.message3.alpha == 1 && Math.abs(this.player.x - this.checkPoint2.x >= 300)) {
			this.message3.alpha = 0;
		}

		if (this.message4.alpha == 1 && Math.abs(this.player.x - this.checkPoint3.x >= 300)) {
			this.message4.alpha = 0;
		}

		// When player reached portal then the game ends
		if (game.physics.arcade.overlap(this.player, this.portal)) {
			game.camera.onFadeComplete.add(resetFade2, this); // redirect game camera's on fade complete event
			game.camera.fade(0x000000, 2000); // black scrren fade in
		}



		// detect object is overlap with each other
		function checkOverlap(box3,box4){
			var bound1=box3.getBounds();
			var bound2=box4.getBounds();
			// return true if 2 bounds intersects with each other
			return Phaser.Rectangle.intersects(bound1, bound2);
		}

		function checkOverlap1(box5,box4){
			var bound1=box5.getBounds();
			var bound2=box4.getBounds();
			return Phaser.Rectangle.intersects(bound1, bound2);
		}

		function checkOverlap2(box5,box3){
			var bound1=box5.getBounds();
			var bound2=box3.getBounds();
			return Phaser.Rectangle.intersects(bound1, bound2);
		}

	},

	
	// helper function to check box is colliding
	checkCollide: function(){
		console.log("Box is colliding");
	},



	// debug area
	render: function() {
		//game.debug.text('Loop Count: ' + total, 32, 64);
		//game.debug.bodyInfo(this.player, 32, 32);
		//game.debug.bodyInfo(this.box, 32, 128);
		//game.debug.body(this.player);
		/*
		game.debug.body(this.player);
		game.debug.body(this.swingTrap);
		game.debug.body(this.groundTrap);
		game.debug.body(this.droppingBlock2);
		game.debug.body(this.button_L);
		game.debug.body(this.rope);
		game.debug.body(this.box2);
		game.debug.body(this.circle_trap);
		game.debug.body(this.swingRope1);

		game.debug.bodyInfo(this.movingTrap8, 32, 128);
		*/
	},

	// when big box has collision with spikes then destroy the spike traps
	collideSpike: function(big_box, groundTrap) {
		groundTrap.kill();
	}

}

// Game Over state
var GameOver = function(game) {
	this.total = total; // Get player's timer result
};
GameOver.prototype = {
	init: function() {

	},
	create: function() {
		// set up background
		game.stage.backgroundColor = "#000000";
		var titleBackground = game.add.sprite(400, 500, 'titleBackground');
		titleBackground.anchor.set(0.5);

		// display dialog and result
		var dialog = game.add.text(200, 300, "Congratulation, You made it, hope you didn’t be exhausted. I will set you free. \n" 
		+ "Be ready for my next call. Ha, Ha, Ha, Ha", style);
		var result = game.add.text(200, 400, "You finished this game in " + timeFormat(total) + "\nYou just beaten " + 
			getRandom(90, 100) + "% of test players"
			, style);
	},
	update: function() {

	}
}


// function used to update player's spawn location
function updateCheckPoint(player){
			checkPoint_x = player.x + 20;
			checkPoint_y = player.y;
}

// increase and update player's game time
function updateCounter() {
    total++;
    message.text = ("Time: " + total);
}

// rest black screen 
function resetFade() {
    game.camera.resetFX(); //make black screen disappear
    music.stop(); // stop current music so it wont overlap with new game play scene
    game.state.start('GamePlay', true, false); // go back to game play
}

function resetFade1() {
	// jump to game play after fade in
    game.state.start('GamePlay', true, false);
}

function resetFade2() {
	// jump to game over after fade in
    game.state.start('GameOver', true, false);
}

// helper function to convert seconds to hrs: min: sec
function timeFormat(time) {   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

// get a random number between two numbers
function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// add states
game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
// start game at main menu state
game.state.start('MainMenu');
