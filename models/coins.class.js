class Coins extends MovableObject {
    height = 100;
    width = 100;

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Animates the object by repeatedly playing the coin animation.
     * 
     * This method uses `setInterval` to play the animation defined in `IMAGES_COIN` at a rate of one frame every 400 milliseconds.
     * 
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 400);
    }
}
