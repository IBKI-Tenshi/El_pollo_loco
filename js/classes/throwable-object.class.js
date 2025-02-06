class ThrowableObject extends MovableObject {

    images_throw = [
        './assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    images_splash = [
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(character, x, y) {
        super().loadImage('./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.images_throw);
        this.loadImages(this.images_splash);
        this.character = character;
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 70;

        this.throw(x, y);
        this.animate();
    }

    /**
     * Starts the rotation animation for the flying object.
     */
    animate() {
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.images_throw);
        }, 100);
    }

    /**
     * Triggers the splash animation when the object hits the ground.
     * The animation runs for 1 second before the object is removed.
     * 
     * @param {Array<ThrowableObject>} bottle_array - The array containing the thrown objects.
     */
    splashAnimation(bottle_array) {
        clearInterval(this.animationInterval); // Stoppe die Dreh-Animation

        this.speed = 0;
        this.speedY = 0;

        this.animationInterval = setInterval(() => {
            this.playAnimation(this.images_splash);
        }, 70);

        setTimeout(() => {
            clearInterval(this.animationInterval);
            this.removeFromLevel(bottle_array);
        }, 1000);
    }

    /**
     * Removes the bottle from the level after the splash animation finishes.
     * 
     * @param {Array<ThrowableObject>} bottle_array - The array containing the thrown objects.
     */
    removeFromLevel(bottle_array) {
        bottle_array.splice(1, 1);
    }

    /**
     * Initiates the throw movement of the object.
     */
    throw() {
        this.speed = 30;
        this.speedY = 18;
        this.applyGravity();
        this.throwBottle();

        if (this.character.otherDirection) {
            this.x -= this.character.width;
            this.throwLeft();
        } else {
            this.throwRight();
        }
    }

    throwLeft() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 25);
    }

    throwRight() {
        setInterval(() => {
            this.moveRight();
        }, 1000 / 25);
    }
}
