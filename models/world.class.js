class World {
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    character = new Character();
    statusBarBottle = new StatusBarBottle();
    statusBarHealth = new StatusBarHealth();
    statusBarCoins = new StatusBarCoins();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    launchedBottle = [];
    deadEnemies = [];
    deadEndboss = [];
    endScreen = null;
    gameOver = false;
    statusBarEndbossVisible = false;
    collectCoin = new Audio('audio/coin_2.mp3');
    collectBottle = new Audio('audio/collect_1.mp3');
    collectHeart = new Audio('audio/coin_1.mp3');
    bottleSplash = new Audio('audio/bottle_splash.mp3');
    deadEndbossSound = new Audio('audio/gameover_1.mp3');
    deadEnemy = new Audio('audio/hurt_3.mp3');
    throw = new Audio('audio/throw_4.mp3');

    constructor(canvas, keyboard, numCoins, numCoinsTotal, numBottles, numBottlesTotal) {
        this.intervals = [];
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.numCoins = numCoins;
        this.numCoinsTotal = numCoinsTotal;
        this.numBottles = numBottles;
        this.numBottlesTotal = numBottlesTotal;
        this.totalCollectedBottles = 0;
        this.drawer = new Draw(this.ctx, this.canvas, this);
        this.draw();
        this.setWorld();
        this.collisionHandler = new CollisionHandler(this);
        this.run();
        this.sounds = new Sounds();
        this.addSounds();
    }

    /**
     * Adds various sound effects to the sound manager.
     * 
     */
    addSounds() {
        sounds.addSound(this.collectCoin);
        sounds.addSound(this.collectBottle);
        sounds.addSound(this.collectHeart);
        sounds.addSound(this.bottleSplash);
        sounds.addSound(this.deadEndbossSound);
        sounds.addSound(this.deadEnemy);
        sounds.addSound(this.throw);
    }

    /**
     * Sets the world for the character.
     * 
     * @param {World} world - The world instance to be assigned to the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the collision check and the endboss trigger intervals.
     * 
     */
    run() {
        this.collisionHandler.startCollisionCheckInterval();
        this.startEndbossTriggerInterval();
    }

    /**
     * Starts an interval to trigger endboss-related actions periodically.
     * 
     */
    startEndbossTriggerInterval() {
        this.intervals.push(setInterval(() => {
            this.handleEndbossTrigger();
        }, 200));
    }

    /**
     * Handles the splash effect when a bottle is thrown.
     * 
     * @param {Object} bottlePosition - The position of the thrown bottle.
     * @param {number} bottlePosition.x - The x-coordinate of the bottle.
     * @param {number} bottlePosition.y - The y-coordinate of the bottle.
     */
    bottleIsSplashed(bottlePosition) {
        let bottle = new SalsaBottleSplash(bottlePosition.x, bottlePosition.y - 15);
        this.playSound(this.bottleSplash, 0.8);
        this.throwableObjects = this.throwableObjects.filter(obj => obj !== bottlePosition);
        this.launchedBottle.push(bottle);
        setTimeout(() => {
            this.launchedBottle = this.launchedBottle.filter(obj => obj !== bottle);
        }, 500);
    }

    /**
     * Draws the game elements by calling the `draw` method from the drawer object.
     * 
     */
    draw() {
        this.drawer.draw();
    }

    /**
     * Handles the logic when the endboss is defeated.
     * 
     * @param {Object} endboss - The endboss that has been defeated.
     * @param {number} i - The index of the endboss in the list or array of endbosses.
     */
    endbossIsDead(endboss, i) {
        if (!this.isValidEndboss(endboss, i)) {
            return;
        }
        this.handleDeadEndboss(endboss, i);
        this.playEndbossDeathEffects();
        this.scheduleEndScreen();
    }

    /**
     * Checks if the provided endboss is valid within the level's endboss list.
     * 
     * @param {Object} endboss - The endboss to be validated.
     * @param {number} i - The index of the endboss in the level's list of endbosses.
     */
    isValidEndboss(endboss, i) {
        return endboss && this.level.endboss[i];
    }

    /**
     * Handles the death of an endboss by creating a new DeadEndboss object, updating the level's 
     * endboss list, and triggering death-related effects.
     * 
     * @param {Object} endboss - The endboss that has been defeated.
     * @param {number} i - The index of the defeated endboss in the level's endboss list.
     */
    handleDeadEndboss(endboss, i) {
        let deadEndboss = new DeadEndboss(endboss.x, endboss.y, this);
        this.deadEndboss.push(deadEndboss);
        this.level.endboss[i].lifes = 0;
        this.level.endboss = [];
        this.deadEndboss[this.deadEndboss.length - 1].endbossDeath();
    }

    /**
     * Plays the endboss death sound and triggers the end of the game.
     * 
     */
    playEndbossDeathEffects() {
        this.playSound(this.deadEndbossSound, 1);
        this.stopGame();
        hideAudio();
    }

    /**
     * Schedules the end screen to be displayed after a delay.
     * 
     */
    scheduleEndScreen() {
        setTimeout(() => {
            this.sounds.stopAllSounds();
            showEndButtons();
        }, 3000);
    }

    /**
     * Checks if the endboss is still alive.
     * 
     */
    endbossIsAlive() {
        return this.level.endboss.length >= 1;
    }

    /**
     * Handles the behavior when the endboss is hurt.
     * 
     * @param {Endboss} endboss The endboss object that is being hurt.
     */
    endbossIsHurt(endboss) {
        endboss.hitLifes(1);
        this.endbossGetsAngry(endboss);
        if (endboss.lifes <= 0) {
            this.endbossIsDead(endboss, this.level.endboss.indexOf(endboss));
        }
    }

    /**
     * Adjusts the endboss's speed when it becomes angry.
     * 
     * @param {Endboss} endboss The endboss object whose speed is adjusted.
     */
    endbossGetsAngry(endboss) {
        endboss.speed = 5;
        if (endboss.x - this.character.x > 250) {
            setTimeout(() => {
                endboss.speed = 8;
            }, 1000);
            setTimeout(() => {
                endboss.speed = 6;
            }, 2200);
        }
    }

    /**
     * Checks for collisions between throwable bottles and normal enemies, and handles the resulting effects.
     * 
     */
    bottleEnemyNormalCollision() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemiesNormal.forEach((enemy, i) => {
                if (bottle.isColliding(enemy)) {
                    this.enemyNormalIsDead(enemy, i);
                    this.bottleIsSplashed(bottle);
                }
            });
        });
    }

    /**
     * Checks for collisions between throwable bottles and small enemies, and handles the resulting effects.
     * 
     */
    bottleEnemySmallCollision() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemiesSmall.forEach((enemy, i) => {
                if (bottle.isColliding(enemy)) {
                    this.enemySmallIsDead(enemy, i);
                    this.bottleIsSplashed(bottle);
                }
            });
        });
    }

    /**
     * Checks for collisions between throwable bottles and the endboss, and handles the resulting effects.
     * 
     */
    bottleEndbossCollision() {
        this.throwableObjects.forEach((bottle) => {
            this.level.endboss.forEach((endboss, i) => {
                if (bottle.isColliding(endboss, i)) {
                    this.bottleIsSplashed(bottle);
                    this.endbossIsHurt(endboss, i);
                    this.statusBarEndboss.setLifes(endboss.lifes);
                    this.statusBarEndbossVisible = false;
                }
            });
        });
    }

    /**
     * Handles the trigger for the endboss.
     * 
     */
    handleEndbossTrigger() {
        if (this.endbossIsAlive()) {
            this.playerGetsDetected();
            this.endbossNoPassThrough();
        }
    }

    /**
     * Prevents the endboss from passing through the player.
     * 
     */
    endbossNoPassThrough() {
        if (this.level.endboss[0].x <= this.character.x) {
            this.level.level_end_x = this.level.endboss[0].x;
        }
    }

    /**
     * Triggers the detection of the player by the endboss.
     * 
     */
    playerGetsDetected() {
        if (this.character.x > 7500 && !this.character.isDead()) {
            this.level.endboss[0].trigger = true;
            this.statusBarEndbossVisible = true;
        }
    }

    /**
     * Displays the end screen when the game is over.
     * 
     */
    showEndScreen() {
        this.endScreen = new GameOver('img/11_You won, you lost/You Won A.png');
        this.endScreenBottle = new GameOverBottle('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.endScreenCoin = new GameOverCoin('img/7_statusbars/3_icons/icon_coin.png');
    }

    /**
     * Displays the end screen when the game is over.
     * 
     */
    showEndScreenLost() {
        this.endScreen = new GameOver('img/9_intro_outro_screens/game_over/you lost.png');
        this.endScreenBottle = new GameOverBottle('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.endScreenCoin = new GameOverCoin('img/7_statusbars/3_icons/icon_coin.png');
    }

    /**
     * Stops the game and sets the necessary flags and values to end the game.
     * 
     */
    stopGame() {
        this.gameOver = true;
        this.character.gameOver = true;
        this.character.speed = 0;
        Endboss.speed = 0;
        this.character.isIdle = false;
        this.stopAllIntervals();
        this.character.stopAllIntervals();
    }

    /**
     * Plays the provided sound with the specified volume, considering the mute state.
     * 
     * @param {HTMLAudioElement} sound - The sound to be played.
     * @param {number} volume - The volume level for the sound, between 0 and 1.
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
     * Stops all intervals that have been set and clears the `intervals` array.
     * 
     */
    stopAllIntervals() {
        this.intervals.forEach(intervalID => clearInterval(intervalID));
        this.intervals = [];
    }
}
