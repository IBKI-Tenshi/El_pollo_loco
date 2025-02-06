class BackgroundObject extends MovableObject {

    width = 800;
    height = 450;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = this.width - this.width;
    }
}