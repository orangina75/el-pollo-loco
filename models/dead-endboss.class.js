class DeadEndboss extends MovableObject {


  IMAGES_DEAD_ENDBOSS = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ];


  constructor(x, y) {
    super().loadImage('img/4_enemie_boss_chicken/5_dead/G24.png');
    this.loadImages(this.IMAGES_DEAD_ENDBOSS);
    this.x = x;
    this.y = y;
    this.height = 300;
    this.width = 300;
    this.world = world;
    this.endbossDeath();
  }

  /**
   * Handles the death animation of the endboss, sets the game over state, 
   * and shows the end screen after a delay.
   *
   */
  endbossDeath() {
    this.playDeathAnimationEndboss(this.IMAGES_DEAD_ENDBOSS);
    this.gameOver = true;
    setTimeout(() => {
      this.world.showEndScreen();
    }, 3000);
  }
}
