class Player extends Entity {
    constructor( game, img ) {
        /**
         * Create a player object for Space Invaders.
         * 
         * @param {Object} game Game Object
         */

        super( game, img );
        
        // Set the size
        this.size = this._game.getPlayerSize();

        // Set the fire rate, this is X per second. So 5 would mean the player can shoot 5 times a second.
        this.fireRate = 5;

        // Finish the setup by setting the position
        this.reset();
    }
    reset() {
        /**
         * Resets the position
         */

        // Set the default position to X from the bottom edge, centered horizontally
        this.BOTTOM_OFFSET = 15;
        this.position = {
            x: this._game._canvas.width / 2 - this.size.x / 2,
            y: this._game._canvas.height - this.size.y - this.BOTTOM_OFFSET
        }
    }
    resizedScreen() {
        /**
         * When resizing the screen update the position and size of the player-
         */

        // Update the X position, in case it's outside the screen
        this.updateXPosition( this.position.x + this.size.x / 2 );
        // Update the Y position
        this.position.y = this._game._canvas.height - this.size.y - this.BOTTOM_OFFSET;

        // Update the player's size
        this.size = this._game.getPlayerSize();
    }
    updateXPosition( val ) {
        /**
         * Update the horizontal position of the player, pivoted on it's center.
         * 
         * @param {Number} val The value of the new position for the player.
         */

        if ( val - this.size.x / 2 < 0 ) {
            val = this.size.x / 2;
        } else if ( val + this.size.x / 2 > this._game._canvas.width ) {
            val = this._game._canvas.width - this.size.x / 2;
        }

        this.position.x = val - this.size.x / 2;
    }
}