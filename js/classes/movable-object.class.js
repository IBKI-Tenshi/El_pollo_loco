
class MovableObject extends DrawableObjects {

    otherDirection = false;
    speed = 0.15; // Bewegungsgeschwindigkeit der animierten Objekte
    speedY = 0;
    acceleration = 1; // gravitation - beschleunigung nach unten
    lastHit = 0;

    /**
     * Applies gravity to the object, causing it to fall if above ground.
     * Gravity is applied by decreasing the vertical speed (`speedY`) over time.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 20);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} - Returns `true` if the object is above the ground or 
     * falling, otherwise `false`.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { // throwableObject soll immer fallen
            return true;
        } else {
            return this.y < 190; // hier muss der y wert des charackters rein
        }
    }

    /**
     * Checks if two objects are colliding based on their position and dimensions.
     * 
     * This method checks for overlap between two rectangular objects (mainObject and secondaryObject)
     * based on their `x`, `y`, `width`, and `height` properties. It considers an optional offset
     * to adjust the collision detection area.
     *
     * @param {Object} secondaryObject - The second object (usually an enemy or obstacle) to check for collision with.
     * @param {Object} mainObject - The primary object (usually the player or a movable object) to check for collision.
     * @param {number} offset - The offset to adjust the collision detection area, typically used to fine-tune the detection.
     * @returns {boolean} - Returns `true` if the two objects are colliding, otherwise `false`.
     */
    isColliding(secondaryObject, mainObject, offset) {
        return mainObject.x + mainObject.width - offset > secondaryObject.x &&
            mainObject.y + mainObject.height > secondaryObject.y &&
            (mainObject.x < secondaryObject.x || mainObject.x + offset < secondaryObject.x + secondaryObject.width) &&
            mainObject.y < secondaryObject.y + secondaryObject.height;
    }

    /**
     * Checks if the object is jumping on top of another object (usually an enemy).
     * @param {Object} enemy - The enemy object to check for a jump on top of.
     * @param {Object} mo - The movable object to check for jumping.
     * @returns {boolean} - `true` if the object is jumping on top of the enemy, `false` otherwise.
     */
    isJumpingOn(enemy, mo) {
        const tolerance = 30; // Toleranz für die Höhe
        return (
            mo.x + mo.width - 50 >= enemy.x && // rechter Rand des Charakters überlappt mit linker Rand des Gegners
            (mo.x < enemy.x || mo.x + 50 < enemy.x + enemy.width) &&
            mo.y + mo.height >= enemy.y - tolerance && // unterer Rand des Charakters ist in Toleranz über/auf dem oberen Rand des Gegners
            mo.y + mo.height <= enemy.y + tolerance    // unterer Rand des Charakters ist nicht zu weit unter dem oberen Rand des Gegners
        );
    }

    /**
     * Reduces the object's energy by 2 and updates the time of the last hit.
     * The energy cannot go below 0.
     */
    isHit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is still hurt from a previous hit.
     * @returns {boolean} - `true` if the object was hit within the last 2 seconds, `false` otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // differenz in ms
        timepassed = timepassed / 1000; // differenz in s
        return timepassed < 2;
    }

    /**
     * Checks if the object is dead (energy is 0).
     * @returns {boolean} - `true` if the object's energy is 0, `false` otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Increases the object's coin count, up to a maximum of 100 coins.
     */
    getCoin() {
        this.current_coins += 25;
        if (this.current_coins > 100) {
            this.current_coins = 100;
        }
    }

    /**
     * Increases the object's bottle count by 25.
     * maximum bottles are an option
     */
    getBottle() {
        this.current_bottles += 25;

        // optional fügt maximale anzahl hinzu
        // if (this.current_bottles > 100) {
        //     this.current_bottles = 100;
        // }
    }

    /**
     * Decreases the object's bottle count by 25 when a bottle is thrown.
     */
    throwBottle() {
        this.current_bottles -= 25;
        if (this.current_bottles <= 0) {
            this.current_bottles = 0;
        }
    }

    /**
     * Makes the object jump by setting a positive vertical speed (`speedY`).
     */
    jump() {
        this.speedY = 20;
    }

    /**
     * Moves the object to the left by decreasing its `x` position.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Moves the object to the right by increasing its `x` position.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Plays an animation by cycling through the given images array.
     * @param {Array<string>} images_array - An array of image paths for the animation.
     */
    playAnimation(images_array) {
        let index = this.currentImage % images_array.length;
        let path = images_array[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}