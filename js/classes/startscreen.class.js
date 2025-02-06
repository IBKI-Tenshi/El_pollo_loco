class StartScreen {
    constructor(canvas, onClickCallback) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.onClickCallback = onClickCallback;
        this.clickHandler = this.handleClick.bind(this);
    }

    /**
     * Draw the startscreen with a background image and a window to proceed.
     */
    draw() {
        const backgroundImage = new Image();
        backgroundImage.src = './assets/img/website_images/startscreen_2.png';

        backgroundImage.onload = () => {
            // Zeichne das Bild auf den Canvas
            this.ctx.drawImage(backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
            
            // Zeichne das Fenster mit dem Text
            setTimeout(() => {
                this.drawTapToStartWindow();  
            }, 1000);

            this.enableClick(); // Aktivieren des Klicks, nachdem das Bild geladen ist
        };
    }

    /**
     * Draw the window with the 'Tap to Start' text.
     */
    drawTapToStartWindow() {
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
        this.ctx.fillText('Tap to Start', this.canvas.width / 2, this.canvas.height / 2);
    }

    /**
     * Enables the click event listener on the canvas to start the game when the user clicks.
     */
    enableClick() {
        this.canvas.addEventListener('click', this.clickHandler);
    }

    /**
     * Handles the click event by disabling the click listener, clearing the canvas, and calling the provided callback.
     */
    handleClick() {
        this.disableClick();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.onClickCallback();
    }

    /**
     * Disables the click event listener to prevent multiple clicks.
     */
    disableClick() {
        this.canvas.removeEventListener('click', this.clickHandler);
    }
}
