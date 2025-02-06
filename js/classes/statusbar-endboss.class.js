class StatusbarEndboss extends DrawableObjects {

    img_endboss = [
        './assets/img/7_statusbars/2_statusbar_endboss/green/green0.png',
        './assets/img/7_statusbars/2_statusbar_endboss/green/green20.png',
        './assets/img/7_statusbars/2_statusbar_endboss/green/green40.png',
        './assets/img/7_statusbars/2_statusbar_endboss/green/green60.png',
        './assets/img/7_statusbars/2_statusbar_endboss/green/green80.png',
        './assets/img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];

    percentage = 0;
    x;
    y = 100;

    constructor(endboss) {
        super();
        this.loadImages(this.img_endboss);
        this.setPercentage(this.endboss_health); 
        this.animate(endboss);
    }

    /**
     * Sets the health percentage of the Endboss and updates the displayed image accordingly.
     * 
     * @param {number} endboss_health - The current health of the Endboss (scaled to percentage).
     */
    setPercentage(endboss_health) {
        this.percentage = endboss_health * 10;

        let path = this.img_endboss[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the correct image index based on the Endboss's health percentage.
     * 
     * @returns {number} The index of the corresponding image in the img_endboss array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Animates the status bar by synchronizing its position with the Endboss.
     * Stops updating when the Endboss is defeated.
     * 
     * @param {Object} endboss - The Endboss instance being tracked.
     */

    animate(endboss) {
        const animationInterval = setInterval(() => {
            this.x = endboss.x + 40; // Synchronisiere die Position

            if (endboss.health <= 0) {
                clearInterval(animationInterval);
                this.removeFromLevel();
            }
        }, 1000 / 60);
    }
}