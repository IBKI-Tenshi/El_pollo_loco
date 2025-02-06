class ChickenSmall extends MovableObject {

    height = 80;
    width = 80;
    y = 330;
    energy = 2;

    images_walking = [
        './assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    img_dead = './assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    constructor(more_space) {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.images_walking);

        this.x = 700 + more_space; 
        this.speed = 0.15 + Math.random() * 0.25; // Zufällige Bewegungsgeschwindigkeit der Chicken

        this.animate();
        this.objectMovement();
    }

    /**
     * Animates the chicken based on energy.
     *
     * @method
     */
    animate() {
        const animationInterval = setInterval(() => {
            if (this.energy > 0) {
                this.playAnimation(this.images_walking);
            } else {
                this.y += 20;
                this.loadImage(this.img_dead);
                clearInterval(animationInterval);
            }
        }, 200);
    }

    objectMovement() {
        const movementInterval = setInterval(() => {
            if (this.energy > 0) {
                this.moveLeft();
            } else {
                clearInterval(movementInterval);
            }
        }, 1000 / 60);
    }
}