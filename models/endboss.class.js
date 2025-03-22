class Endboss extends MovableObject {
  height = 300;
  width = 190;
  y = 140;
  speed = 2;
  trigger = false;
  attack = false;
  lifes = 3;

  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png'
  ];


  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png'
  ];

  IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png'
  ];

  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];

  constructor() {
    super();
    this.loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.x = 8400;
    this.animate();
    this.updateTrigger();
  }

  /**
   * Animates the endboss actions at regular intervals.
   * 
   * This method is responsible for triggering various actions of the endboss,
   * including walking, seeing the character, attacking, and handling damage. 
   * It runs these actions at regular intervals using `setInterval()`.
   *
   */
  animate() {
    setInterval(() => {
      this.endbossWalks();
      this.endbossSeesCharacter();
      this.endbossAttacks();
      this.endbossIsHurt();
    }, 200);
  }

  /**
   * Updates the movement of an entity based on the trigger condition.
   * 
   * This method checks the state of the `trigger` and `attack` variables at regular intervals. 
   * If `trigger` is true and `attack` is false, the entity will move left. 
   * The movement is handled by calling `moveLeft()` method within the interval.
   *
   */
  updateTrigger() {
    setInterval(() => {
      if (this.trigger == true && this.attack == false) this.moveLeft();
    }, 1000 / 60);
  }

  /**
   * Handles the walking animation of the endboss.
   * 
   * This method plays the walking animation for the endboss if the `trigger` is true, 
   * `attack` is false, and the endboss is not hurt. It checks these conditions and, if met, 
   * triggers the walking animation by calling `playAnimation` with `IMAGES_WALKING`.
   *
   */
  endbossWalks() {
    if (this.trigger == true && this.attack == false && !this.isHurt()) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Handles the attack behavior of the endboss.
   * 
   * This method triggers the endboss's attack animation if the `attack` flag is true. 
   * It sets a timeout to reset the `attack` flag to false after 500 milliseconds. 
   * The attack animation is played by calling `playAnimation` with `IMAGES_ATTACK`.
   *
   */
  endbossAttacks() {
    if (this.attack == true) {
      setTimeout(() => {
        this.attack = false;
      }, 500);
      this.playAnimation(this.IMAGES_ATTACK);
    }
  }

  /**
   * Handles the behavior when the endboss sees the character.
   * 
   * This method checks if the `attack` flag is not set to true and the `trigger` flag is false. 
   * If these conditions are met, the endboss will play the alert animation, indicating that it sees the character.
   *
   */
  endbossSeesCharacter() {
    if (!this.attack == true && this.trigger == false) {
      this.playAnimation(this.IMAGES_ALERT);
    }
  }

  /**
   * Handles the behavior when the endboss is hurt.
   * 
   * This method checks if the endboss is hurt by calling the `isHurt()` method. 
   * If the endboss is indeed hurt, it plays the hurt animation.
   *
   */
  endbossIsHurt() {
    if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    }
  }
}
