class World {
    character = character_pepe;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    level;
    endboss;

    statusbar_health = new StatusbarHealth();
    statusbar_coin = new StatusbarCoin();
    statusbar_bottle = new StatusbarBottle();
    statusbar_endboss;

    throwableObjects = [];
    throwInProgress = false; // Flag, um Dauerwürfe zu verhindern
    throw_blockade = false

    intervalIds = []; // Array, um alle Intervalle zu speichern

    isMuted = localStorage.getItem('isMuted') === 'true';

    get_coin_sound = new Audio('./audio/uhDinero.mp3');
    get_hurt_sound = new Audio('./audio/ayyy.mp3');
    get_bottle_sound = new Audio('./audio/caliente.mp3');
    throw_bottle_sound = new Audio('./audio/sriracha.mp3');

    constructor(canvas, keyboard, level) {
        this.initLevel(level);
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.endboss = this.level.enemies[0];
        this.statusbar_endboss = new StatusbarEndboss(this.endboss);

        this.draw();
        this.setWorld();
        this.run();
        this.updateMuteState();
    }

    /**
     * This function initializes all Level-Objects
     * 
     * @param {number} level - This is the number of the corresponding function for initializing the level.
     */
    initLevel(level) {
        if (level == 1) {
            this.level = level1;
        } else if (level == 2) {
            this.level = level2;
        } else {
            this.level = level1;
        }
    }

    /**
     * Assigns the world reference to the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the main game loop by setting interval-based checks.
     */
    run() {
        let ms = 50;

        this.setStoppableInterval(this.checkJumpOnEnemy, ms);
        this.setStoppableInterval(this.checkCollisions, ms * 1.5);
        this.setStoppableInterval(this.checkGetCoin, ms);
        this.setStoppableInterval(this.checkGetBottle, ms);
        this.setStoppableInterval(this.checkThrowObjects, ms);
        this.setStoppableInterval(this.updatEndbossHealth, ms);
    }

    /**
     * Creates an array with the intervals that can be stopped later.
     * 
     * @param {Function} fn - The function to execute in the interval.
     * @param {number} time - The interval time in milliseconds.
     */
    setStoppableInterval(fn, time) {
        let id = setInterval(fn.bind(this), time);
        this.intervalIds.push(id);
    }

    /**
     * Stops all running intervals.
     */
    stopGame() {
        this.intervalIds.forEach(clearInterval);
        this.intervalIds = [];
    }

    /**
     * Checks for collisions between the character and enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy, this.character, 50) && enemy.energy > 0) {
                this.character.isHit();
                if (!this.isMuted) {
                    this.get_hurt_sound.play();
                }
                this.statusbar_health.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks if the character jumps on an enemy and eliminates it.
     */
    checkJumpOnEnemy() {
        setInterval(() => {
            this.level.enemies.forEach((enemy, index) => {
                if (this.character.isJumpingOn(enemy, this.character) && !enemy.markedForDeletion && this.character.speedY < 0) {
                    enemy.isHit();

                    if (enemy.energy <= 0) {
                        enemy.markedForDeletion = true; // Markiere Gegner zum Löschen
                        this.deleteEnemy(index);
                    }
                }
            });
        }, 100);
    }

    /**
     * Checks if the character collects a coin.
     */
    checkGetCoin() {
        this.level.coins.forEach((item, index) => {
            if (this.character.isColliding(item, this.character, 50)) {
                if (!this.isMuted) {
                    if (!this.get_coin_sound.paused) {
                        this.get_coin_sound.currentTime = 0;
                    }
                    this.get_coin_sound.play();
                }
                this.character.getCoin();
                this.level.coins.splice(index, 1);
                this.statusbar_coin.setPercentage(this.character.current_coins);
            }
        });
    }

    /**
     * Checks if the character collects a bottle.
     */
    checkGetBottle() {
        this.level.bottles.forEach((item, index) => {
            if (this.character.isColliding(item, this.character, 50)) {
                if (!this.isMuted) {
                    this.get_bottle_sound.play();
                }
                this.character.getBottle();
                this.level.bottles.splice(index, 1);
                this.statusbar_bottle.setPercentage(this.character.current_bottles);
            }
        });
    }

    /**
     * Checks if the player attempts to throw a bottle.
     * Ensures that a bottle is thrown only if the throw key is pressed, 
     * the character has bottles available, and no throw is already in progress.
     */
    checkThrowObjects() {
        if (this.keyboard.THROW && !this.throwInProgress && this.character.current_bottles > 0 && this.throw_blockade == false) {
            this.character.throwBottle();
            this.throw_blockade = true;
            let bottle = new ThrowableObject(this.character, (this.character.x + this.character.width / 2), (this.character.y + this.character.height / 2));
            this.throwableObjects.push(bottle);
            this.statusbar_bottle.setPercentage(this.character.current_bottles);
            if (!this.isMuted) {
                this.throw_bottle_sound.play();
            }
            this.checkThrowCollision(bottle);
            this.throwInProgress = true;
            setTimeout(() => {
                this.throw_blockade = false;
            }, 2500);
        }
        if (!this.keyboard.THROW) {
            this.throwInProgress = false;
        }
    }

    /**
     * Checks if a thrown bottle collides with an enemy.
     * If a collision is detected, the enemy takes damage, 
     * and the bottle triggers its splash animation.
     * 
     * @param {Object} bottle - The thrown bottle object.
     */
    checkThrowCollision(bottle) {
        setInterval(() => {
            this.level.enemies.forEach((enemy, index) => {
                if (!bottle.hasHit && bottle.isColliding(enemy, bottle, 25)) {
                    enemy.isHit();
                    bottle.splashAnimation(this.throwableObjects);
                    if (enemy.energy <= 0 && enemy !== this.endboss) {
                        this.deleteEnemy(index);
                    }
                    bottle.hasHit = true;
                }
            });
        }, 100);
    }

    /**
     * Updates the endboss's health status and adjusts the endboss health bar.
     */
    updatEndbossHealth() {
        this.endboss_health = this.endboss.energy;
        this.statusbar_endboss.setPercentage(this.endboss_health);
    }

    /**
     * Removes an enemy from the level after a short delay.
     * This delay ensures that any death animations can play before the enemy disappears.
     * 
     * @param {number} index - The index of the enemy to remove.
     */
    deleteEnemy(index) {
        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 500);
    }

    /**
     * Renders the game world onto the canvas.
     * This function continuously draws the game elements, 
     * handles camera movement, and ensures objects are correctly displayed.
     */
    draw() {
        if (!drawWorld) return;
        this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width); // löscht das canvas
        this.ctx.translate(this.camera_x, 0); // Verschiebt den Canvas-Bereich um den Wert von camera_x auf der X-Achse // Das simuliert die Kamerabewegung
        this.drawBackground();
        this.drawMapObjects();
        this.drawStaticStatusbar();
        this.drawEndbossStatusbar();
        this.ctx.translate(-this.camera_x, 0); // Verschiebt den Canvas-Bereich wieder zurück, um den Ausgangspunkt wiederherzustellen

        if (drawWorld) { // draw() wird kontinuierlich aufgerufen
            let self = this;
            requestAnimationFrame(function () {
                self.draw();
            });
        }
    }

    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
    }

    drawMapObjects() {
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
    }

    drawStaticStatusbar() {
        this.ctx.translate(-this.camera_x, 0); // zurück // statusbars verschieben sich nicht
        this.addToMap(this.statusbar_health);
        this.addToMap(this.statusbar_coin);
        this.addToMap(this.statusbar_bottle);
        this.ctx.translate(this.camera_x, 0); // weiter // statusbars verschieben sich nicht
    }

    drawEndbossStatusbar() {
        this.addToMap(this.statusbar_endboss);
    }

    /**
     * Adds multiple objects to the map.
     * This method loops through an array of objects and adds each one individually using `addToMap`.
     *
     * @param {Array} objects The objects to be added to the map.
     * @returns {void}
     */
    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    /**
     * Adds a single object to the map.
     * If the object has a property `otherDirection`, it will flip the image before drawing and restore it afterward.
     *
     * @param {Object} mo The object to be added to the map.
     * @returns {void}
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image of an object horizontally.
     * Is used when the character moves left or right on the screen.
     *
     * @param {Object} mo The object whose image will be flipped.
     * @returns {void}
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width / 2, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the flipped image of an object.
     * Is used to return the character to its original horizontal position.
     *
     * @param {Object} mo The object whose image will be restored.
     * @returns {void}
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Toggles the mute state of the sound effects.
     *
     * @param {boolean} isMuted The desired mute state. `true` to mute, `false` to unmute.
     * @returns {void}
     */
    toggleMute(isMuted) {
        this.isMuted = isMuted;
        this.updateMuteState();
    }

    /**
     * Updates the mute state of all sound effects.
     * This method sets the `muted` property of each sound effect based on the current mute state.
     *
     * @returns {void}
     */
    updateMuteState() {
        this.get_coin_sound.muted = this.isMuted;
        this.get_hurt_sound.muted = this.isMuted;
        this.get_bottle_sound.muted = this.isMuted;
        this.throw_bottle_sound.muted = this.isMuted;
    }
}