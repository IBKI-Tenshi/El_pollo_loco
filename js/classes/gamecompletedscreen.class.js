class GameCompletedScreen {
    constructor(canvas, onClickCallback) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.onClickCallback = onClickCallback; // Callback für den Neustart
    }

    /**
     * Draw the game completed screen with a background image and a window to proceed.
     */
    draw() {
        const backgroundImage = new Image();
        backgroundImage.src = './assets/img/9_intro_outro_screens/win/won_2.png';
        backgroundImage.onload = () => {
            this.ctx.drawImage(backgroundImage, 0, 0, this.canvas.width, this.canvas.height);

            setTimeout(() => {
                this.drawTapForNextLevelWindow();
            }, 1000);

            this.enableClick();
        };
    }

    /**
     * Draw the window with the "Tap for Next Level" text.
     */
    drawTapForNextLevelWindow() {
        const windowWidth = 1000;
        const windowHeight = 450;
        const windowX = (this.canvas.width - windowWidth) / 2;
        const windowY = (this.canvas.height - windowHeight) / 2;

        // Fenster zeichnen
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        this.ctx.fillRect(windowX, windowY, windowWidth, windowHeight);

        // Text zeichnen
        this.ctx.font = '64px Zabars';
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('congratulations game completed', this.canvas.width / 2, this.canvas.height / 2);
    }

    /**
     * Enable the click event on the canvas that triggers the onClickCallback.
     * The click event will only trigger once.
     */
    enableClick() {
        this.canvas.addEventListener('click', this.onClickCallback, { once: true });
    }
}
