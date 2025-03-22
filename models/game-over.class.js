class GameOver extends DrawableObject {
  width = 720;
  height = 480;
  y = 0;

  constructor(img) {
    super();
    this.loadImage(img);
    this.x = 0;
    this.y = 0;
  }
}

class GameOverBottle extends DrawableObject {

  constructor() {
    super();
    this.loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
    this.x = 180;
    this.y = 400;
    this.width = 70;
    this.height = 70;
  }
}

class GameOverCoin extends DrawableObject {

  constructor() {
    super();
    this.loadImage('img/7_statusbars/3_icons/icon_coin.png');
    this.x = 430;
    this.y = 400;
    this.width = 70;
    this.height = 70;
  }
}
