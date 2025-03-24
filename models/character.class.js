class Character extends MovableObject {
    startTime;
    height = 250;
    y = 180;
    speed = 10;
    offset = {
        top: 120,
        bottom: 30,
        left: 40,
        right: 30
    }
    isIdle = false;
    gameOver = false;
    hurtSoundPlayed = false;
    walk = new Audio('audio/walk_5.mp3');
    jumpSound = new Audio('audio/jump_1.mp3');
    throw = new Audio('audio/throw_4.mp3');
    deadCharacter = new Audio('audio/gameover_3.mp3');
    hurt = new Audio('audio/hurt_1.mp3');
    snore = new Audio('audio/snore_1.mp3');

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    world;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.intervals = [];
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
        this.addSounds();
    }

    /**
     * Adds multiple sounds to the sounds array.
     * 
     */
    addSounds() {
        sounds.addSound(this.walk);
        sounds.addSound(this.jumpSound);
        sounds.addSound(this.throw);
        sounds.addSound(this.deadCharacter);
        sounds.addSound(this.hurt);
        sounds.addSound(this.snore);
    }

    /**
     * Starts the animation loop for the character's actions.
     * 
     */
    animate() {
        this.intervals.push(setInterval(() => {
            this.characterMoveRight();
            this.characterMoveLeft();
            this.characterJump();
            this.characterThrow();
            this.characterCamera();
            this.characterDeath();
        }, 1000 / 60));
        this.characterAnimateWalk();
        this.characterAnimateJump();
        this.characterIsIdle();
        this.characterLongIdle();
    }

    /**
     * Initiates the character's jump by setting the vertical speed.
     * 
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Moves the character to the right if the right arrow key is pressed, the character is not at the level end, 
     * and the game is not over.
     * 
     * @param {Object} world - The world object containing the game state, including the keyboard inputs and level data.
     * @param {boolean} world.keyboard.LEFT - A boolean indicating if the left arrow key is pressed.
     * @param {number} world.level.level_end_x - The x-coordinate of the level's end, used to determine the right boundary of the game world.
     * @param {boolean} gameOver - A boolean indicating whether the game is over.     
     */
    characterMoveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.gameOver) {
            this.moveRight();
            if (this.walk.paused && !this.isAboveGround()) {
                this.walk.currentTime = 0;
                this.playSound(this.walk, 1);
            }
            this.otherDirection = false;
            this.stopIsIdle();
        }
    }

    /**
     * Handles the character's movement to the left when the left arrow key is pressed.
     * 
     */
    characterMoveLeft() {
        if (this.world.keyboard.LEFT && this.x > -800 && !this.gameOver) {
            this.moveLeft();
            if (this.walk.paused && !this.isAboveGround()) {
                this.walk.currentTime = 0;
                this.playSound(this.walk, 1);
            }
            this.otherDirection = true;
            this.stopIsIdle();
        }
    }

    /**
     * Adjusts the camera position to follow the character.
     * 
     * @param {number} cameraOffset - The offset value added to the camera's x position.
     */
    characterCamera() {
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Makes the character jump when the spacebar is pressed.
     * 
     * @param {Object} world - The world object containing the game state, including keyboard inputs.
     * @param {boolean} world.keyboard.SPACE - A boolean indicating if the spacebar key is pressed.
     * @param {boolean} gameOver - A boolean indicating whether the game is over.
     */
    characterJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.gameOver) {
            this.jump();
            this.playSound(this.jumpSound, 1);
            this.stopIsIdle();
        }
    }

    /**
     * Makes the character throw a bottle when the Q key is pressed.
     * 
     * @param {Object} world - The world object containing the game state, including keyboard inputs and status bar data.
     * @param {boolean} world.keyboard.Q - A boolean indicating if the Q key is pressed.
     * @param {Object} world.statusBarBottle - The status bar for bottles.
     * @param {number} world.statusBarBottle.collectedBottles - The number of bottles the character has collected.
     * @param {boolean} isDead - A boolean indicating if the character is dead.
     */
    characterThrow() {
        if (this.world.keyboard.Q && !this.isDead() && this.world.statusBarBottle.collectedBottles > 0) {
            this.playSound(this.throw, 1);
            this.stopIsIdle();
        }
    }

    /**
     * Handles the character's death or hurt state.
     * 
     * @param {void} 
     */
    characterDeath() {
        if (this.isDead() && !this.deathAnimationPlayed) {
            this.handleCharacterDeath();
        } else if (this.isHurt()) {
            this.handleCharacterHurt();
        } else {
            this.hurtSoundPlayed = false;
        }
    }

    /**
     * Handles the character's death sequence.
     * 
     * @param {Object} world - The game world object that holds the state of the game.
     * @param {boolean} world.gameOver - Flag indicating whether the game is over or not.
     * @param {function} world.cleanupAfterDeath - Function to clean up the world state after the character dies.
     */
    handleCharacterDeath() {
        this.playDeathAnimationCharacter();
        this.deathAnimationPlayed = true;
        this.playSound(this.deadCharacter, 1);
        this.gameOver = true;

        if (this.world) {
            this.cleanupAfterDeath();
        }
    }

    /**
     * Cleans up the game world state after the character dies.
     * This method is called after the character dies
     * 
     * @param {Object} world - The game world object that holds the state of the game.
     * @param {Object} world.statusBarEndbossVisible - Flag indicating whether the endboss status bar is visible.
     * @param {function} world.stopGame - Function that stops the game.
     * @param {function} hideAudio - Function that hides the audio controls.
     * @param {function} showGameOverScreen - Function to show the game over screen.
     */
    cleanupAfterDeath() {
        this.world.statusBarEndbossVisible = false;
        this.world.stopGame();
        hideAudio();
        setTimeout(() => {
            this.showGameOverScreen();
        }, 3000);
    }

    /**
     * Displays the game over screen and stops all sounds.
     * 
     */
    showGameOverScreen() {
        this.world.showEndScreenLost();
        this.sounds.stopAllSounds();
        showEndButtons();
    }

    /**
     * Handles the character's hurt state when taking damage.
     * 
     */
    handleCharacterHurt() {
        this.stopIsIdle();
        if (!this.hurtSoundPlayed) {
            this.playSound(this.hurt, 0.8);
            this.hurtSoundPlayed = true;
        }
        this.playAnimation(this.IMAGES_HURT);
    }

    /**
     * Animates the character's jump when above ground.
     * This method repeatedly checks if the character is in the air (above ground) and not in a game over state. 
     * If the character is in the air, it plays the jump animation using the `IMAGES_JUMPING` array.
     * 
     */
    characterAnimateJump() {
        this.intervals.push(setInterval(() => {
            if (this.isAboveGround() && !this.gameOver) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
        }, 90));
    }

    /**
     * Animates the character's walking animation.
     * 
     */
    characterAnimateWalk() {
        this.intervals.push(setInterval(() => {
            if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround() && !this.isHurt() && !this.gameOver) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50));
    }

    /**
     * Checks if the character is idle and plays the idle animation.
     * 
     * @param {boolean} isIdle - Indicates whether the character is idle or not. If `true`, the character is idle and no movement is being made. If `false`, the character is performing an action (e.g., moving or jumping).
     */
    characterIsIdle() {
        this.checkTime();
        this.intervals.push(setInterval(() => {
            if (this.isIdle == false && !this.moveLeft() && !this.moveRight() && !this.isAboveGround() && !this.gameOver) {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 160));
    }

    /**
     * Checks if the character is in a long idle state and plays the long idle animation and sound.
     * 
     * @param {boolean} isIdle - Indicates whether the character is idle or not. If `true`, the character is idle and not performing any actions. If `false`, the character is performing an action.
     */
    characterLongIdle() {
        this.intervals.push(setInterval(() => {
            if (this.isIdle == true && !this.moveLeft() && !this.moveRight() && !this.isAboveGround() && !this.gameOver) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
                if (!this.isAboveGround()) {
                    this.playSound(this.snore, 0.8);
                }

            }
        }, 160));
    }

    /**
     * Checks if the character has been idle for a certain amount of time and updates the `isIdle` state.
     * 
     */
    checkTime() {
        if (!this.isIdle) {
            this.startTime = setTimeout(() => {
                this.isIdle = true;
            }, 10000);
        } else {
            this.checkTime();
        }
    }

    /**
     * Stops the idle state of the character and resets the idle timer.
     * 
     */
    stopIsIdle() {
        this.isIdle = false;
        clearTimeout(this.startTime);
        this.checkTime();
    }

    /**
     * Plays a sound with a specified volume, considering whether the sounds are muted.
     * 
     * @param {HTMLAudioElement} sound - The sound to be played. It should be an `HTMLAudioElement` that is supported for playback.
     * @param {number} volume - The volume level to set for the sound. It should be a number between 0 (muted) and 1 (maximum volume).
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
     * Stops all active intervals that were previously set and clears the list of interval IDs.
     * 
     */
    stopAllIntervals() {
        this.intervals.forEach(intervalID => clearInterval(intervalID));
        this.intervals = [];
    }
}