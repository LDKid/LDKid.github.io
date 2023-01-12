const BATTALION_ROWS = 5;
const BATTALION_ROWS_MOBILE = 3;
const BATTALION_COLUMNS = 8;
const BATTALION_COLUMNS_MOBILE = 5;

class Battalion {
    constructor( game, imgs ) {
        /**
         * Create a grid of enemies.
         * @param {Object} game Game Object
         * @param {Array<Object>} imgs An array of HTML Canvases with the images of the invaders
         */

        // Setup Game
        this._game = game;

        // Setup defaults
        this.invaderSize = this._game.getInvaderSize();
        this.position = { x: 0, y: 0 };
        this.velocity = this.getDefaultVelocity();
        // How many rows and columns the grid of enemies has
        this.rows = checkIsMobile() ? BATTALION_ROWS_MOBILE : BATTALION_ROWS;
        this.columns = checkIsMobile() ? BATTALION_COLUMNS_MOBILE : BATTALION_COLUMNS;
        // How many pixels between each enemy
        this.border = 3;
        this.size = { 
            x: this.columns * ( this.invaderSize.x + this.border ),
            y: this.rows * ( this.invaderSize.y + this.border )
        }
        // collidedWithWallCount is used to spawn new waves. It's incremented any time the battalion hits the left or right edges of the screen and reset whenever a new wave is spawned
        this.collidedWithWallCount = 0;

        // Handle Invaders
        this.invaders = [];
        // Create all invaders
        for (let xIndex = 0; xIndex < this.columns; xIndex++) {
            /* Unused code for Random Skin:
            let selectedSkin = Math.floor( Math.random() * 3 ); */
            for (let yIndex = 0; yIndex < this.rows; yIndex++) {
                // Ordered skin:
                let selectedSkin = Math.min( yIndex, 2 );
                // Create Invader and add it to the list
                this.invaders.push(
                    new Invader(game, imgs[selectedSkin], {
                        position: {
                            x: xIndex * ( this.invaderSize.x + this.border ),
                            y: yIndex * ( this.invaderSize.y + this.border )
                        },
                        size: this.invaderSize,
                        borderBetween: this.border,
                        gridPlace: { x: xIndex, y: yIndex }
                    } )
                );
            }
        }
    }
    getDefaultVelocity() {
        /**
         * Get the velocity, based on the size of the screen
         * 
         * @returns {Object} {x,y} The velocity
         */

        // Get the canvas width
        let canvasWidth = this._game._canvas.width;
        // Get the direction the grid is currently facing
        let direction = 1;
        if ( this.velocity && this.velocity.x < 0 ) {
            // If the velocity is set, and it's negative, then set the direction to negative
            direction = -1;
        }
        
        // Define velocity as a Vector2
        let velocity = { x: 0, y: 0 };
        
        // Compare canvas size and set velocity. The values don't really have any science, it was just based on what felt right.
        if ( canvasWidth <= 450 ) {
            velocity.x = 1 * direction;
        } else if ( canvasWidth <= 900 ) {
            velocity.x = 2 * direction;
        } else if ( canvasWidth <= 1350 ) {
            velocity.x = 3 * direction;
        } else {
            velocity.x = 4 * direction;
        }
        return velocity;
    }
    getDefaultInvaderSize() {
        /**
         * Using the game's width, calculate and return the size of the invaders.
         * 
         * @returns {Object} {x,y} The size of the invader
         */

        return {
            x: Math.min( this._game._canvas.width / 11, 57 ),
            y: Math.min( this._game._canvas.width / 11 * 16 / 19, 48 )
        };
    }
    resizedScreen() {
        /**
         * Called when resizing the screen. Set's the velocity, and size, and updates all invaders.
         */

        // Get the velocity and size (both invader and grid size)
        this.velocity = this.getDefaultVelocity();
        this.invaderSize = this._game.getInvaderSize();
        this.size = { 
            x: this.columns * ( this.invaderSize.x + this.border ),
            y: this.rows * ( this.invaderSize.y + this.border )
        }
        // Update all invaders
        this.invaders.forEach(invader => {
            invader.resizedScreen( this.invaderSize );
        });
    }
    update() {
        /**
         * Called per frame.
         * Update the grid's position
         * Update all invaders.
         * Check for collisions between the invaders and the player's projectiles.
         * Check whether or not a new wave should be spawned.
         */

        // Move the grid
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Update the invaders and check for collisions.
        for (let i = 0; i < this.invaders.length; i++) {
            const INVADER = this.invaders[i];
            // Update the Invader
            INVADER.update( this.velocity );
            // Check for collision with the player projectiles
            for (let p = 0; p < this._game.projectiles.length; p++) {
                const PROJECTILE = this._game.projectiles[p];
                // Check for collision between this projectile and this invader
                if ( PROJECTILE.position.y <= INVADER.position.y + INVADER.size.y 
                    && PROJECTILE.position.y + PROJECTILE.size.y >= INVADER.position.y
                    && PROJECTILE.position.x + PROJECTILE.size.x >= INVADER.position.x
                    && PROJECTILE.position.x <= INVADER.position.x + INVADER.size.x ) {
                    
                    // Delete the invader and the projectile
                    this.invaders.splice( i--, 1 );
                    this._game.projectiles.splice( p--, 1 );
                    // Increment the score!
                    this._game.incrementScore();
                    
                    // Check if the battalion still has invaders
                    if ( this.invaders.length > 0 ) {
                        // It does, so update it's size
                        let firstInvader = this.invaders[0];
                        let lastInvader = this.invaders[ this.invaders.length - 1 ];
                        this.size.x = lastInvader.position.x - firstInvader.position.x + this.invaderSize.x;
                        this.position.x = firstInvader.position.x;
                        // update height
                        let top = this.invaders[0];
                        let bottom = this.invaders[0];
                        this.invaders.forEach(invader => {
                            if ( invader.position.y < top.position.y ) {
                                top = invader;
                            }
                            if (invader.position.y > bottom.position.y ) {
                                bottom = invader;
                            }
                        });
                        this.size.y = bottom.position.y - top.position.y + this.invaderSize.y;
                    } else {
                        // It doesn't, delete it
                        this._game.deleteBattalion();
                    }
                }
            };
        };

        // Reset vertical velocity
        this.velocity.y = 0;

        // Check if it collided with walls
        if ( this.position.x + this.size.x >= this._game._canvas.width ) {
            this.collidedWithWall( -1 );
        } else if ( this.position.x <= 0 ) {
            this.collidedWithWall( 1 );
        }
    }
    collidedWithWall( direction ) {
        /**
         * Called whenever the grid collides with a wall. Reverse the direction, move down, and try to spawn a wave
         * 
         * @param {Number} direction It's either 1 or -1, depending on which screen edge was collided
         */

        // Handle direction
        this.velocity.x = Math.abs(this.velocity.x) * direction;
        // Move down
        this.velocity.y = this.invaderSize.y + this.border;
        // Increment the collidedCount, and try to spawn a wave
        this.collidedWithWallCount++;
        this._game.trySpawnWave( this.collidedWithWallCount );
    }
}