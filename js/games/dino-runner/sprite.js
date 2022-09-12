class Sprite {
    constructor ( game, { position, size, velocity } ) {
        /**
         * Create a sprite object for Dino Runner.
         * 
         * @param {Object} game Game Object
         */

        // Setup game
        this._game = game;

        // Setup position, size and velocity
        this.position = position;
        this.size = size;
        this.velocity = velocity;
    }
    update() {
        /**
         * 
         */

        // Move
        this.position.x += this.velocity.x;
    }
}