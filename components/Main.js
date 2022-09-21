import Phaser from "phaser";

export default class Main extends Phaser.Scene {
  delayText = null;

  preload() {
    // console.log('scene preload')
    this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
  }

  create() {
    this.add.image(400, 250, 'sky');

    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
      speed: 250,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    });

    var logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(50, 50);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);

    this.delayText = this.add.text(50, 50, '', { fill: '#eee' });
  }

  update(time, delta) {
    // console.log('time delta', time, delta)
    var loop = this.sys.game.loop;
    
    var fpsMetervalue = Math.floor(loop.actualFps);
    this.delayText.setText([
      `fps: ${fpsMetervalue} fps`,
    ]);
  }
}