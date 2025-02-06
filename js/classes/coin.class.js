class Coin extends MovableObject{

    height = 100;
    width = 100;
    y = 100;

    images_coins = [
        './assets/img/8_coin/coin_1.png',
        './assets/img/8_coin/coin_2.png',
    ];

    constructor(more_spaceX, more_spaceY) {
        super().loadImage('./assets/img/8_coin/coin_1.png');
        this.loadImages(this.images_coins);

        this.x = 200 + more_spaceX; 
        this.y = 250 - more_spaceY; 

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.images_coins);
        }, 200);
    }

}