class DeadChickenSmall extends MovableObject {
    width = 95;
    height = 95;
      
    IMAGES_DEAD_CHICKEN_SMALL = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];
    
    constructor(x) {
      super();
      this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
      this.x = x;
      this.y = 340;
    }
  }
  