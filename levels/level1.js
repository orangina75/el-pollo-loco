let level1;
numCoins = Math.round(10 + Math.random() * 10);
numCoinsTotal = numCoins + 15;
numBottles = Math.round(1 + Math.random() * 10);
numBottlesTotal = numBottles + 3;

/**
 * Initializes the level by creating enemies, coins, salsa bottles, health items,
 * and background objects with randomized positions. This function sets up all the 
 * entities required for a new game level, such as enemies, items, and background layers.
 * 
 * It creates:
 * - Normal enemies (e.g., `ChickenNormal`) with a random number and position.
 * - Small enemies (e.g., `ChickenSmall`) with a random number and position.
 * - A final boss (`Endboss`).
 * - Clouds (`Cloud`).
 * - Salsa bottles (`SalsaBottle`) placed randomly within a specified range.
 * - Coins (`Coins`) placed at various random positions.
 * - Health items (`Health`) placed at predefined positions.
 * - Background objects (`BackgroundObject`) that represent various layers.
 * 
 * Finally, it passes all the entities to the `Level` constructor to create the level.
 * 
 * @returns {void}
 */
function initLevel() {
    let enemiesNormal = [];
    let numEnemiesNormal = 5 + Math.random() * 7;
    let startPositionNormal = 2000 + Math.random() * 500;
    let endPositionNormal = 5000 + Math.random() * 500;

    for (let i = 0; i < numEnemiesNormal; i++) {
        let x = startPositionNormal + Math.random() * (endPositionNormal - startPositionNormal);
        enemiesNormal.push(new ChickenNormal(x));
    }

    let enemiesSmall = [];
    let numEnemiesSmall = 5 + Math.random() * 7;
    let startPositionSmall = 3000 + Math.random() * 500;
    let endPositionSmall = 6000 + Math.random() * 500;

    for (let i = 0; i < numEnemiesSmall; i++) {
        let x = startPositionSmall + Math.random() * (endPositionSmall - startPositionSmall);
        enemiesSmall.push(new ChickenSmall(x));
    }

    let endboss =
        [
            new Endboss()
        ]

    let clouds = [];
    let numClouds = 5;

    for (let i = 0; i < numClouds; i++) {
        clouds.push(new Cloud());
    }

    let salsaBottles = [];
    salsaBottles.push(new SalsaBottle(-200));
    salsaBottles.push(new SalsaBottle(-300));
    salsaBottles.push(new SalsaBottle(-400));
    let startPositionBottles = 1000;
    let endPositionBottles = 6000;

    for (let i = 0; i < numBottles; i++) {
        let x = startPositionBottles + Math.random() * (endPositionBottles - startPositionBottles);
        salsaBottles.push(new SalsaBottle(x));
    }

    let coins = [];
    coins.push(new Coins(-700, 80));
    coins.push(new Coins(-700, 180));
    coins.push(new Coins(-700, 280));
    coins.push(new Coins(500, 280));
    coins.push(new Coins(580, 220));
    coins.push(new Coins(660, 160));
    coins.push(new Coins(720, 220));
    coins.push(new Coins(800, 280));
    coins.push(new Coins(2000, 280));
    coins.push(new Coins(2080, 220));
    coins.push(new Coins(2160, 160));
    coins.push(new Coins(2220, 100));
    coins.push(new Coins(2300, 160));
    coins.push(new Coins(2380, 220));
    coins.push(new Coins(2460, 280));
    let startPositionCoinsX = 4000;
    let endPositionCoinsX = 6000;
    let startPositionCoinsY = 50;
    let endPositionCoinsY = 280;


    for (let i = 0; i < numCoins; i++) {
        let x = startPositionCoinsX + Math.random() * (endPositionCoinsX - startPositionCoinsX);
        let y = startPositionCoinsY + Math.random() * (endPositionCoinsY - startPositionCoinsY);
        coins.push(new Coins(x, y));
    }

    let health = [
        new Health(3000, 100),
        new Health(5000, 100)
    ];

    let backgroundObjects =
        [
            new BackgroundObject('img/5_background/layers/air.png', -719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 7),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 8),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 8),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 8),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 8),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 9),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 9),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 9),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 9),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 10),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 10),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 10),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 10),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 11),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 11),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 11),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 11)
        ]

    level1 = new Level({
        enemiesNormal: enemiesNormal,
        enemiesSmall: enemiesSmall,
        endboss: endboss,
        clouds: clouds,
        salsaBottles: salsaBottles,
        coins: coins,
        health: health,
        backgroundObjects: backgroundObjects
    });
}