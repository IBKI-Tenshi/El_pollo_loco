class StatusbarBottle extends DrawableObjects {

    img_bottle = [
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    percentage = 0;

    constructor() {
        super();

        this.x = 380

        this.loadImages(this.img_bottle);

        this.setPercentage(this.percentage); 
    }

    /**
     * Sets the percentage of collected bottles and updates the displayed image accordingly.
     * 
     * @param {number} current_bottles - The current percentage of collected bottles.
     */
    setPercentage(current_bottles) {
        this.percentage = current_bottles;

        let path = this.img_bottle[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the correct image index based on the percentage of collected bottles.
     * 
     * @returns {number} The index of the corresponding image in the img_bottle array.
     */
    resolveImageIndex() {
        if (this.percentage > 100) {
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