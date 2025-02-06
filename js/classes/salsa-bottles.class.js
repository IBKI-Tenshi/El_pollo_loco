class Bottle extends MovableObject{

    height = 80;
    width = 80;
    y = 350;

    images_bottles = [
        './assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(more_space) {
        super().loadImage('./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.images_bottles);

        this.x = 200 + more_space; 

        this.animate();
    }

    
    animate() {
        setInterval(() => {
            this.playAnimation(this.images_bottles);
        }, 500);
    }

}