class StatusbarCoin extends DrawableObjects {

    img_coin = [
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    percentage = 0;

    constructor() {
        super();
        this.x = 200
        this.loadImages(this.img_coin);
        this.setPercentage(this.current_coins);
    }

    /**
     * Sets the percentage of collected coins and updates the displayed image accordingly.
     * 
     * @param {number} current_coins - The current percentage of collected coins.
     */
    setPercentage(current_coins) {
        this.percentage = current_coins;

        let path = this.img_coin[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the correct image index based on the percentage of collected coins.
     * 
     * @returns {number} The index of the corresponding image in the img_coin array.
     */
    resolveImageIndex() {
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