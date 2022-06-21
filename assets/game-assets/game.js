window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
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