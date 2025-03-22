class MovableObject extends DrawableObject {
    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    speedYDead = 0;
    speedYChickenNormal = 0;
    speedYChickenSmall = 0;
    acceleration = 2.5;
    accelerationChickenNormal = 0.5;
    accelerationChickenSmall = 1;
    accelerationDead = 6;
    energy = 100;
    lastHit = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    /**
     * Applies gravity to the object by adjusting its vertical position.
     * 
     * This method continuously updates the vertical position (`y`) of the object by applying the `speedY` 
     * and `acceleration` values. The object's vertical position is only updated if it's either above the ground 
     * or falling (i.e., `speedY` is greater than 0). The `speedY` is reduced over time to simulate gravity.
     *
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Applies gravity to the object when it is dead, causing it to fall.
     * 
     * This method adjusts the vertical position (`y`) of the object when `isDead` is true, by applying the 
     * `speedYDead` and `accelerationDead` values. The object's vertical position is updated at intervals of 250ms.
     * If the object is not dead, the gravity effect stops by clearing the interval.
     * 
     */
    applyGravityDead() {
        if (!this.gravityInterval) {
            this.gravityInterval = setInterval(() => {
                if (this.isDead) {
                    this.y += this.speedYDead;
                    this.speedYDead += this.accelerationDead;
                } else {
                    clearInterval(this.gravityInterval);
                    this.gravityInterval = null;
                }
            }, 250);
        }
    }

    /**
     * Applies gravity to the "small chicken" character, adjusting its vertical position based on the speed and acceleration.
     * 
     * This method updates the vertical position (`y`) of the "small chicken" character, applying gravity based on the 
     * `speedYChickenSmall` and `accelerationChickenSmall` values. The gravity effect is applied until the character's 
     * vertical position reaches 370 (or if the speed is positive), at which point the character stops falling. 
     *
     */
    applyChickenSmallGravity() {
        setInterval(() => {
            if (this.y < 370 || this.speedYChickenSmall > 0) {
                this.y -= this.speedYChickenSmall;
                this.speedYChickenSmall -= this.accelerationChickenSmall;
            }
        }, 1000 / 30);
    }

    /**
     * Applies gravity to the "normal chicken" character, adjusting its vertical position based on the speed and acceleration.
     * 
     * This method updates the vertical position (`y`) of the "normal chicken" character, applying gravity based on the 
     * `speedYChickenNormal` and `accelerationChickenNormal` values. The gravity effect is applied until the character's 
     * vertical position reaches 370 (or if the speed is positive), at which point the character stops falling. 
     */
    applyChickenNormalGravity() {
        setInterval(() => {
            if (this.y < 370 || this.speedYChickenNormal > 0) {
                this.y -= this.speedYChickenNormal;
                this.speedYChickenNormal -= this.accelerationChickenNormal;
            }
        }, 1000 / 30);
    }

    /**
     * Determines if the object is above the ground.
     * 
     * The method checks whether the current instance is a `ThrowableObject`, in which case it always returns `true`. 
     * Otherwise, it compares the `y` position of the object to a threshold (180) to determine if the object is above the ground.
     * 
     * @returns {boolean} `true` if the object is above the ground (either being a `ThrowableObject` or having a `y` value less than 180), otherwise `false`.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    /**
     * Checks if the chicken is on the ground.
     * The method compares the `y` position of the chicken to a threshold (370). If the `y` value is exactly 370, it assumes that the chicken is on the ground.
     * 
     * @returns {boolean} `true` if the chicken's `y` position is 370, indicating it is on the ground, otherwise `false`.
     */
    isChickenNormalOnGround() {
        return this.y = 370;
    }

    /**
     * Checks if the small chicken is on the ground.
     * The method compares the `y` position of the small chicken to a threshold (370). If the `y` value is exactly 370, it assumes that the small chicken is on the ground.
     * 
     * @returns {boolean} `true` if the small chicken's `y` position is 370, indicating it is on the ground, otherwise `false`.
     */
    isChickenSmallOnGround() {
        return this.y = 370;
    }

    /**
     * Checks if this object is colliding with another object.
     * 
     * This method checks for collisions by comparing the positions and dimensions of the current object and the provided object (`mo`). It accounts for the offsets of both objects to determine if they overlap. The collision is detected by checking the boundaries (right, left, top, bottom) of both objects.
     * 
     * @param {Object} mo - The other object to check for collision.
     * @param {number} mo.x - The x-coordinate of the other object.
     * @param {number} mo.y - The y-coordinate of the other object.
     * @param {number} mo.width - The width of the other object.
     * @param {number} mo.height - The height of the other object.
     * @param {Object} mo.offset - The offset values of the other object.
     * @param {number} mo.offset.left - The left offset of the other object.
     * @param {number} mo.offset.right - The right offset of the other object.
     * @param {number} mo.offset.top - The top offset of the other object.
     * @param {number} mo.offset.bottom - The bottom offset of the other object.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&    // R -> L
            this.y + this.height - this.offset.bottom + 50 > mo.y + mo.offset.top &&      // T -> B
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&         // L -> R
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;          // B -> T
    }

    /**
     * Reduces the energy of the object when it is hit.
     * This method decreases the object's `energy` by 5 when it is hit. If the energy goes below 0, it is set to 0. Otherwise, it updates the `lastHit` timestamp with the current time.
     * 
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Reduces the energy of the endboss when it is hit.
     * This method decreases the endboss's `energy` by 10 when it is hit. If the energy goes below 0, it is set to 0. Otherwise, it updates the `lastHit` timestamp with the current time.
     * 
     */
    hitEndboss() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Reduces the number of lives when the player is hit.
     * This method decreases the player's `lifes` by 1 when hit. If the number of lives goes below 0, it is set to 0, and the `gameOver` flag is set to `true`. Otherwise, it updates the `lastHit` timestamp with the current time.
     * 
     */
    hitLifes() {
        this.lifes -= 1;
        if (this.lifes < 0) {
            this.lifes = 0;
            this.gameOver = true;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the player has recently been hit.
     * This method calculates the time passed since the player's last hit and returns `true` if the time passed is less than 1 second, indicating that the player is still hurt. Otherwise, it returns `false`.
     * 
     * @returns {boolean} Returns `true` if the player was hit less than 1 second ago, otherwise `false`.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the player is dead.
     * This method checks if the player's energy is equal to 0. If the energy is 0, the player is considered dead, and the method returns `true`. Otherwise, it returns `false`.
     * 
     * @returns {boolean} Returns `true` if the player is dead (energy is 0), otherwise `false`.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays an animation by cycling through an array of image paths.
     * This method updates the current image to be displayed by cycling through the provided array of image paths. The current image is selected based on the current animation frame, which is tracked using `this.currentImage`. The image corresponding to the current frame is fetched from the `imageCache` and set as the `img` to be drawn.
     * 
     * @param {Array<string>} images - An array of image paths used for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays the death animation for the character.
     * This method animates the character's death by cycling through an array of death images, while also applying gravity to the character in its dead state. The animation is displayed at a fixed interval and stops once all death images have been shown.
     * 
     * The character's vertical speed (`speedYDead`) is gradually increased to simulate falling due to gravity during the death animation.
     * 
     */
    playDeathAnimationCharacter() {
        let i = 0;
        let deathImages = this.IMAGES_DEAD;
        this.applyGravityDead();
        let deathInterval = setInterval(() => {
            if (i < deathImages.length) {
                this.img = this.imageCache[deathImages[i]];
                this.speedYDead += 2;
                i++;
            } else {
                clearInterval(deathInterval);
            }
        }, 250);
    }

    /**
     * Plays the death animation for the endboss.
     * This method animates the endboss's death by cycling through an array of death images, while also applying gravity to the endboss in its dead state. The animation is displayed at a fixed interval and stops once all death images have been shown.
     * 
     * The endboss's vertical speed (`speedYDead`) is gradually increased to simulate falling due to gravity during the death animation. The speed increment is higher than the character's to reflect a more powerful fall.
     * 
     */
    playDeathAnimationEndboss() {
        let i = 0;
        let deathImages = this.IMAGES_DEAD_ENDBOSS;
        this.applyGravityDead();
        let deathInterval = setInterval(() => {
            if (i < deathImages.length) {
                this.img = this.imageCache[deathImages[i]];
                this.speedYDead += 4;
                i++;
            } else {
                clearInterval(deathInterval);
            }
        }, 250);
    }

    /**
     * Moves the character or object to the right.
     * This method increases the `x` position of the character or object by the value of its `speed`, effectively moving it to the right in the game world.
     * 
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the character or object to the left.
     * This method decreases the `x` position of the character or object by the value of its `speed`, effectively moving it to the left in the game world.
     * 
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Initiates the jump action by setting the appropriate vertical speed values.
     * 
     * This method adjusts the vertical speed (`speedY`, `speedYChickenNormal`, and `speedYChickenSmall`) to simulate the jump for different characters or objects.
     * The jump speed values are assigned based on the type of character or object that is jumping.
     * 
     */
    jump() {
        this.speedY = 30;
        this.speedYChickenNormal = 5;
        this.speedYChickenSmall = 10;
    }
}