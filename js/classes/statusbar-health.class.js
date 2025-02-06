class StatusbarHealth extends DrawableObjects {

    img_health = [
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    percentage = 100;

    constructor() {
        super();

        this.x = 20;

        this.loadImages(this.img_health);

        this.setPercentage(this.energy);
    }

    /**
     * Sets the health percentage of the player and updates the displayed image accordingly.
     * 
     * @param {number} energy - The current health of the player.
     */
    setPercentage(energy) {
        this.percentage = energy;

        let path = this.img_health[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the correct image index based on the player's health percentage.
     * 
     * @returns {number} The index of the corresponding image in the img_health array.
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