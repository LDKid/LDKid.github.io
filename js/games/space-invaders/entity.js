class Entity {
    constructor( game, img ) {
        /**
         * Create the entity object for the players and enemies of Space Invaders.
         * 
         * @param {Object} game Game Object
         * @param {Object} img The HTML Canvas with the entity's image
         */

        // Setup game
        this._game = game;

        // Setup defaults
        this.position = { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 };
        this.size = { x: 0, y: 0 };

        // Setup Projectile defaults
        this.PROJECTILE_VERTICAL_OFFSET = 5;
        this.PROJECTILE_SPEED = 5;
        
        // Setup image
        this.image = img;
    }
    getProjectileSpawnPos() {
        /**
         * Get the position to spawn the projectile.
         * 
         * @return {Object} Returns a Vector2 {x,y} with the position.
         */

        // The X is the current position + half of the size, so it spawn centered on the player.
        // The Y is the current position + an offset, so it spawn insides the player.
        return {
            x: this.position.x + this.size.x / 2,
            y: this.position.y + this.PROJECTILE_VERTICAL_OFFSET
        }
    }
    draw() {
        /**
         * Draw the entity on the canvas.
         */
        this._game.drawImage({ img: this.image, position: this.position });
        
    }
    update() {
        /**
         * Any code the entity could need to update would be written here.
         */
    }
}