class Draw {
    constructor(ctx, canvas, world) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.world = world;
        this.numCoins = world.numCoins;
        this.numCoinsTotal = world.numCoinsTotal;
        this.numBottles = world.numBottles;
        this.numBottlesTotal = world.numBottlesTotal;
        this.collectedBottles = world.statusBarBottle.collectedBottles;
        this.totalCollectedBottles = world.totalCollectedBottles;
    }

    /**
     * Draws the entire game on the canvas. 
     * This includes clearing the canvas, drawing the background, 
     * the status bars, the game objects, and the end screen.
     * It also requests the next frame for continuous animation.
     *
     */
    draw() {
        this.clearCanvas();
        this.drawBackground();
        this.drawStatusBars();
        this.drawGameObjects();
        this.drawEndScreen();
        this.requestNextFrame();
    }

    /**
     * Clears the entire canvas by resetting the drawing area.
     * This method uses the `clearRect()` function to remove any previously drawn content.
     *
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws the background elements on the canvas by translating the canvas context
     * according to the camera's horizontal position, and then adding background objects and clouds.
     *
     */
    drawBackground() {
        this.ctx.translate(this.world.camera_x, 0);
        this.addObjectsToMap(this.world.level.backgroundObjects);
        this.addObjectsToMap(this.world.level.clouds);
        this.ctx.translate(-this.world.camera_x, 0);
    }

    /**
     * Draws the status bars on the canvas, including the bottle, health, and coin status bars.
     * If the endboss status bar is visible, it is also drawn.
     *
     */
    drawStatusBars() {
        this.addToMap(this.world.statusBarBottle);
        this.addToMap(this.world.statusBarHealth);
        this.addToMap(this.world.statusBarCoins);
        if (this.world.statusBarEndbossVisible) {
            this.addToMap(this.world.statusBarEndboss);
        }
    }

    /**
     * Draws all game objects on the canvas, including the character, enemies, throwable objects, 
     * bottles, coins, health, and any dead objects (enemies, endboss).
     * The drawing is adjusted for the camera's position.
     *
     */
    drawGameObjects() {
        this.ctx.translate(this.world.camera_x, 0);
        this.addToMap(this.world.character);
        this.addObjectsToMap(this.world.level.enemiesNormal);
        this.addObjectsToMap(this.world.level.enemiesSmall);
        this.addObjectsToMap(this.world.level.endboss);
        this.addObjectsToMap(this.world.throwableObjects);
        this.addObjectsToMap(this.world.launchedBottle);
        this.addObjectsToMap(this.world.deadEnemies);
        this.addObjectsToMap(this.world.deadEndboss);
        this.addObjectsToMap(this.world.level.salsaBottles);
        this.addObjectsToMap(this.world.level.coins);
        this.addObjectsToMap(this.world.level.health);
        this.ctx.translate(-this.world.camera_x, 0);
    }

    /**
     * Draws the end screen elements, including the end screen itself, bottles, coins, and status bar statistics.
     * This method is called to render the final display when the game ends.
     *
     */
    drawEndScreen() {
        if (this.world.endScreen) {
            this.world.endScreen.draw(this.ctx);
            this.world.endScreenBottle.draw(this.ctx);
            this.world.endScreenCoin.draw(this.ctx);
            this.world.statusBarCoins.drawStatistics(this.ctx, this.world.statusBarCoins.collectedCoins, this.world.totalCollectedBottles, this.world.numCoinsTotal, this.world.numBottlesTotal);
        }
    }

    /**
     * Requests the next animation frame to continuously redraw the game.
     * This method is used to keep the game loop running by calling the `draw()` method for the next frame.
     *
     */
    requestNextFrame() {
        let self = this;
        requestAnimationFrame(() => self.draw());
    }

    /**
     * Adds a collection of objects to the map by calling the `addToMap()` method for each object.
     *
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the map and handles its drawing and potential flipping.
     * If the object has the `otherDirection` property set to true, it will flip the image before drawing
     * and restore it back after drawing.
     *
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image of an object horizontally by applying a negative scaling factor.
     * This method saves the current canvas state, applies a horizontal flip transformation,
     * and modifies the object's position accordingly.
     *
     * @param {Object} mo - The object whose image will be flipped.
     * @param {number} mo.width - The width of the object used for the flipping transformation.
     * @param {number} mo.x - The x-coordinate of the object that will be modified for the flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the canvas context to its original state after a horizontal flip and
     * adjusts the object's position back to its original orientation.
     *
     * This method reverses the transformation applied by `flipImage()` by resetting the
     * object's x-coordinate and restoring the canvas context.
     *
     * @param {Object} mo - The object whose flipped image position will be restored.
     * @param {number} mo.x - The x-coordinate of the object that will be modified back to its original position.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
