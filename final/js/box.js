function Box(game, x, y, key, frame, player) {

    Phaser.Sprite.call(this, game, x, y, key, frame);
    this.game = game;
    this.player = player;

   // this.anchor.set(0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.drag.setTo(1000, 0);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 3000;
}

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.update = function() {
    game.physics.arcade.collide(this.player, this);

    if (Math.abs(this.player.x - this.x) <= 200 && game.input.keyboard.isDown(Phaser.Keyboard.C)) {
      if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.body.velocity.x = -300;
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.body.velocity.x = 300;
      } else {
        this.body.acceleration.x = 0;
      }
    }
}
