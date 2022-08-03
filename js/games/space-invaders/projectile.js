class Projectile {
    constructor( game, { position, velocity, isPlayers } ) {
        /**
         * Create the projectile object for Space Invaders.
         * @param {Object} game Game Object
         * @param {Object} position The position of the projectile
         * @param {Object} velocity The velocity of the projectile
         * @param {bool} isPlayers Whether or not the Projectile was shot by the player. True for Player's, False for Enemy's
         */

        // Setup game
        this._game = game;
        // Setup constants
        if ( isPlayers ) {
            this.size = { x: 10, y: 10 };
        } else {
            this.size = { x: 5, y: 15 };
        }
        // Setup variables
        this.position = position;
        this.velocity = velocity;
    }
    draw() {
        /**
         * Draw the projectile on the canvas.
         */

        this._game.drawRect({ position: this.position, size: this.size });
    }
    update() {
        /**
         * Moves the projectile, and checks if it needs to be deleted because it's offscreen.
         * 
         * @returns {bool} True if it should be deleted because it went offscreen.
         */
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if ( this.position.y <= 0 || this.position.y >= this._game._canvas.height ) {
            return true;
        }
        return false;
    }
}