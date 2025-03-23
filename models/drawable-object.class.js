class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    sounds = new Sounds();

    /**
     * Loads an image from the specified path and stores it in the object's `img` property.
     *
     * This method creates a new `Image` object, sets its source to the provided path,
     * and loads the image for use in rendering or other purposes.
     *
     * @param {string} path - The path or URL of the image to be loaded.
     * @returns {void} - This method does not return any value.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the image onto the specified canvas context at the object's current position.
     * 
     * The method attempts to draw the image stored in `this.img` at the coordinates (`this.x`, `this.y`)
     * with the specified width and height (`this.width`, `this.height`). If an error occurs during the
     * drawing process (e.g., if the image is not yet loaded), a warning is logged to the console.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context to draw the image on.
     * @throws {Error} If the image cannot be loaded or drawn, a warning is logged.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading image', e);
        }
    }

    /**
     * Draws the statistics on the canvas, including the title, collected items, dividers, and total items.
     * 
     * This method organizes the display of statistics like the number of collected coins and bottles,
     * as well as the total available coins and bottles. It calls helper methods to draw different parts
     * of the statistics UI on the given canvas context.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context to draw the statistics on.
     * @param {number} collectedCoins - The number of coins the player has collected.
     * @param {number} totalCollectedBottles - The number of bottles the player has collected.
     * @param {number} numCoinsTotal - The total number of coins available in the game.
     * @param {number} numBottlesTotal - The total number of bottles available in the game.
     */
    drawStatistics(ctx, collectedCoins, totalCollectedBottles, numCoinsTotal, numBottlesTotal) {
        this.drawTitle(ctx);
        this.drawCollectedItems(ctx, collectedCoins, totalCollectedBottles);
        this.drawDividers(ctx);
        this.drawTotalItems(ctx, numCoinsTotal, numBottlesTotal);
    }

    /**
     * Draws the title "Statistics" on the canvas.
     * 
     * This method sets the text style, alignment, and position to display the title "Statistics" at 
     * a fixed position on the canvas. It is used as part of the overall statistics display.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context to draw the title on.
     */
    drawTitle(ctx) {
        ctx.textAlign = "center";
        ctx.font = "40px luckiestguy, Arial, sans-serif";
        ctx.fillStyle = "black";
        ctx.fillText("Statistics", 360, 390);
    }

    /**
     * Draws the collected items (bottles and coins) on the canvas.
     * 
     * This method displays the number of collected bottles and coins at specified positions on the canvas.
     * It is part of the statistics display, showing the player's progress in collecting these items.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context to draw the collected items on.
     * @param {number} collectedCoins - The number of coins collected by the player.
     * @param {number} totalCollectedBottles - The number of bottles collected by the player.
     */
    drawCollectedItems(ctx, collectedCoins, totalCollectedBottles) {
        ctx.textAlign = "center";
        ctx.font = "bold 30px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(totalCollectedBottles, 260, 450);
        ctx.fillText(collectedCoins, 520, 450);
    }

    /**
     * Draws dividers (slashes) between the collected items on the canvas.
     * 
     * This method displays the dividers (slashes) between the collected bottles and coins on the canvas,
     * allowing for a clearer separation of these statistics.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context to draw the dividers on.
     */
    drawDividers(ctx) {
        ctx.textAlign = "center";
        ctx.font = "bold 30px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("/", 280, 450);
        ctx.fillText("/", 540, 450);
    }

    /**
     * Draws the total number of items (coins and bottles) on the canvas.
     * 
     * This method displays the total number of bottles and coins on the canvas,
     * showing the overall count for the player.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context to draw the total items on.
     * @param {number} numCoinsTotal - The total number of coins collected in the game.
     * @param {number} numBottlesTotal - The total number of bottles collected in the game.
     */
    drawTotalItems(ctx, numCoinsTotal, numBottlesTotal) {
        ctx.textAlign = "center";
        ctx.font = "bold 30px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(numBottlesTotal, 300, 450);
        ctx.fillText(numCoinsTotal, 560, 450);
    }

    /**
     * Loads a list of images and stores them in an image cache.
     * 
     * This method accepts an array of image paths, creates an image for each path,
     * and stores the image in an internal cache object for later use.
     *
     * @param {string[]} arr - An array of strings, where each string is the path to an image.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}