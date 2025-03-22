class CollisionHandler {
    constructor(world) {
        this.world = world;
        this.intervals = [];
        this.level = world.level;
        this.character = world.character;
        this.numCoins = world.numCoins;
        this.numCoinsTotal = world.numCoinsTotal;
        this.numBottles = world.numBottles;
        this.numBottlesTotal = world.numBottlesTotal;
        this.collectedBottles = world.statusBarBottle.collectedBottles;
        this.totalCollectedBottles = world.totalCollectedBottles;
    }

    /**
     * Starts an interval to repeatedly check various collision and collection conditions.
     * 
     * This method sets up an interval that checks for collisions and interactions with different game elements, such as
     * the normal chicken, small chicken, endboss, throw objects, coins, bottles, health, and other entities.
     * The checks are performed every 100 milliseconds.
     * 
     */
    startCollisionCheckInterval() {
        this.intervals.push(setInterval(() => {
            this.checkCollisionsChickenNormal();
            this.checkCollisionsChickenSmall();
            this.checkCollisionEndboss();
            this.checkThrowObjects();
            this.checkCollectedCoins();
            this.checkCollectedBottles();
            this.checkCollectedHealth();
            this.checkBottleCollisions();
            this.checkDeadbyJump();
        }, 100));
    }

    /**
     * Checks for collisions between the character and normal enemies.
     * 
     * This method iterates through all normal enemies in the level and checks if the character is colliding with any of them.
     * If a collision is detected, the character is hit and their health is updated accordingly.
     * 
     */
    checkCollisionsChickenNormal() {
        this.level.enemiesNormal.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.world.statusBarHealth.setPercentageHealth(this.character.energy);
            }
        });
    }

    /**
     * Checks for collisions between the character and small enemies.
     * 
     * This method iterates through all small enemies in the level and checks if the character is colliding with any of them.
     * If a collision is detected, the character is hit and their health is updated accordingly.
     * 
     */
    checkCollisionsChickenSmall() {
        this.world.level.enemiesSmall.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.world.statusBarHealth.setPercentageHealth(this.character.energy);
            }
        });
    }

    /**
     * Checks for collisions between the character and the endboss.
     * 
     * This method checks if the character collides with the endboss in the level. If a collision occurs,
     * the endboss begins its attack, and the character is hit by the endboss. The character's health is updated accordingly.
     * 
     */
    checkCollisionEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.level.endboss[0].attack = true;
                this.character.hitEndboss();
                this.world.statusBarHealth.setPercentageHealth(this.character.energy);
            }
        });
    }

    /**
     * Checks if the character can throw a bottle and performs the throwing action.
     * 
     * This method checks if the character has pressed the "Q" key, has collected bottles, and is facing the correct direction. 
     * If the conditions are met, it plays the throw sound, decreases the collected bottles count, updates the bottle percentage 
     * on the status bar, and creates a new throwable object that is thrown in the world.
     * 
     */
    checkThrowObjects() {
        if (this.world.keyboard.Q && this.world.statusBarBottle.collectedBottles > 0 && this.character.otherDirection === false) {
            this.playSound(this.world.throw, 1);
            this.world.statusBarBottle.collectedBottles--;
            let percentage = (this.world.statusBarBottle.collectedBottles / numBottlesTotal) * 100;
            this.world.statusBarBottle.setPercentageBottle(percentage);
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.world);
            this.world.throwableObjects.push(bottle);
            bottle.throw();
        }
    }

    /**
     * Checks if the character has collected any coins and updates the game state accordingly.
     * 
     * This method iterates through all coins in the level and checks if the character is colliding with any of them. 
     * If a coin is collected, it removes the coin from the level, plays the coin collection sound, 
     * increases the collected coins count, and updates the coin percentage on the status bar.
     * 
     */
    checkCollectedCoins() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(i, 1);
                this.playSound(this.world.collectCoin, 0.8);
                this.world.statusBarCoins.collectedCoins++;
                let percentage = (this.world.statusBarCoins.collectedCoins / numCoinsTotal) * 100;
                this.world.statusBarCoins.setPercentageCoins(percentage);
            }
        });
    }

    /**
     * Checks if the character has collected any salsa bottles and updates the game state accordingly.
     * 
     * This method iterates through all salsa bottles in the level and checks if the character is colliding with any of them. 
     * If a salsa bottle is collected, it removes the bottle from the level, plays the salsa bottle collection sound, 
     * increases the collected bottles count, and updates the bottle percentage on the status bar. 
     * Additionally, it increments the total number of collected bottles in the world.
     * 
     */
    checkCollectedBottles() {
        this.level.salsaBottles.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                this.level.salsaBottles.splice(i, 1);
                this.playSound(this.world.collectBottle, 0.8);
                this.world.statusBarBottle.collectedBottles++;
                let percentage = (this.world.statusBarBottle.collectedBottles / numBottlesTotal) * 100;
                this.world.statusBarBottle.setPercentageBottle(percentage);
                this.world.totalCollectedBottles++;
            }
        });
    }

    /**
     * Checks if the character has collected any health items and updates the character's energy accordingly.
     * 
     * This method iterates through all health items in the level and checks if the character is colliding with any of them. 
     * If a health item is collected, it removes the item from the level, plays the health collection sound, 
     * increases the character's energy (up to a maximum of 100), and updates the health percentage on the status bar.
     * 
     */
    checkCollectedHealth() {
        this.level.health.forEach((health, i) => {
            if (this.character.isColliding(health)) {
                this.level.health.splice(i, 1);
                this.playSound(this.world.collectHeart, 0.8);
                this.character.energy = Math.min(this.character.energy + 50, 100);
                this.world.statusBarHealth.setPercentageHealth(this.character.energy);
            }
        });
    }

    /**
     * Checks for collisions between thrown bottles and enemies or endboss.
     * 
     * This method calls various collision check methods to detect if any thrown bottles 
     * collide with different types of enemies (normal, small) or the endboss. 
     * If a collision occurs, the corresponding collision handling actions are triggered.
     * 
     */
    checkBottleCollisions() {
        this.world.bottleEnemyNormalCollision();
        this.world.bottleEnemySmallCollision();
        this.world.bottleEndbossCollision();
    }

    /**
     * Checks if any enemies are killed by a jump.
     * 
     * This method calls two other methods to check if any normal or small enemies 
     * are killed by the player's jump. If an enemy is in the path of the jump, 
     * they are marked as killed.
     * 
     */
    checkDeadbyJump() {
        this.world.enemyNormalKilledByJump();
        this.world.enemySmallKilledByJump();
    }

    /**
     * Plays a sound with the specified volume, considering whether sounds are muted.
     * 
     * This method checks if the global sound settings are muted. If they are, it mutes 
     * the sound and sets the volume to 0. If the sounds are not muted, it sets the sound 
     * volume to the provided value and plays the sound.
     * 
     * @param {HTMLAudioElement} sound - The sound to be played (should be an audio element).
     * @param {number} volume - The volume level of the sound, from 0 to 1.
     * 
     */
    playSound(sound, volume) {
        if (sounds.soundsMuted) {
            sound.muted = true;
            sound.volume = 0;
        } else {
            sound.muted = false;
            sound.volume = volume;
        }
        sound.play();
    }

    /**
     * Stops all intervals that are currently running and clears the interval list.
     * 
     * This method iterates over all stored interval IDs in the `intervals` array,
     * clears each interval, and then resets the `intervals` array to an empty list.
     * It is useful for stopping all ongoing animations or repetitive tasks in the game.
     * 
     */
    stopAllIntervals() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
    }
}