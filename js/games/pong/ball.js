class Ball {
    constructor( game ) {
        /**
         * Create the ball object for Pong.
         * 
         * @param {Object} game Game Object
         */

        // Setup game
        this._game = game;
        // Setup constants
        this.INITIAL_VELOCITY = 5;
        this.ACCELERATION = 0.01;
        this.IGNORE_COLLISION_FRAMES = 10;
        // Setup size, then reset to set position and velocity
        this.size = { x: 15, y: 15 };
        this.reset();
    }
    reset() {
        /**
         * Sets the position to the middle of the screen, pivoted on the center of the object.
         * Randomly picks a direction angle.
         * Sets the velocity to the initial velocity
         */

        // Center it in the window
        this.position = { x: window.innerWidth/2 - this.size.x/2, y: window.innerHeight/2 - this.size.y/2};
        // Handle the direction
        this.direction = this.pickRandomDirection();
        // Reset velocity and isColliding
        this.velocity = this.INITIAL_VELOCITY;
        this.isColliding = 0;
    }
    pickRandomDirection() {
        /**
         * Using math, generate a random direction for the ball to move in.
         * 
         * @returns {Object} Returns a Vector2 object with the direction: { x, y }.
         */

        // Randomly pick a value between -60 and 60, then convert it to radians.
        const ANGLE = rng( -60, 60 ) / 180 * Math.PI;
        // Using math, find the X and Y for the ball to move in the angle picked above.
        return { x: Math.cos( ANGLE ), y: Math.sin( ANGLE ) };
    }
    collidedX() {
        /**
         * When the ball collides horizontally, make it rebound.
         */

        this.direction.x *= -1;
    }
    collidedY() {
        /**
         * When the ball collides vertically, make it rebound.
         */

        this.direction.y *= -1;
    }
    draw() {
        /**
         * Draw the ball on the canvas.
         */

        this._game.drawRect({ position: this.position, size: this.size });
    }
    update() {
        /**
         * On update do 2 things:
         * - Set the new position of the ball;
         * - Accelerate the ball.
         */

        // Set the new position by adding it's direction * velocity to it's current position.
        this.position.x += this.direction.x * this.velocity;
        this.position.y += this.direction.y * this.velocity;
        // Add the constant acceleration to the velocity.
        this.velocity += this.ACCELERATION;
    }
}