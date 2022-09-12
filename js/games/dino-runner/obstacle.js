class Obstacle {
    constructor ( game, { position, size, type, image } ) {
        /**
         * Create an obstacle object for Dino Runner.
         * 
         * @param {Object} game Game Object
         */

        // Setup game
        this._game = game;

        // Setup position, size and velocity
        this.image = image;
        this.position = position;
        this.size = size;
        this.velocity = { x: -game.gameSpeed, y: 0 };
        this.type = type;
    }
    update() {
        /**
         * 
         */

        // Move
        this.position.x += this.velocity.x;

        // Update velocity
        this.velocity = { x: -this._game.gameSpeed, y: 0 };

        return this.position.x <= - this.size.x
    }
    draw() {
        this._game.drawImage({ img: this.image, position: this.position });
    }
}