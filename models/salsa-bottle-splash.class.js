class SalsaBottleSplash extends MovableObject {
    height = 100;
    width = 100;

    IMAGES_SALSA_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png');
        this.loadImages(this.IMAGES_SALSA_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Starts an animation by repeatedly playing the splash animation for a salsa bottle.
     * 
     * This method uses `setInterval` to call the `playAnimation()` function every 100 milliseconds,
     * displaying the images for the salsa bottle splash animation.
     * 
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SALSA_BOTTLE_SPLASH);
        }, 100);
    }
}
