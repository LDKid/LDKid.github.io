window.mobileCheck = function() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
};

const PLAY_STATUS = Object.freeze({
	INACTIVE: Symbol(0),
	PLAYING: Symbol(1),
	PAUSED: Symbol(2)
});

class Game {
    constructor() {
        /**
         * Create the Game Object and setup it's canvas. Also prepares it's resizing.
         */
        this._canvas = document.getElementById('game-canvas');
        this._scoreEl = document.getElementById('game-score');
        // Context
        this._ctx = this._canvas.getContext('2d');
        this._ctx.imageSmoothingEnabled = false;

        // resize the canvas to fill browser window dynamically
        this._resizeCanvas();
        window.addEventListener('resize', this._resizeCanvas.bind(this), false);
        
        // Flags and variables
        this._playStatus = PLAY_STATUS.INACTIVE;
        this._highScore = 0;
        this._reset();
    }
    _resizeCanvas() {
        /**
         * Automatically rezises the canvas to the window's size.
         */
        this._canvas.width = window.innerWidth;
        // widow.innerHeight is the entire height of the window, need to subtract the header's height to get full available size.
        let headerHeight = document.querySelector('header').clientHeight;
        this._canvas.height = window.innerHeight - headerHeight;
        this.updateColors();
    }
    updateColors(){
        this._ctx.fillStyle = getComputedStyle( document.body ).getPropertyValue( '--accent-color' );
    }
    play( activate = true ) {
        /**
         * Reset's the score to 0, set's the playing flag to true and trigger's update.
         */

        if ( activate == false ) {
            if ( this._playStatus == PLAY_STATUS.PLAYING ) {
                this._playStatus = PLAY_STATUS.PAUSED;
            }
            return;
        }
        
        switch (this._playStatus) {
            case PLAY_STATUS.PLAYING:
                this._playStatus = PLAY_STATUS.PAUSED;
            break;
            case PLAY_STATUS.PAUSED:
                this._play();
            break;
            default:
                this._reset();
                this._play();
            break;
        }
    }
    _play() {
        this._playStatus = PLAY_STATUS.PLAYING;
        this.updateColors();
        this.update();
    }
    endGame() {
        this._playStatus = PLAY_STATUS.INACTIVE;
        this._highScore = ( this._score > this._highScore ) ? this._score : this._highScore
        this._drawEndGame();
        this._canvas.addEventListener('click', (e) => {
            this.play();
        }, {once: true});
    }
    _drawEndGame() {
        this._ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this._ctx.textAlign = "center";

        let gameOver = {
            text: "GAME OVER",
            font: "5rem Upheavtt",
            offset: -35
        }
        var translations = {
            'en': "Press anywhere to try again",
            'pt': "Carregue para tentar novamente"
        };
        let lang = window.location.pathname.substring(1,3);
        let tryAgain = {
            text: translations[lang],
            font: "3rem Upheavtt",
            offset: 5
        }
        let highScore = {
            text: `Highscore: ${this._highScore}`,
            font: "2rem Upheavtt",
            offset: 35
        }
        if ( window.mobileCheck() ) {
            gameOver.font = 0.1 * window.innerWidth + "px Upheavtt",
            gameOver.offset = -30
            tryAgain.font = 0.05 * window.innerWidth + "px Upheavtt",
            tryAgain.offset = 5
            highScore.font = 0.05 * window.innerWidth + "px Upheavtt",
            highScore.offset = 35
        }

        // GAME OVER
        this._ctx.font = gameOver.font;
        this._ctx.fillText(gameOver.text, this._canvas.width/2, this._canvas.height/2 + gameOver.offset);
        // Press to play again
        this._ctx.font = tryAgain.font;
        this._ctx.fillText(tryAgain.text, this._canvas.width/2, this._canvas.height/2 + tryAgain.offset);
        // Highscore
        this._ctx.font = highScore.font;
        this._ctx.fillText(highScore.text, this._canvas.width/2, this._canvas.height/2 + highScore.offset);
    }
    _reset() {
        this._score = 0;
        this._scoreEl.innerText = 0;
    }
    incrementScore( amount = 1 ) {
        this._score += amount;
        this._scoreEl.innerText = this._score;
    }
    clear() {
        /**
         * Clear the screen
         */
        this._ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); // just clear the whole game area
    }
    update() {
        /**
         * While the playing flag is true, this will run every animation frame.
         */
        if ( this._playStatus == PLAY_STATUS.PLAYING ) {
            requestAnimationFrame(this.update.bind(this));
        }
    }
    
}