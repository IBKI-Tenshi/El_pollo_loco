class DrawableObjects {
    height = 60;
    width = 180;
    y = 8;

    img;
    imageCache = {}; // zwischenspeicher für alle bilder der animation
    currentImage = 0; // benötigt für die animation

    energy = 100;
    current_coins = 0;
    current_bottles = 0;
    endboss_health = 10;

    /**
     * Loads an image from the given path.
     * @param {string} path - The path to the image to load.
     */
    loadImage(path) {
        this.img = new Image();  // ist das gleiche wie this.img = document.getElementById('image')
        this.img.src = path;
    }


    /**
     * Loads multiple images from an array of paths and stores them in the image cache.
     * @param {string[]} array - An array of image paths to load.
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the current image of the object on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a frame around the object for debugging purposes.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
     */
    // drawFrame(ctx) {
    //     if (this instanceof Character || this instanceof ChickenNormal || this instanceof ChickenSmall || 
    //         this instanceof Endboss || this instanceof Coin || this instanceof Bottle || this instanceof ThrowableObject) { // wird nur bei Character und Chicken angewendet - weiter vererbt
    //         ctx.beginPath();
    //         ctx.lineWidth = '5';
    //         ctx.strokeStyle = 'blue';
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //     }
    // }
}