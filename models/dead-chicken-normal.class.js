class DeadChickenNormal extends MovableObject {
    width = 95;
    height = 95;
      
    IMAGES_DEAD_CHICKEN_NORMAL = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];
    
    constructor(x, y) {
      super();
      this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
      this.x = x;
      this.y = 335;
    }
  }
  