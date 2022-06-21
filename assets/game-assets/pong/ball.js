class Ball {
    constructor( context ) {
        this.INITIAL_VELOCITY = 5;
        this.ACCELERATION = 0.01;

        this._ctx = context;
        this.size = { x: 15, y: 15 };
        this.reset();
    }
    reset() {
        this.position = { x: window.innerWidth/2 - this.size.x/2, y: window.innerHeight/2 - this.size.y/2};
        this.direction = { x: 0, y: 0 };
        while ( Math.abs( this.direction.x ) <= .2 || Math.abs( this.direction.x ) >= .9 ) {
            const ANGLE = rng( -60, 60 ) / 180 * Math.PI;
            this.direction = { x: Math.cos( ANGLE ), y: Math.sin( ANGLE) };
        };
        this.velocity = this.INITIAL_VELOCITY;
        this.isColliding = 0;
    }
    collidedX() {
        this.direction.x *= -1;
    }
    collidedY() {
        this.direction.y *= -1;
    }
    draw() {
        this._ctx.fillRect( this.position.x, this.position.y, this.size.x, this.size.y );
    }
    update() {
        this.position.x += this.direction.x * this.velocity;
        this.position.y += this.direction.y * this.velocity;
        this.velocity += this.ACCELERATION;
    }
}

/**
 * Generate a random number between the two values
 * @param {float} min -> The minimum value
 * @param {float} max -> The maximum value
 */
 function rng( min, max ) {
    return Math.random() * ( max - min ) + min;
}