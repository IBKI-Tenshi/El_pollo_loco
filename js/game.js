let canvas;
let world;
let keyboard = new Keyboard();
let idleTime = 0; // Zähler für die Zeit ohne Tasteneingaben
let controlsEnabled = true; // Flagge, um Eingaben zu erlauben
let drawWorld = true; // Kontrolliert, ob die Welt gezeichnet werden soll
let actuallLevel = 1;

let isMuted = localStorage.getItem('isMuted') === 'true';
game_over_sound = new Audio('./audio/mama.mp3');
you_won_sound = new Audio('./audio/Victoria.mp3');
backgroundmusic = new Audio('./');

/**
 * Displays the start screen and initializes the game when clicked.
 * @returns {void}
 */
function showStartScreen() {
    document.getElementById('btnMute').textContent = isMuted ? '🔇 Mute' : '🔊 Sound';
    canvas = document.getElementById('canvas');
    const startScreen = new StartScreen(canvas, () => {
        startScreen.canvas.removeEventListener('click', startScreen.onClickCallback); // Entferne den Listener
        startScreen.ctx.clearRect(0, 0, canvas.width, canvas.height);
        init(actuallLevel);   
    });
    startScreen.draw();
}

/**
 * Displays the game over screen, stops all intervals, and restarts the game when clicked.
 * @returns {void}
 */
function showGameOverScreen() {
    stopAllIntervals();
    canvas = document.getElementById('canvas');
    const gameOverScreen = new GameOverScreen(canvas, () => {
        drawWorld = true;
        resetWorldObjects();
        gameOverScreen.ctx.clearRect(0, 0, canvas.width, canvas.height);
        init(actuallLevel);
    });
    gameOverScreen.draw();
    game_over_sound.muted = isMuted;
    if (!this.isMuted) {
        setTimeout(() => {
            game_over_sound.play();
        }, 300);
    }
}

/**
 * Displays the "You Won" screen, stops all intervals, and loads the next level when clicked.
 * @returns {void}
 */
function showYouWonScreen() {
    stopAllIntervals();
    canvas = document.getElementById('canvas');
    const youWonScreen = new YouWonScreen(canvas, () => {
        drawWorld = true;
        resetWorldObjects();
        youWonScreen.ctx.clearRect(0, 0, canvas.width, canvas.height);
        actuallLevel++; // das nächste level wird geladen
        init(actuallLevel);
    });
    youWonScreen.draw();
    you_won_sound.muted = isMuted;
    if (!this.isMuted) {
        setTimeout(() => {
            you_won_sound.play();
        }, 300);
    }
}

/**
 * Displays the game completion screen, stops all intervals, and redirects to the home page.
 * @returns {void}
 */
function showGameCompletedScreen() {
    stopAllIntervals();
    canvas = document.getElementById('canvas');
    const gameCompletedScreen = new GameCompletedScreen(canvas, () => {
        drawWorld = true;
        resetWorldObjects();
        gameCompletedScreen.ctx.clearRect(0, 0, canvas.width, canvas.height);
        backToHome();
    });
    gameCompletedScreen.draw();
    you_won_sound.muted = isMuted;
    if (!this.isMuted) {
        setTimeout(() => {
            you_won_sound.play();
        }, 300);
    }
}

/**
 * Redirects to the home page.
 * @returns {void}
 */
function backToHome() {
    window.location.href = 'index.html';
}

/**
 * Toggles the mute state of the game and updates the button text.
 * @returns {void}
 */
function audioControll() {
    isMuted = !isMuted;
    localStorage.setItem('isMuted', isMuted);
    if (world) {
        world.toggleMute(isMuted);
        world.character.toggleMute(isMuted);
        world.endboss.toggleMute(isMuted);
    }
    game_over_sound.muted = isMuted;
    you_won_sound.muted = isMuted;
    document.getElementById('btnMute').textContent = isMuted ? '🔇 Mute' : '🔊 Sound';
    document.getElementById('btnMute').blur(); // Entfernt den Fokus vom Mute-Button
}

/**
 * Initializes the game by setting up the world and the character.
 * @param {number} level - The level to initialize.
 * @returns {void}
 */
function init(level) {
    canvas = document.getElementById('canvas');
    controlsEnabled = true;
    drawWorld = true;
    idleTime = 0;
    initLevelInfo(level);
    initWorldSettings(canvas, keyboard, level);
    bindTouchEvents();
    checkCharacterEnergy();
    checkEndbossDefeated();
}

/**
 * Initializes the level-specific information based on the current level.
 * @param {number} level - The level to initialize.
 * @returns {void}
 */
function initLevelInfo(level) {
    if (level == 1) {
        this.initLevel1();
    } else if (level == 2) {
        this.initLevel2();
    } else {
        this.initLevel1();
    }
}

function initWorldSettings(canvas, keyboard, level) {
    world = new World(canvas, keyboard, level);
    world.character.startAnimation();
    world.level.enemies[0].startAnimation();
}

/**
 * Checks if the character's energy has reached zero, and if so, triggers the game over screen.
 * @returns {void}
 */
function checkCharacterEnergy() {
    setInterval(() => {
        if (world.character.energy <= 0 && drawWorld) {
            controlsEnabled = false;
            drawWorld = false;
            showGameOverScreen();
        }
    }, 100);
}

/**
 * Checks if the end boss is defeated and triggers the appropriate screen.
 * @returns {void}
 */
function checkEndbossDefeated() {
    setInterval(() => {
        if (world.endboss.energy <= 0 && controlsEnabled) {
            controlsEnabled = false;
            if (actuallLevel == 2) {
                setTimeout(() => {
                    showGameCompletedScreen();
                    drawWorld = false;
                }, 2000);
            } else {
                setTimeout(() => {
                    showYouWonScreen();
                    drawWorld = false;
                }, 2000);
            }
        }
    }, 100);
}

/**
 * Stops all intervals in the game, including those for the world and character.
 * @returns {void}
 */
function stopAllIntervals() {
    if (world) {
        world.stopGame(); // Beende alle laufenden Intervalle der Welt
        world.character.stopGame(); // Beende alle laufenden Intervalle des charackters
    }
}

/**
 * Resets the world objects, including the character and the end boss.
 * @returns {void}
 */
function resetWorldObjects() {
    world.character.energy = 100;
    world.character.x = 50;
    world.endboss.energy = 10;

    world.statusbar_health = null;
    world.statusbar_coin = null;
    world.statusbar_bottle = null;
    world.statusbar_endboss = null;
}

/**
 * Binds touch event listeners to the control buttons.
 * @returns {void}
 */
function bindTouchEvents() {
    if (!controlsEnabled) return; // Ignoriere Eingaben, wenn die Steuerung deaktiviert ist
    bindTouchStart();
    bindTouchEnd();
}

/**
 * Binds touch start event listeners to the control buttons.
 * @returns {void}
 */
function bindTouchStart() {
    document.getElementById('btnLeft').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btnRight').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btnJump').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('btnThrow').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.THROW = true;
    });
}

/**
 * Binds touch end event listeners to the control buttons.
 * @returns {void}
 */
function bindTouchEnd() {
    document.getElementById('btnLeft').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('btnRight').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('btnJump').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('btnThrow').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.THROW = false;
    });
}

/**
 * Event listener for the "keydown" event to handle keyboard input.
 * @param {KeyboardEvent} event - The keyboard event triggered by the user.
 * @returns {void}
 */
window.addEventListener("keydown", (event) => {
    if (!controlsEnabled) return;
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 68) {  // buchstabe d
        keyboard.THROW = true;
    }
});

/**
 * Event listener for the "keyup" event to handle keyboard input release.
 * @param {KeyboardEvent} event - The keyboard event triggered when a key is released.
 * @returns {void}
 */
window.addEventListener("keyup", (event) => {
    if (!controlsEnabled) return; // Ignoriere Eingaben, wenn die Steuerung deaktiviert ist
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {  // buchstabe d
        keyboard.THROW = false;
    }
});

/**
 * Resets the idle timer when any key is pressed.
 * @param {KeyboardEvent} event - The keyboard event triggered by the user.
 * @returns {void}
 */
window.addEventListener("keydown", (event) => {
    if (controlsEnabled) {
        idleTime = 0;
    }
});

/**
 * Increments the idle time every 100 milliseconds.
 * @returns {void}
 */
setInterval(() => {
    idleTime += 100; // Erhöht die Leerlaufzeit alle 200 Millisekunden
}, 100);