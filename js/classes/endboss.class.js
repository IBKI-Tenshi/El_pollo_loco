class Endboss extends MovableObject {

    images_walking = [
        "./assets/img/4_enemie_boss_chicken/1_walk/G1.png",
        "./assets/img/4_enemie_boss_chicken/1_walk/G2.png",
        "./assets/img/4_enemie_boss_chicken/1_walk/G3.png",
        "./assets/img/4_enemie_boss_chicken/1_walk/G4.png"
    ];
    images_alert = [
        "./assets/img/4_enemie_boss_chicken/2_alert/G5.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G6.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G7.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G8.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G9.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G10.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G11.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G12.png"
    ];
    images_attack = [
        "./assets/img/4_enemie_boss_chicken/3_attack/G13.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G14.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G15.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G16.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G17.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G18.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G19.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G20.png"
    ];
    images_hurt = [
        "./assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
        "./assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
        "./assets/img/4_enemie_boss_chicken/4_hurt/G23.png"
    ];
    images_dead = [
        "./assets/img/4_enemie_boss_chicken/5_dead/G24.png",
        "./assets/img/4_enemie_boss_chicken/5_dead/G25.png",
        "./assets/img/4_enemie_boss_chicken/5_dead/G26.png"
    ];


    height = 300;
    width = 250;
    y = 130;
    energy = 10;
    hadFirstContact = false;
    alive = true;
    i = 0;
    introInterval = 10;

    isMuted = localStorage.getItem('isMuted') === 'true';
    intro_sound = new Audio('./audio/chicken2.mp3');
    attack_sound = new Audio('./audio/chicken1.mp3');

    constructor(more_space) {

        super().loadImage(this.images_alert[0]);
        this.loadImages(this.images_walking);
        this.loadImages(this.images_alert);
        this.loadImages(this.images_attack);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);

        this.x = 2500 + more_space;

        // Standard Lautstärke setzen
        this.intro_sound.volume = 0.5;
        this.attack_sound.volume = 0.5;

        this.updateMuteState();
    }

    /**
     * Starts the animation of the endboss.
     * Calls the animate method.
     */
    startAnimation() {
        this.animate();
    }

    /**
     * Handles the animation of the endboss, including walking, alert, attacking, and death animations.
     * Plays sounds and triggers behavior based on the endboss's state.
     */
    animate() {
        this.updateDirection();
        this.animateEndbossStatus();
        this.introMovement();
    }

    updateDirection() {
        setInterval(() => {
            if (world.character.x > this.x) {
                this.otherDirection = true;
            } else {
                this.otherDirection = false;
            }
        }, 100)
    }

    animateEndbossStatus() {
        setInterval(() => {
            if (this.energy == 0) {
                this.playDeathAnimation();
            } else if (this.isHurt()) {
                this.playAnimation(this.images_hurt);
                if (!this.isAttacking) {
                    setTimeout(() => {
                        this.attack();
                    }, 2000);
                }
            } else if (this.isAttacking) {
                this.playAnimation(this.images_attack);
            } else if (this.i < this.introInterval) {
                this.playAnimation(this.images_walking);
            } else {
                this.playAnimation(this.images_alert);
            }
            this.i++;
            this.resetIntro();
        }, 300);
    }

    introMovement() {
        setInterval(() => {
            if (this.i < this.introInterval) {
                this.introMoveLeft();
            }
        }, 100);
    }

    resetIntro() {
        if (world.character.x > this.x - 1200 && !this.hadFirstContact) {
            this.i = 0;
            this.hadFirstContact = true;
            this.intro_sound.play();
        }
    }

    /**
     * Plays the death animation when the endboss's energy reaches 0.
     */
    playDeathAnimation() {
        let currentFrame = 0;

        if (this.alive) {
            const deathAnimationInterval = setInterval(() => {
                if (currentFrame < this.images_dead.length) {
                    this.img = this.imageCache[this.images_dead[currentFrame]];
                    currentFrame++;
                    this.y += 20;
                } else {
                    clearInterval(deathAnimationInterval);
                }
            }, 500);
        }
        this.alive = false;
    }

    /**
     * Handles the attack movement of the endboss.
     * The endboss moves left and triggers the attack sound.
     */
    attack() {
        this.isAttacking = true;
        let movecounter = 0;
        let interval = 40;
        this.attack_sound.play();

        setInterval(() => {
            if (this.energy > 0 && movecounter < interval) {
                if (this.otherDirection == false) {
                    this.attackMoveLeft();
                    movecounter++;
                    this.isAttacking = false;
                } else {
                    this.attackMoveRight();
                    movecounter++;
                    this.isAttacking = false;
                }
            }
        }, 1000 / 60);
    }

    /**
     * Moves the endboss to the left during an attack.
     */
    attackMoveLeft() {
        this.x -= 2.5;
    }

    /**
     * Moves the endboss to the right during an attack.
     */
    attackMoveRight() {
        this.x += 2.5;
    }

    /**
     * Moves the endboss to the left during the intro animation.
     */
    introMoveLeft() {
        this.x -= 3;
    }

    /**
     * Updates the mute state for the endboss's sounds.
     */
    updateMuteState() {
        this.intro_sound.muted = this.isMuted;
        this.attack_sound.muted = this.isMuted;
    }

    /**
     * Toggles the mute state for the endboss's sounds.
     * @param {boolean} isMuted - The new mute state to set.
     */
    toggleMute(isMuted) {
        this.isMuted = isMuted;
        this.updateMuteState();
    }
}