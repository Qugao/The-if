'use strict';
// Team: Quan Gao, Bo Yang, NaiXin Lou
// Source: https://drive.google.com/file/d/1C5PZWEgVSOIt4hDRZJE1HgJHPFnuk2yS/view?usp=sharing
// Git: https://github.com/VanquishGQ/First_Prototype_1
var game = new Phaser.Game(1280, 680, Phaser.AUTO);
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
		game.load.image('b', 'assets/img/back4.jpg');
		game.load.image('ground', 'assets/img/ground.png');
		game.load.image('box', 'assets/img/Box_Small_0003.png');
		game.load.image('Big_box', 'assets/img/Box_Large_0001.png');
		game.load.image('ladder', 'assets/img/Ladder_Iron_0001.png');
		game.load.image('button', 'assets/img/Button.png');
		game.load.image('fog', 'assets/img/fog.png');
		game.load.image('button_1', 'assets/img/Button_0004.png');
		game.load.image('trap', 'assets/img/Wall_Trap_R_0001.png');
		game.load.image('trap2', 'assets/img/Trap_Circle_0003.png');
		game.load.image('trap3', 'assets/img/Small_Circular Saw Blade_0010.png');
		game.load.image('spike', 'assets/img/Spikes_0003.png');
		game.load.image('item', 'assets/img/item.png',300, 300);
		game.load.spritesheet('hero', 'assets/img/seth.png', 160, 200);
		game.load.tilemap('test', 'assets/map/t10.json', null, Phaser.Tilemap.TILED_JSON);
		
	    game.load.image('swingTrap', 'assets/img/SwingTrap.png');
	    game.load.image('block', 'assets/img/Block.png');
	    game.load.image('rope', 'assets/img/Rope.png');
		game.load.image('wallTrap', 'assets/img/WallTrap.png');
		game.load.image('barrier', 'assets/img/block.png');
		game.load.image('circle_trap', 'assets/img/Large_Circular Saw Blade_0002.png');
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
var z;
var z1;
var z2;
var z3;
var z4;
var z5;
var z6;
var z7;
var z8;
var checkPoint_x = 400;
var checkPoint_y = 1263;
// GamePlay State
var GamePlay = function(game) {
	// Local varaibles
	this.player;
	this.box;
	this.box2;
	this.box3;
	this.box4;
	this.box6;
	this.groundTrap;

 
};
GamePlay.prototype = {

	init: function() {

	},

	create: function() {
		//game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
				// Set up game's physics properties
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.TILE_BIAS = 32;
		// play music
		//music = new Phaser.Sound(game,'bgm',1, true);
		//music.play();
		// Set up game map and background color
		game.stage.backgroundColor = "#e0e0e0";
		//game.add.image(100, 900, 'b');
		var myimage = game.add.sprite(0,200, 'b');
		myimage.scale.setTo(2);
		var myimage2 = game.add.sprite(21000,200, 'b');
		myimage2.scale.setTo(2);
		this.map = game.add.tilemap('test');
		this.map.addTilesetImage('ground', 'ground');
		this.map.setCollisionByExclusion([]); // Make map is able to collide with other objects
		this.mapLayer = this.map.createLayer('Tile Layer 1'); // Crate a map layer
		this.mapLayer.resizeWorld();
		//game.add.image(0, 0, 'b');

		this.player = new Player(game, checkPoint_x, checkPoint_y, 'hero', 0);  
		game.add.existing(this.player);

		// ************* Game level 1 *************

		this.checkPoint = new CheckPoint(game, 4275, 700, 'button', 0, this.player);
		game.add.existing(this.checkPoint);

		this.ladder = new Ladder(game, 600, 650, 'ladder', 0, this.player);
		game.add.existing(this.ladder);

		this.box = new Box(game, 980, 305, 'box', 0, this.player, this.box2);
		game.add.existing(this.box);

		this.swingTrap = new SwingTrap(game, 800, 900, 'trap2', 0, this.player);
		game.add.existing(this.swingTrap);
		this.swingRope = new swingRope(game, 800, 715, 'rope', 0, this.player);
		game.add.existing(this.swingRope);

		this.groundTrap = new GroundTrap(game, 900, 1190, 'spike', 0, this.player);
		game.add.existing(this.groundTrap);
		this.groundTrap2 = new GroundTrap(game, 1000, 1190, 'spike', 0, this.player);
		game.add.existing(this.groundTrap2);

		this.button = new Button(game, 2090, 1250, 'button', 0, this.player);
		game.add.existing(this.button);
        z1 = this.button.y;

		this.droppingBlock = new Block(game, 2000, 400, 'block', 0, this.player);
		game.add.existing(this.droppingBlock);
		this.droppingBlock2 = new Block(game, 2400, 600, 'block', 0, this.player);
		game.add.existing(this.droppingBlock2);





		// ************* Game level 2 *************

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

		this.groundTrap3 = new GroundTrap(game, 5000, 1190, 'spike', 0, this.player); 
		game.add.existing(this.groundTrap3);
		this.groundTrap4 = new GroundTrap(game, 5100, 1190, 'spike', 0, this.player); 
		game.add.existing(this.groundTrap4);
		this.groundTrap5 = new GroundTrap(game, 5200, 1190, 'spike', 0, this.player); 
		game.add.existing(this.groundTrap5);
		this.groundTrap6 = new GroundTrap(game, 5300, 1190, 'spike', 0, this.player); 
		game.add.existing(this.groundTrap6);

		this.wallTrap = new WallTrap(game, 6000, 1400, 'wallTrap', 0, this.player);
		game.add.existing(this.wallTrap);
		this.wallTrap2 = new WallTrap(game, 7000, 1400, 'wallTrap', 0, this.player); 
		game.add.existing(this.wallTrap2);
		this.wallTrap2.scale.x = -1;

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

		this.button3 = new Button(game, 6400, 1250, 'button', 0, this.player, this.mapLayer);  
		game.add.existing(this.button3);
		z2 = this.button3.y;
		/*
		this.button4 = new Button(game, 7000, 1250, 'button', 0, this.player, this.mapLayer);  
		game.add.existing(this.button4);
		z3 = this.button4.y;
		this.button5 = new Button(game, 7600, 1250, 'button', 0, this.player, this.mapLayer);  
		game.add.existing(this.button5);
        z = this.button5.y;
*/
		this.checkPoint2 = new CheckPoint(game, 9100, 700, 'button', 0, this.player, this.mapLayer);
		game.add.existing(this.checkPoint2);

		// ************* Game level3 *************

		this.swingTrap1 = new SwingTrap(game, 9650, 950, 'trap2', 0, this.player);  
		game.add.existing(this.swingTrap1);
		this.swingTrap2 = new SwingTrap(game, 10050, 950, 'trap2', 0, this.player);  
		game.add.existing(this.swingTrap2);

		this.box6 = new Box(game, 10025, 400, 'box', 0, this.player);  
		game.add.existing(this.box6);

		this.swingRope1 = new circleTrap(game, 10250, 1220, 'trap3', 0, this.player);  
		game.add.existing(this.swingRope1);
		this.swingRope1.body.setSize(180, 180, 30, 30);

		this.checkPoint0 = new CheckPoint(game, 10500, 700, 'button', 0, this.player, this.mapLayer);
		game.add.existing(this.checkPoint0);



		this.ladder1 = new Ladder(game, 11100, 720, 'ladder', 0, this.player);  
		game.add.existing(this.ladder1);

		this.big_box = new Box(game,11300,0,'Big_box',0,this.player);
		game.add.existing(this.big_box);

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

		this.button_L = new newButton(game, 12290, 590, 'button_1', 0, this.big_box,this.mapLayer,this.big_box);  
		game.add.existing(this.button_L);
		z4=this.button_L.x;

		this.movingTrap = new movingtrap(game, 12600, 900, 'barrier', 0, this.player, 7, 1);  
		game.add.existing(this.movingTrap);
		z5=this.movingTrap.y;

		this.circle_trap = new circleTrap(game, 12790, 1395, 'circle_trap', 0, this.player);  
		game.add.existing(this.circle_trap);


		// Blocks
		this.movingTrap1 = new movingtrap(game, 13500, 1250, 'barrier', 0, this.player, 2, 0.3);  
		game.add.existing(this.movingTrap1);
		this.movingTrap2 = new movingtrap(game, 14400, 1200, 'barrier', 0, this.player, 2.5, 0.3);  
		game.add.existing(this.movingTrap2);
		this.movingTrap3 = new movingtrap(game, 15300, 1200, 'barrier', 0, this.player, 3, 0.3);  
		game.add.existing(this.movingTrap3);
		this.movingTrap4 = new movingtrap(game, 16200, 1200, 'barrier', 0, this.player, 3.5, 0.3);  
		game.add.existing(this.movingTrap4);
		this.movingTrap5 = new movingtrap(game, 17100, 1200, 'barrier', 0, this.player, 4.5, 0.3);  
		game.add.existing(this.movingTrap5);
		this.movingTrap6 = new movingtrap(game, 18000, 1200, 'barrier', 0, this.player, 5, 0.3);  
		game.add.existing(this.movingTrap6);

		this.button6 = new Button(game, 16750, 1250, 'button', 0, this.player, this.mapLayer);  
		game.add.existing(this.button6);
		z6 = this.button6.y;
		this.button7 = new Button(game, 17660, 1250, 'button', 0, this.player, this.mapLayer);  
		game.add.existing(this.button7);
        z7 = this.button7.y;

		this.movingTrap7 = new movingtrap(game, 19300, 450, 'barrier', 0, this.player, 1.5, 0.5, this.mapLayer);  
		game.add.existing(this.movingTrap7);
		this.movingTrap7.movingSpeed += 20;
		this.movingTrap7.body.velocity.y = this.movingTrap7.movingSpeed;
		this.movingTrap7.startMoving = true;

		this.movingTrap8 = new movingtrap(game, 19520, 950, 'barrier', 0, this.player, 3, 0.5, this.mapLayer);  
		game.add.existing(this.movingTrap8);
		this.movingTrap8.movingSpeed += 40;
		this.movingTrap8.body.velocity.y = this.movingTrap8.movingSpeed;
		this.movingTrap8.startMoving = true;

		this.movingTrap9 = new movingtrap(game, 19740, 450, 'barrier', 0, this.player, 3, 0.5, this.mapLayer);  
		game.add.existing(this.movingTrap9);
		this.movingTrap9.movingSpeed += 50;
		this.movingTrap9.body.velocity.y = this.movingTrap9.movingSpeed;
		this.movingTrap9.startMoving = true;

		this.movingTrap10 = new movingtrap(game, 19960, 950, 'barrier', 0, this.player, 3, 0.5, this.mapLayer);  
		game.add.existing(this.movingTrap10);
		this.movingTrap10.movingSpeed += 100;
		this.movingTrap10.body.velocity.y = this.movingTrap10.movingSpeed;
		this.movingTrap10.startMoving = true;

		this.movingTrap11 = new movingtrap(game, 20180, 450, 'barrier', 0, this.player, 3, 0.5, this.mapLayer);  
		game.add.existing(this.movingTrap11);
		this.movingTrap11.body.velocity.y = 150;
		this.movingTrap11.startMoving = true;

		this.movingTrap12 = new movingtrap(game, 20400, 950, 'barrier', 0, this.player, 1.5, 0.5, this.mapLayer);  
		game.add.existing(this.movingTrap12);
		this.movingTrap12.body.velocity.y = 150;
		this.movingTrap12.startMoving = true;

		this.groundTrap32 = new GroundTrap(game, 19300, 1200, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap32);
		this.groundTrap33 = new GroundTrap(game, 19520, 1200, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap33);
		this.groundTrap34 = new GroundTrap(game, 19740, 1200, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap34);
		this.groundTrap35 = new GroundTrap(game, 19960, 1200, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap35);
		this.groundTrap36 = new GroundTrap(game, 20180, 1200, 'spike', 0, this.player); 
		game.add.existing(this.groundTrap36);
		this.groundTrap37 = new GroundTrap(game, 20400, 1200, 'spike', 0, this.player); 
		game.add.existing(this.groundTrap37);
		this.groundTrap38 = new GroundTrap(game, 20500, 1200, 'spike', 0, this.player); 
		game.add.existing(this.groundTrap38);

		this.groundTrap39 = new GroundTrap(game, 19300, 520, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap39);
		this.groundTrap39.scale.y = -1

		this.groundTrap40 = new GroundTrap(game, 19520, 520, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap40);
		this.groundTrap40.scale.y = -1

		this.groundTrap41 = new GroundTrap(game, 19740, 520, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap41);
		this.groundTrap41.scale.y = -1

		this.groundTrap42 = new GroundTrap(game, 19960, 520, 'spike', 0, this.player);  
		game.add.existing(this.groundTrap42);
		this.groundTrap42.scale.y = -1

		this.groundTrap43 = new GroundTrap(game, 20180, 520, 'spike', 0, this.player); 
		game.add.existing(this.groundTrap43);
		this.groundTrap43.scale.y = -1

		this.groundTrap44 = new GroundTrap(game, 20400, 520, 'spike', 0, this.player); 
		game.add.existing(this.groundTrap44);
		this.groundTrap44.scale.y = -1

		this.groundTrap45 = new GroundTrap(game, 20500, 520, 'spike', 0, this.player); 
		game.add.existing(this.groundTrap45);
		this.groundTrap45.scale.y = -1



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

		this.checkPoint3 = new CheckPoint(game, 25000, 400, 'button', 0, this.player, this.movingTrap17);
		game.add.existing(this.checkPoint3);




		// ************* Game level 4 *************

		this.rope6 = new Rope(game, 24700, 600, 'rope', 0, this.player);  
		game.add.existing(this.rope6);
		this.rope7 = new Rope(game, 25400, 600, 'rope', 0, this.player);  
		game.add.existing(this.rope7);
		this.rope8 = new Rope(game, 25650, 600, 'rope', 0, this.player);  
		game.add.existing(this.rope8);

		this.swingTrap3 = new SwingTrap(game, 22650, 750, 'trap2', 0, this.player);  
		game.add.existing(this.swingTrap3);

		this.movingTrap18 = new movingtrap(game, 23250, 500, 'barrier', 0, this.player, 4.5, 1);  
		game.add.existing(this.movingTrap18);

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

		this.swingTrap4 = new SwingTrap(game, 26560, 530, 'trap2', 0, this.player);  
		game.add.existing(this.swingTrap4);
		this.swingTrap5 = new SwingTrap(game, 27220, 530, 'trap2', 0, this.player);  
		game.add.existing(this.swingTrap5);
		this.swingTrap6 = new SwingTrap(game, 27840, 530, 'trap2', 0, this.player);  
		game.add.existing(this.swingTrap6);

		this.wallTrap3 = new WallTrap(game, 25953, 300, 'wallTrap', 0, this.player);  
		game.add.existing(this.wallTrap3);
		this.wallTrap4 = new WallTrap(game, 28455, 550, 'wallTrap', 0, this.player);  
		game.add.existing(this.wallTrap4);
		this.wallTrap4.scale.x = -1;




		this.fog = this.add.sprite(0, 900, 'fog');
		game.physics.enable(this.fog, Phaser.Physics.ARCADE);
		this.fog.scale.setTo(5);
		this.fog.body.velocity.x = 10;

		game.camera.follow(this.player, 0.025, 0.025);

	},


	update: function() {
		//this.fog.x = this.player.x;
		game.physics.arcade.collide(this.player, this.mapLayer);
		game.physics.arcade.collide(this.box, this.mapLayer);
		game.physics.arcade.collide(this.box3, this.mapLayer);
		game.physics.arcade.collide(this.box4, this.mapLayer);
		game.physics.arcade.collide(this.box5, this.mapLayer);
		game.physics.arcade.collide(this.box6, this.mapLayer);
		game.physics.arcade.collide(this.button, this.mapLayer);
		game.physics.arcade.collide(this.droppingBlock, this.mapLayer);
		//game.physics.arcade.collide(this.droppingBlock, this.player);
		game.physics.arcade.collide(this.droppingBlock2, this.mapLayer);
		game.physics.arcade.collide(this.player, this.box2);
		game.physics.arcade.collide(this.player, this.box);
		//game.physics.arcade.collide(this.player, this.box2);
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

		game.physics.arcade.collide(this.box5, this.box3);

		game.physics.arcade.collide(this.wallTrap, this.box3);
		game.physics.arcade.collide(this.wallTrap2, this.box3);
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

		if (this.button.hit) {
			this.droppingBlock.body.velocity.y = 900;
			this.droppingBlock2.body.velocity.y = 750;
			this.box2.body.gravity.y = 1000;
			this.button.y =z1+15;
		}

		if (this.button3.hit) {
			this.box3.body.gravity.y = 1000;
			this.button3.y =z2+15;
		}
/*
		if (this.button4.hit) {
			this.box4.body.gravity.y = 1000;
			this.button4.y =z3+15;
		}

		if (this.button5.hit) {
			this.box5.body.gravity.y = 1000;
			this.button5.y =z+15;

		}
*/
		if (this.button_L.hit1) {
			this.button_L.x=z4+6;
		}

		if(this.button_L.hit2) {
			this.movingTrap.y=z5+300;
		}

		if(this.box3.hit_box){
			this.button4.kill();
		}

		if(checkOverlap(this.box3,this.box4)){
			if(this.box3.body.velocity.x==0){
				this.box4.body.velocity.x=0;
			}else{
				this.box4.body.velocity.x=this.box3.body.velocity.x+10;
			}
		}

		if(checkOverlap1(this.box5,this.box4)){
			if(this.box4.body.velocity.x==0){
				this.box5.body.velocity.x=0;
			}else{
				this.box5.body.velocity.x=this.box4.body.velocity.x+10;
			}
		}

		if(checkOverlap2(this.box5,this.box3)){
			if(this.box3.body.velocity.x==0){
				this.box5.body.velocity.x=0;
			}else{
				this.box5.body.velocity.x=this.box3.body.velocity.x+10;
			}
		}

		if (this.player.body.x >= 6100 && this.player.body.x <= 8400 && this.player.body.y <= 1300) {
			this.wallTrap2.body.moves = true;
			this.wallTrap.body.moves = true;
			this.wallTrap.body.velocity.x = 50;
			this.wallTrap2.body.velocity.x = -50;
		} else {
			this.wallTrap2.body.moves = false;
			this.wallTrap.body.moves = false;
		}

		if (this.player.body.x >= 13000) {
			this.circle_trap.body.moves = true;
			this.circle_trap.body.velocity.x = 280;
		} else {
			this.circle_trap.body.moves = false;
		}

		if (this.button6.hit) {
			this.button6.y =z6+15;

		}

		if (this.button7.hit) {
			this.button7.y =z7+15;

		}

		if (this.player.body.x >= 26070 && this.player.body.x <= 28350) {
			this.wallTrap3.body.moves = true;
			this.wallTrap4.body.moves = true;
			this.wallTrap3.body.velocity.x = 50;
			this.wallTrap4.body.velocity.x = -50;

			if (this.wallTrap3.y < this.wallTrap4.y) {
				this.wallTrap3.body.velocity.y = 100;
			}
		} else {
			this.wallTrap3.body.moves = false;
			this.wallTrap4.body.moves = false;
		}



		function checkOverlap(box3,box4){
			var bound1=box3.getBounds();
			var bound2=box4.getBounds();
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

	

	checkCollide: function(){

		console.log("Box is colliding");
	},



	// debug
	render: function() {
		/*
		game.debug.bodyInfo(this.player, 32, 32);
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

	collideSpike: function(big_box, groundTrap) {
		groundTrap.kill();
	}

}

function out(snow) {
	// send snow to opposite side and reset its velocity
    this.x = game.width - this.x;
    this.y = game.height - this.y;
    this.body.velocity.x = Math.random() * 100;
}

function updateCheckPoint(player){
			checkPoint_x = player.x + 20;
			checkPoint_y = player.y;
}

// add states
game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
// start game at main menu state
game.state.start('MainMenu');
