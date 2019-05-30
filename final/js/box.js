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

}

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.update = function() {
    game.physics.arcade.collide(this.player, this);
 //   game.physics.arcade.collide(this.box2, this);
    this.hit_box = game.physics.arcade.collide(this, this.button);
    if (Math.abs(this.player.x - this.x) <= 200 && game.input.keyboard.isDown(Phaser.Keyboard.C) && this.player.body.touching.down == false) {
      if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.body.velocity.x = -300;
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.body.velocity.x = 300;
      } else {
        this.body.acceleration.x = 0;
      }
    }
}
