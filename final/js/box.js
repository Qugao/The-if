function Box(game, x, y, key, frame, player, box, button) {

    Phaser.Sprite.call(this, game, x, y, key, frame);
    this.game = game;
    this.player = player;
    this.box = box;
    this.button = button;

   // this.anchor.set(0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.drag.setTo(1000, 0);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 500;
    this.anchor.set(0.5);

    this.sound = game.add.audio('push');
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.hit = false;

}

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.update = function() {
    this.hit_box = game.physics.arcade.collide(this, this.button);
    game.physics.arcade.collide(this, this.player);

    if (Math.abs(this.player.x - this.x) <= 100 && game.input.keyboard.isDown(Phaser.Keyboard.C) && this.player.body.onFloor()) {
      if(this.cursors.left.isDown) {
        this.body.velocity.x = -300;
      //  this.hit = true;
      } else if (this.cursors.right.isDown) {
        this.body.velocity.x = 300;
        //this.hit = true;
      } else {
        this.body.acceleration.x = 0;
       // this.hit = false;
      }
    }

    if (Math.abs(this.player.x - this.x) <= 100 && this.player.isWalking && Math.abs(this.player.y - this.y) <= 10) {
      this.hit = true;
    } else {
      this.hit = false;
    }

    if (this.hit) {
      console.log("hit");
      this.sound.play('',0,0.5,false,false); 
    } else {
      this.sound.stop();
      //console.log("not hit");
    }
}
