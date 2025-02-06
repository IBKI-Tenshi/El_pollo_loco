let level1;

/**
 * Initializes level 1 of the game.
 * This function creates a new level with various game objects, including enemies, collectibles,
 * bottles, clouds, and background objects.
 * All objects are instantiated with specific positions and attributes.
 *
 */
function initLevel1() {
    level1 = new Level(
        [
            new Endboss(3000),

            new ChickenNormal(600),
            new ChickenNormal(1000),
            new ChickenNormal(2000),
            new ChickenNormal(3500),
            new ChickenNormal(4000),

            new ChickenSmall(100),
            new ChickenSmall(1500),
            new ChickenSmall(2500),
            new ChickenSmall(3000),

        ],
        [
            new Coin(500, 200),
            new Coin(550, 200),
            new Coin(600, 200),
            new Coin(650, 200),
            new Coin(700, 200),

            new Coin(2000, 0),
            new Coin(2050, 200),
            new Coin(2150, 0),
            new Coin(2200, 200),
            new Coin(2250, 0),
            new Coin(2300, 200),

            new Coin(3600, 0),
            new Coin(3800, 200),
            new Coin(4000, 0),
            new Coin(4150, 200),
            new Coin(4300, 0),
            new Coin(4500, 200)
        ],
        [
            new Bottle(100),

            new Bottle(1000),
            new Bottle(1500),
            new Bottle(2600),
            new Bottle(2700),
            new Bottle(3650),
            new Bottle(3700),
            new Bottle(3750)
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

            new BackgroundObject('./assets/img/5_background/layers/air.png', 799 * 8),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 799 * 8),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 799 * 8),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 799 * 8),
            new BackgroundObject('./assets/img/5_background/layers/air.png', 799 * 9),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 799 * 9),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 799 * 9),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 799 * 9),
        ]
    );
}