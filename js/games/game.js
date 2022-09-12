function checkIsMobile () {
    /**
     * Used to check if the device is mobile.
     * 
     * @return {bool} True if running in a mobile device, False if desktop.
     */
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
};

// Define status for the game. This controls the game's behaviour.
const PLAY_STATUS = Object.freeze({
	INACTIVE: Symbol(0),
	PLAYING: Symbol(1),
	PAUSED: Symbol(2)
});

class Game {
    constructor() {
        /**
         * Create the Game Object.
         * Setup it's canvas/context, bind controls, resize canvas dynamically and setup basic flags and variables.
         */
        
        // Get Canvas and Score HTMLElements
        this._canvas = document.getElementById('game-canvas');
        this._scoreEl = document.getElementById('game-score');
        
        // Define Context and it's settings
        this._ctx = this._canvas.getContext('2d');
        // This ensure images aren't smoothed/blurred, instead staying pixelated
        this._ctx.webkitImageSmoothingEnabled = false;
        this._ctx.mozImageSmoothingEnabled = false;
        this._ctx.imageSmoothingEnabled = false;

        // Resize the canvas to fill browser window dynamically
        this._resizeCanvas();
        window.addEventListener('resize', this._resizeCanvas.bind(this), false);
        
        // Bind the controls
        this.bindControls();

        // Setup Flags and Variables. PlayStatus becomes Inactive, HighScore is 0.
        this._playStatus = PLAY_STATUS.INACTIVE;
        this._highScore = 0;

        // Run reset function to finish setup.
        this._reset();
    }
    bindControls() {
        /**
         * Setup the game's controls.
         * This function is empty by default. It's called when initializing the Game class.
         * Each game should override this function.
         */
    }
    drawFrame() {
        /**
         * Draw everything each frame.
         * This function is empty by default. It's called when initializing the Game class.
         * Each game should override this function.
         */
    }
    drawRect( { position, size } ) {
        /**
         * Draw a rectangle on the canvas.
         * 
         * @param {Object} position The X and Y position of the rectangle. { x, y }
         * @param {Object} size The size of the rectangle, set as an object of { x: width, y: height }
         */

        this._ctx.fillRect( position.x, position.y, size.x, size.y );
    }
    drawImage({ ctx, img, position, size, imageSection }) {
        /**
         * Draw an image on the canvas.
         * 
         * @param {Object} img The image to draw
         * @param {Object} position The X and Y position of the image. { x, y }
         * @param {Object} size The size of the image, set as an object of { x: width, y: height }
         * @param {Object} imageSection If just drawing part of the image, draw this part. { x, y, width, height }
         */

        let isHidden = ( ctx != undefined );
        if ( !ctx ) {
            ctx = this._ctx;
        }

        // This ensure images aren't smoothed/blurred, instead staying pixelated
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

        // Draw the image
        if ( imageSection ) {
            this._drawSectionedImage({ ctx, img, position, size, imageSection });
        } else if ( size ) {
            this._drawSizedImage({ ctx, img, position, size });
        } else {
            this._drawImage({ ctx, img, position });
        }

        if ( isHidden ) {
            // Then change the composite operate so it combines with the fillRect
            ctx.globalCompositeOperation = "source-in";
            // This fillRect will recolor the image
            ctx.fillRect( 0, 0, size.x, size.y );
            // Reset the globalCompositeOperation
            ctx.globalCompositeOperation = "source-over";
        }
    }
    _drawImage({ ctx, img, position }){
        ctx.drawImage( img, position.x, position.y );
    }
    _drawSizedImage({ ctx, img, position, size }) {
        ctx.drawImage( img, position.x, position.y, size.x, size.y );
    }
    _drawSectionedImage({ ctx, img, position, size, imageSection }){
        ctx.drawImage( img, imageSection.x, imageSection.y, imageSection.width, imageSection.height, position.x, position.y, size.x, size.y );
    }
    _resizeCanvas() {
        /**
         * Automatically rezises the canvas to the window's size.
         */

        // Set the width
        this._canvas.width = window.innerWidth;

        // window.innerHeight is the entire height of the window, need to subtract the header's height to get full available size.
        let headerHeight = document.querySelector('header').clientHeight;
        this._canvas.height = window.innerHeight - headerHeight;

        // Update the colors, because when resizing the colors may break.
        this.updateColors();

        this.height = this._canvas.height;
        this.width = this._canvas.width;
    }
    updateColors() {
        /**
         * Set the context fill style to the accent color.
         * If more colors are used, this is where they'll be setup, however, as it stands the only color used is the accent color.
         */
        this._ctx.fillStyle = getComputedStyle( document.body ).getPropertyValue( '--accent-color' );
    }
    play( activate = true ) {
        /**
         * Handles whether to pause or play.
         * If the game is inactive, it runs the reset code and then plays. If paused, just plays. If playing pauses.
         * 
         * @param {bool} [activate = true] If this is set to false, it will check if the game is playing and pause it, then return.
         */

        // If not supposed to activate, check if the game is playing and pause it.
        if ( activate === false ) {
            if ( this._playStatus == PLAY_STATUS.PLAYING ) {
                this._playStatus = PLAY_STATUS.PAUSED;
            }
            // Whether it's playing or not, return.
            return;
        }
        
        // If can activate, check the current Play Status.
        switch (this._playStatus) {
            case PLAY_STATUS.PLAYING:
                // The game is already active, pause it.
                this._playStatus = PLAY_STATUS.PAUSED;
            break;
            case PLAY_STATUS.PAUSED:
                // The game is paused, activate it.
                this._play();
            break;
            default:
                // The game was inactive, so reset it and then play it.
                this._reset();
                this._play();
            break;
        }
    }
    _play() {
        /**
         * Sets the Play Status to Playing, updates the colors and runs the first update.
         */

        this._playStatus = PLAY_STATUS.PLAYING;
        this.updateColors();
        this.update();
    }
    endGame() {
        /**
         * Ends the game:
         * - Set the Play Status to inactive
         * - Save the High Score
         * - Draw the GAME OVER Screen
         * - Setup a listener to restart the game
         */

        // Deactivate Game Logic
        this._playStatus = PLAY_STATUS.INACTIVE;
        
        // If the Current Score is higher than the High Score, save it.
        this._highScore = ( this._score > this._highScore ) ? this._score : this._highScore

        // Draw the GAME OVER Screen ( on the next frame otherwise it doesn't clear the screen )
        requestAnimationFrame(this._drawEndGame.bind(this));

        // Add an event listener so when the player clicks anywhere in the game, the game restarts. Only triggers ONCE!
        this._canvas.addEventListener('click', (e) => {
            this.play();
        }, {once: true});
    }
    _drawEndGame() {
        /**
         * Draw the GAME OVER screen.
         */

        // Clear the screen.
        this.clear();

        // Align the text to the center.
        this._ctx.textAlign = "center";

        // Define the text, style and position for GAME OVER, try again and high score. Use the mobile values, if it's not mobile, override at the end.
        //  Define the GAME OVER text, style and position.
        let gameOver = {
            text: "GAME OVER",
            font: 0.1 * window.innerWidth + "px Upheavtt",
            offset: -30
        }

        //  Define the Try Again text, style and position. This one requires translation, so do that first.
        //   Define the translations;
        var translations = {
            'en': "Press anywhere to try again",
            'pt': "Carregue para tentar novamente"
        };
        //   Get the current Lang;
        let lang = window.location.pathname.substring(1,3);
        //   Finally, setup the variable.
        let tryAgain = {
            text: translations[lang],
            font: 0.05 * window.innerWidth + "px Upheavtt",
            offset: 5
        }

        //  Define the HighScore text, style and position. The text is "Highscore: x", where x is the HighScore value.
        let highScore = {
            text: `Highscore: ${this._highScore}`,
            font: 0.05 * window.innerWidth + "px Upheavtt",
            offset: 35
        }

        //  Instead of using multiple ifs, once everything has been defined check if it's not mobile and override the styles.
        if ( !checkIsMobile() ) {
            gameOver.font = "5rem Upheavtt",
            gameOver.offset = -35
            tryAgain.font = "3rem Upheavtt",
            tryAgain.offset = 5
            highScore.font = "2rem Upheavtt",
            highScore.offset = 35
        }

        // Now draw all 3 elements, centered + offset:
        //  GAME OVER
        this._ctx.font = gameOver.font;
        this._ctx.fillText(gameOver.text, this._canvas.width/2, this._canvas.height/2 + gameOver.offset);
        //  Press to play again
        this._ctx.font = tryAgain.font;
        this._ctx.fillText(tryAgain.text, this._canvas.width/2, this._canvas.height/2 + tryAgain.offset);
        //  Highscore
        this._ctx.font = highScore.font;
        this._ctx.fillText(highScore.text, this._canvas.width/2, this._canvas.height/2 + highScore.offset);
    }
    _reset() {
        /**
         * Reset the score, and set the HTML Score Element to 0.
         * Override this function to add anything else that needs resetting, but call super._reset().
         */
        this._score = 0;
        this._scoreEl.innerText = 0;
    }
    incrementScore( amount = 1 ) {
        /**
         * Incremenet the score and update the HTML Score Element.
         * 
         * @param {int} [amount = 1] The amount to increment. Defaults to 1.
         */
        this._score += amount;
        this._scoreEl.innerText = this._score;
    }
    clear() {
        /**
         * Clear the screen.
         */

        // Just clear the whole game area
        this._ctx.clearRect(0, 0, this.width, this.height);
    }
    update() {
        /**
         * While the PlayStatus flag is PLAYING, this will run every animation frame.
         */

        // Draw the frame
        this.drawFrame();

        // If status hasn't changed, run this again next animation frame.
        if ( this._playStatus == PLAY_STATUS.PLAYING ) {
            requestAnimationFrame(this.update.bind(this));
        }
    }
    
}