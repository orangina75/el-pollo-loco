class Level {
    enemiesNormal;
    enemiesSmall;
    endboss;
    clouds;
    salsaBottles;
    coins;
    health;
    backgroundObjects;
    level_end_x = 8000;

    constructor({enemiesNormal = [], enemiesSmall = [], endboss = [], clouds = [], salsaBottles = [], coins = [], health = [], backgroundObjects = []}) {
        this.enemiesNormal = enemiesNormal;
        this.enemiesSmall = enemiesSmall;
        this.endboss = endboss;
        this.clouds = clouds;
        this.salsaBottles = salsaBottles;
        this.coins = coins;
        this.health = health;
        this.backgroundObjects = backgroundObjects;
    }
}
