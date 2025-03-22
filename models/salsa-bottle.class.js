class SalsaBottle extends MovableObject {
  height = 100;
  width = 100;
  y = 330;

  IMAGES_SALSA_BOTTLE = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
  ];

  constructor(x) {
    super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.loadImages(this.IMAGES_SALSA_BOTTLE);
    this.x = x;
    this.animate();
  }

  /**
   * Starts an animation by repeatedly playing the salsa bottle animation.
   * 
   * This method uses `setInterval` to call the `playAnimation()` function every 350 milliseconds,
   * displaying the images for the salsa bottle animation.
   * 
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_SALSA_BOTTLE);
    }, 350);
  }
}
