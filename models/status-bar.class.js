class StatusBarBottle extends DrawableObject {
    collectedBottles = 0;


    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ]

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 30;
        this.y = 15;
        this.width = 200;
        this.height = 60;
        this.setPercentageBottle(0);
    }

    /**
     * Sets the percentage of the bottle and updates the bottle image based on the percentage.
     * 
     * This method ensures that the percentage is between 0 and 100, updates the `percentage` property,
     * and updates the bottle image based on the resolved image index.
     * 
     * @param {number} percentage - The percentage value to set for the bottle (between 0 and 100).
     */
    setPercentageBottle(percentage) {
        this.percentage = Math.max(0, Math.min(percentage, 100));
        let path = this.IMAGES_BOTTLE[this.resolveImageIndexBottle()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index for the bottle based on its percentage.
     * 
     * This method returns an index corresponding to a specific bottle image based on the current 
     * percentage. The index helps to select the correct image from a set of predefined bottle images 
     * based on the percentage value.
     * 
     * @returns {number} The index of the bottle image based on the current percentage.
     */
    resolveImageIndexBottle() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage < 30) {
            return 1;
        } else if (this.percentage < 50) {
            return 2;
        } else if (this.percentage < 70) {
            return 3;
        } else if (this.percentage < 99) {
            return 4;
        } else {
            return 5;
        }
    }
}


class StatusBarHealth extends DrawableObject {

    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ]

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 30;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentageHealth(100);
    }

    /**
     * Sets the health percentage and updates the corresponding health image.
     * 
     * This method ensures that the health percentage stays between 0 and 100. It then determines
     * the appropriate health image based on the percentage and updates the image displayed.
     * 
     * @param {number} percentage - The health percentage to set. Should be between 0 and 100.
     */
    setPercentageHealth(percentage) {
        this.percentage = Math.max(0, Math.min(percentage, 100));
        let path = this.IMAGES_HEALTH[this.resolveImageIndexHealth()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the appropriate image index based on the current health percentage.
     * 
     * This method maps the health percentage to a corresponding image index. The health images 
     * are categorized into ranges, and this function returns the index of the image that corresponds 
     * to the current health percentage.
     * 
     * @returns {number} The index of the health image based on the current health percentage.
     */
    resolveImageIndexHealth() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}


class StatusBarCoins extends DrawableObject {
    collectedCoins = 0;

    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ]

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 30;
        this.y = 90;
        this.width = 200;
        this.height = 60;
        this.setPercentageCoins(0);
    }

    /**
     * Sets the percentage of collected coins and updates the corresponding image.
     * 
     * This method takes a percentage value representing the current coin collection status. 
     * It ensures that the percentage is stored and then updates the image based on the percentage 
     * by selecting an appropriate image from the `IMAGES_COINS` array.
     * 
     * @param {number} percentage - The current percentage of coins collected, where 0 to 100 represents the full range.
     */
    setPercentageCoins(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COINS[this.resolveImageIndexCoins()];
        this.img = this.imageCache[path];

    }

    /**
     * Resolves the image index based on the current percentage of collected coins.
     * 
     * This method returns an index that corresponds to the appropriate image in the 
     * `IMAGES_COINS` array, depending on the percentage of coins collected. 
     * The index changes based on predefined percentage thresholds.
     * 
     * @returns {number} The index of the image representing the current coin percentage.
     */
    resolveImageIndexCoins() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage < 30) {
            return 1;
        } else if (this.percentage < 50) {
            return 2;
        } else if (this.percentage < 70) {
            return 3;
        } else if (this.percentage < 99) {
            return 4;
        } else {
            return 5;
        }
    }
}


class StatusBarEndboss extends DrawableObject {
    statusBarEndbossVisible = false;

    IMAGES_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/green.png',
        'img/7_statusbars/2_statusbar_endboss/blue.png',
        'img/7_statusbars/2_statusbar_endboss/orange.png'
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES_ENDBOSS);
        this.x = 260;
        this.y = 15;
        this.width = 200;
        this.height = 60;
        this.setLifes(Endboss.lifes);
    }

    /**
     * Sets the number of lives and updates the image based on the current value.
     * 
     * This method sets the number of lives for the endboss and updates the 
     * image to reflect the appropriate state of the endboss based on the 
     * number of lives remaining. The image is selected from the `IMAGES_ENDBOSS` 
     * array using the index returned by the `resolveImageIndexEndboss` method.
     * 
     * @param {number} lifes - The number of lives to set for the endboss.
     */
    setLifes(lifes) {
        this.lifes = lifes;
        let path = this.IMAGES_ENDBOSS[this.resolveImageIndexEndboss()];
        this.img = this.imageCache[path];

    }

    /**
     * Resolves the image index for the endboss based on the number of lives remaining.
     * 
     * This method returns an index for selecting the appropriate image of the endboss 
     * from the `IMAGES_ENDBOSS` array, depending on how many lives the endboss has left.
     * 
     * @returns {number} The index of the image representing the current state of the endboss.
     */
    resolveImageIndexEndboss() {
        if (this.lifes == 3) {
            return 0;
        } else if (this.lifes == 2) {
            return 1;
        } else if (this.lifes == 1) {
            return 2;
        } else {
            return 0;
        }
    }
}