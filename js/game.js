let prizes_config = {
  count: 12,
  prize_names: [
    '3000 Credits',
    '35% Off',
    'Hard Luck',
    '70% OFF',
    'Swagpack',
    '100% OFF',
    'Netflix',
    '50% Off',
    'Amazon Voucher',
    '2 Extra Spin',
    'CB Tshirt',
    'CB Book',
  ],
};

const config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 650,

  scene: {
    preload,
    create,
    update,
  },
};

let game = new Phaser.Game(config);

function preload() {
  this.load.image('background', '../Assets/back.jpg');
  this.load.image('wheel', '../Assets/wheel.png');
  this.load.image('pin', '../Assets/pin.png');
  this.load.image('stand', '../Assets/stand.png');
}

function create() {
  let W = game.config.width;
  let H = game.config.height;
  let background = this.add.sprite(0, 0, 'background');
  background.setPosition(W / 2, H / 2);
  background.setScale(0.2);

  let stand = this.add.sprite(W / 2, H / 2 + 260, 'stand');
  stand.setScale(0.25);

  this.wheel = this.add.sprite(W / 2, H / 2, 'wheel');
  this.wheel.setScale(0.25);

  let pin = this.add.sprite(W / 2, H / 2 - 250, 'pin');
  pin.setScale(0.25);

  this.input.on('pointerdown', spinwheel, this);

  let font_style = {
    font: 'bold 25px Arial',
    color: 'brown',
    align: 'center',
  };
  this.game_text = this.add.text(
    W / 2 - 160,
    5,
    'Welcome to spin and win',
    font_style
  );
}

function update() {}

function spinwheel() {
//   this.game_text = this.setPosition(800 / 2 - 100, 5);
  this.game_text.setText('Spinning');

  let rounds = Phaser.Math.Between(2, 4);
  let deg = Phaser.Math.Between(0, 11) * 30;
  let total_angle = rounds * 360 + deg;

  let index =
    prizes_config.count - 1 - Math.floor(deg / (360 / prizes_config.count));
  let tween = this.tweens.add({
    targets: this.wheel,
    angle: total_angle,
    callbackScope: this,
    ease: 'Cubic.easeOut',
    duration: 6000,
    onComplete: function () {
      this.game_text.setText(`You won ${prizes_config.prize_names[index]}`);
    },
  });
}
