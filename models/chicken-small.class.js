class ChickenSmall extends MovableObject {

    y = 330;
    height = 50;
    width = 70;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.intervals = [];
        this.loadImages(this.IMAGES_WALKING);

        this.x = x;
        this.speed = 0.25 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Initiates the animation process for the chicken character.
     * 
     * This method starts the various actions related to the chicken character's 
     * movements and behaviors, including walking, moving left, jumping, and applying gravity.
     * It triggers the corresponding animations and behaviors at regular intervals.
     * 
     */
    animate() {
        this.chickenSmallWalk();
        this.chickenSmallMoveLeft();
        this.chickenSmallJump();
        this.applyChickenSmallGravity();
    }

    /**
     * Starts the walking animation for the chicken character.
     * 
     * This method initiates an interval that triggers the walking animation 
     * for the chicken at regular intervals. The walking animation is based 
     * on the images defined in `IMAGES_WALKING`.
     * 
     */
    chickenSmallWalk() {
        this.intervals.push(setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200));
    }

    /**
     * Moves the chicken character to the left at a constant rate.
     * 
     * This method sets up an interval to continuously move the chicken left 
     * by calling the `moveLeft` method at a frame rate of approximately 60 frames per second.
     * 
     */
    chickenSmallMoveLeft() {
        this.intervals.push(setInterval(() => {
            this.moveLeft();
        }, 1000 / 60));
    }

    /**
     * Makes the chicken character jump randomly if it's on the ground.
     * 
     * This method sets up an interval to check if the chicken is on the ground (using 
     * `isChickenSmallOnGround`). If true, it triggers a jump action by calling the `jump` method. 
     * The time interval for the jump occurrence is randomized between 0 and 20,000 milliseconds.
     * 
     */
    chickenSmallJump() {
        this.intervals.push(setInterval(() => {
            if (this.isChickenSmallOnGround()) {
                this.jump();
            }
        }, Math.random() * 20000));
    }

    /**
     * Stops all active intervals and clears the `intervals` array.
     * 
     * This method iterates through all interval IDs stored in the `intervals` array, 
     * clearing each interval using `clearInterval`. After stopping all intervals, 
     * it resets the `intervals` array to an empty state.
     * 
     */
    stopAllIntervals() {
        this.intervals.forEach(intervalID => clearInterval(intervalID));
        this.intervals = [];
    }
}

