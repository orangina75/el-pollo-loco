class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    IMAGES_CLOUDS = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_CLOUDS[Math.floor(Math.random() * this.IMAGES_CLOUDS.length)]);
        this.x = Math.random() * 5300;
        this.animate();
    }

    /**
     * Animates the movement of an object by continuously moving it to the left.
     * 
     * This method uses `setInterval` to repeatedly move the object to the left at a frame rate of 60 frames per second.
     * If the object's `x` position goes off-screen (less than negative width), it resets the object's position to `5300`.
     * 
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
            if (this.x < -this.width) {
                this.x = 5300;
            }
        }, 1000 / 60);
    }
}