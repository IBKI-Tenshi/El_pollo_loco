let level2;

/**
 * Initializes level 2 of the game.
 * This function creates a new level with various game objects, including enemies, collectibles,
 * bottles, clouds, and background objects.
 * All objects are instantiated with specific positions and attributes.
 *
 */
function initLevel2() {
    level2 = new Level(
        [
            new Endboss(2000),

            new ChickenNormal(600),
            new ChickenNormal(900),
            new ChickenNormal(1800),
            new ChickenNormal(2500),
            new ChickenNormal(2800),

            new ChickenSmall(300),
            new ChickenSmall(1100),
            new ChickenSmall(2100),
            new ChickenSmall(3000),

        ],
        [
            new Coin(900, 0),
            new Coin(1000, 200),
            new Coin(1100, 0),
            new Coin(1300, 0),
            new Coin(1300, 200),
            new Coin(1500, 0),
            new Coin(1700, 0),
            new Coin(2500, 200),

            new Coin(3000, 0),
            new Coin(3000, 200),
        ],
        [
            new Bottle(100),
            new Bottle(150),
            new Bottle(500),
            new Bottle(1000),
            new Bottle(1500),
            new Bottle(1750),
            new Bottle(2000),
            new Bottle(2300),
            new Bottle(2600)
        ],
        [
            new Cloud('././assets/img/5_background/layers/4_clouds/1.png', 0.5),
            new Cloud('././assets/img/5_background/layers/4_clouds/1.png', 2),
            new Cloud('././assets/img/5_background/layers/4_clouds/2.png', 3),
            new Cloud('././assets/img/5_background/layers/4_clouds/1.png', 4),
            new Cloud('././assets/img/5_background/layers/4_clouds/2.png', 700),
            new Cloud('././assets/img/5_background/layers/4_clouds/1.png', 720),
            new Cloud('././assets/img/5_background/layers/4_clouds/2.png', 1620),
            new Cloud('././assets/img/5_background/layers/4_clouds/1.png', 1950),
            new Cloud('././assets/img/5_background/layers/4_clouds/2.png', 2200),

            new Cloud('././assets/img/5_background/layers/4_clouds/1.png', 2600),
            new Cloud('././assets/img/5_background/layers/4_clouds/1.png', 3000),
            new Cloud('././assets/img/5_background/layers/4_clouds/2.png', 3700),
            new Cloud('././assets/img/5_background/layers/4_clouds/1.png', 4500),
            new Cloud('././assets/img/5_background/layers/4_clouds/2.png', 5000),
        ],
        [
            new BackgroundObject('./assets/img/5_background/layers/air.png', -799),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', -799),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', -799),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', -799),

            new BackgroundObject('./assets/img/5_background/layers/air.png', 0),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('./assets/img/5_background/layers/air.png', 799),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 799),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 799),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 799),

            new BackgroundObject('./assets/img/5_background/layers/air.png', 799 * 2),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 799 * 2),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 799 * 2),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 799 * 2),
            new BackgroundObject('./assets/img/5_background/layers/air.png', 799 * 3),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 799 * 3),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 799 * 3),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 799 * 3),

            new BackgroundObject('./assets/img/5_background/layers/air.png', 799 * 4),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 799 * 4),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 799 * 4),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 799 * 4),
            new BackgroundObject('./assets/img/5_background/layers/air.png', 799 * 5),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 799 * 5),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 799 * 5),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 799 * 5),

            new BackgroundObject('./assets/img/5_background/layers/air.png', 799 * 6),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 799 * 6),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 799 * 6),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 799 * 6),
            new BackgroundObject('./assets/img/5_background/layers/air.png', 799 * 7),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 799 * 7),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 799 * 7),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 799 * 7),
        ]
    );
}