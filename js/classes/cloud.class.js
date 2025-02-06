class Cloud extends MovableObject {

    y = 20;
    height = 250;
    width = 650;

    constructor(image_path, more_space) {
        super().loadImage(image_path);

        this.x = 100 + more_space;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }



}