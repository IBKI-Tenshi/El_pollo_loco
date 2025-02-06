class Character extends MovableObject {

    height = 220;
    width = 130;
    x = 50;
    y = 10;
    world; // benötigt um die info der gedrückten tasten weiter zu geben
    speed = 7;
    isInAnimationState = false;
    isMuted = localStorage.getItem('isMuted') === 'true';
    walking_sound = new Audio('audio/walking.mp3');
    jumping_sound = new Audio('./audio/jump_short.mp3');
    intervalIds = [];

    constructor() {
        super().loadImage('./assets/img/2_character_pepe/1_idle/idle/I-1.png');

        this.loadImages(images_standing);
        this.loadImages(images_standing_long);
        this.loadImages(images_walking);
        this.loadImages(images_jump);
        this.loadImages(images_hurt);
        this.loadImages(images_dead);

        this.applyGravity();
        this.updateMuteState();
    }

    /**
     * Starts the character's animation and movement.
     * Calls functions to handle the animation and movement logic.
     *
     * @method
     */
    startAnimation() {
        this.runCharackter();
    }

    /**
     * Initiates the movement and animation intervals for the character.
     * Sets up the intervals for movement, animation, and hurt state.
     *
     * @method
     */
    runCharackter() {
        this.setStoppableInterval(this.moveCharackter, 1000 / 60);
        this.setStoppableInterval(this.prioIsHurtOverWalkinAnimation, 100);
        this.setStoppableInterval(this.animateCharacker, 200);
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
     * Handles the character's movement based on keyboard input.
     * Moves the character left or right and handles jumping.
     * Plays walking and jumping sounds when appropriate.
     *
     * @method
     */
    moveCharackter() {
        this.walking_sound.pause();

        this.moveCharackterLeft();
        this.moveCharackterRight();
        this.moveCharackterJump();
        
        this.world.camera_x = -this.x + 200; // Update camera position
    }

    moveCharackterLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) { // lässt pepe nicht weiter links als x = 0 laufen
            this.moveLeft();
            this.otherDirection = true;
            this.walking_sound.play();
        }
    }

    moveCharackterRight() {
        if (this.world.keyboard.RIGHT && this.x && this.x < this.world.level.level_end_x) { // lässt pepe nicht weiter als die länge(level_end_x) laufen
            this.moveRight();
            this.otherDirection = false;
            this.walking_sound.play();
        }
    }

    moveCharackterJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) { // verhindert sprung in der luft
            this.jump();
            this.jumping_sound.play()
        }
    }

    /**
     * Checks if the character is hurt and should be animated accordingly.
     * If moving and not jumping, it will play the walking animation.
     *
     * @method
     */
    prioIsHurtOverWalkinAnimation() {
        if (!this.isHurt() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround()) {
            this.playAnimation(images_walking);
        }
    }

    /**
     * Animates the character based on its state.
     * This includes idle, walking, jumping, hurt, and dead animations.
     * Also handles an idle animation after 5 seconds of inactivity.
     *
     * @method
     */
    animateCharacker() {
        if (this.isDead()) {
            this.playAnimation(images_dead);
        } else if (this.isHurt()) {
            this.playAnimation(images_hurt);
        } else if (this.isAboveGround()) {
            this.playAnimation(images_jump);
        } else if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT && !this.world.keyboard.DOWN && !this.world.keyboard.SPACE) {
            this.playAnimation(images_standing);
        }
        if ( // Animation nach 5 Sekunden Inaktivität
            idleTime >= 5000 && !this.world.keyboard.LEFT && !this.world.keyboard.RIGHT && !this.world.keyboard.DOWN && !this.world.keyboard.SPACE) {
            this.playAnimation(images_standing_long);
        }
    }

    /**
     * Stops all running intervals.
     */
    stopGame() {
        this.intervalIds.forEach(clearInterval); // Beende alle gespeicherten Intervalle
        this.intervalIds = [];
    }
    
    /**
     * Updates the mute state for the character's sound effects.
     *
     * @method
     */
    updateMuteState() {
        this.walking_sound.muted = this.isMuted;
        this.jumping_sound.muted = this.isMuted;
    }

    /**
     * Toggles the mute state of the game.
     * 
     * @param {boolean} isMuted The new mute state to apply.
     * @method
     */
    toggleMute(isMuted) {
        this.isMuted = isMuted;
        this.updateMuteState();
    }
}