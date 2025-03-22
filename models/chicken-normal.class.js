class ChickenNormal extends MovableObject {

    y = 370;
    height = 50;
    width = 70;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.intervals = [];
        this.loadImages(this.IMAGES_WALKING);

        this.x = x;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Handles the animation of the chicken character in the game.
     * 
     * This method manages various animations and movements for the chicken character. 
     * It calls the following methods in sequence:
     * - `this.chickenNormalWalk()` to handle the walking animation of the chicken.
     * - `this.chickenNormalMoveLeft()` to handle the movement of the chicken to the left.
     * - `this.chickenNormalJump()` to handle the jumping animation and logic.
     * - `this.applyChickenNormalGravity()` to apply gravity to the chicken's movement.
     * 
     */
    animate() {
        this.chickenNormalWalk();
        this.chickenNormalMoveLeft();
        this.chickenNormalJump();
        this.applyChickenNormalGravity();
    }

    /**
     * Initiates the walking animation for the chicken character.
     * 
     * This method repeatedly plays the walking animation for the chicken character at regular intervals.
     * The walking animation is triggered by the `this.IMAGES_WALKING` image array, which contains the frames for the walking animation.
     * The animation is updated every 200 milliseconds.
     * 
     */
    chickenNormalWalk() {
        this.intervals.push(setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200));
    }

    /**
     * Initiates the movement of the chicken character to the left.
     * 
     * This method repeatedly moves the chicken character to the left by calling the `moveLeft()` method at a rate of 60 frames per second.
     * The movement is triggered at a regular interval of 1000/60 milliseconds.
     * 
     */
    chickenNormalMoveLeft() {
        this.intervals.push(setInterval(() => {
            this.moveLeft();
        }, 1000 / 60));
    }

    /**
     * Initiates a random jump for the chicken character if it's on the ground.
     * 
     * This method checks if the chicken is on the ground by calling `isChickenNormalOnGround()`. 
     * If the chicken is on the ground, it triggers the `jump()` method. The jump happens at a random interval between 0 and 10 seconds.
     * 
     */
    chickenNormalJump() {
        this.intervals.push(setInterval(() => {
            if (this.isChickenNormalOnGround()) {
                this.jump();
            }
        }, Math.random() * 10000));
    }

    /**
     * Stops all active intervals and clears the interval list.
     * 
     * This method iterates through all intervals stored in the `this.intervals` array, 
     * clears each interval using `clearInterval()`, and then resets the `this.intervals` 
     * array to an empty list, effectively stopping all scheduled interval-based actions.
     * 
     */
    stopAllIntervals() {
        this.intervals.forEach(intervalID => clearInterval(intervalID));
        this.intervals = [];
    }
}
