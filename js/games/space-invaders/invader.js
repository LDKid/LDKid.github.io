class Invader extends Entity {
    constructor( game, img, { position, size, borderBetween, gridPlace } ) {
        /**
         * Create an invader object for Space Invaders.
         * 
         * @param {Object} game Game Object
         */

        super( game, img );
        
        // Override defaults
        this.PROJECTILE_SPEED = 6;

        // Set the size
        this.size = size;

        // The position has 3 main variables:
        //  - position: the active position, it's what is used to draw, and calculate collisions.
        //  - basePosition: the base placement. This variable is used to resize the invader prevernting overlap.
        //  - offset: this is changed per update by the velocity. When resizing, add this offset to the basePosition to prevent overlap.
        this.basePosition = position;
        this.offset = { x: 0, y:0 };
        
        // In order to prevent overlap and place them in the grid correctly, these 2 variables are used.
        this.gridBorder = borderBetween;
        this.placeInGrid = gridPlace;

        // Setup the basePosition and position correctly.
        this.resizedScreen( size );
    }
    resizedScreen( size ) {
        /**
         * Called on init and on resize. Sets the new size, and then the position and basePosition correctly.
         * 
         * @param {Object} size {x, y} The new size of the invader.
         */

        // The size changes depending on screen size, so update it.
        this.size = size;
        
        // Setup the base position, with the new size, it's grid position, and the border between grid elements.
        this.basePosition = {
            x: this.placeInGrid.x * ( this.size.x + this.gridBorder ),
            y: this.placeInGrid.y * ( this.size.y + this.gridBorder ),
        }
        
        // Setup the position by combining the basePosition with the offset.
        this.position = {
            x: this.basePosition.x + this.offset.x,
            y: this.basePosition.y + this.offset.y,
        }
    }
    update( velocity ) {
        /**
         * Move it.
         * 
         * @param {Object} velocity {x, y} The velocity of the invader
         */

        // Setup the offset so it updates correctly if resized.
        this.offset.x += velocity.x;
        this.offset.y += velocity.y;
        
        // Uodate the position.
        this.position.x += velocity.x;
        this.position.y += velocity.y;
    }
    shoot( projectileArray ) {
        /**
         * Shoot a projectile at the player.
         * 
         * @param {Array} projectileArray The Array that contains all enemy projectiles.
         */

        projectileArray.push(
            new Projectile( this._game, {
                position: this.getProjectileSpawnPos(),
                velocity: { x: 0, y: this.PROJECTILE_SPEED },
                isPlayers: false
            }) 
        );
    }
}