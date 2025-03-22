class ThrowableObject extends MovableObject {

    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y, world) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.world = world;
        this.throw();
        this.animate();
    }

    /**
     * Simulates the throwing of an object, applying gravity and moving it across the screen.
     * 
     * This method sets the initial vertical speed, applies gravity, and then moves the object horizontally 
     * while checking if it has reached a certain vertical position. Once the object reaches the threshold 
     * (in this case, `y >= 350`), it triggers a splash effect and clears the interval.
     * 
     * @memberof World
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        let interval = setInterval(() => {
            this.x += 8;
            if (this.y >= 350) {
                clearInterval(interval);
                this.world.bottleIsSplashed(this);
            }
        }, 25);
    }

    /**
     * Animates the rotation of a bottle by repeatedly cycling through the bottle's rotation images.
     * 
     * This method uses `setInterval` to call the `playAnimation` function at regular intervals, displaying
     * the bottle's rotation animation. The interval is set to 90 milliseconds, ensuring the animation 
     * runs at a consistent speed.
     * 
     * @memberof Bottle
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        }, 90);
    }
}
