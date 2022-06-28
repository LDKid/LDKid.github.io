class Paddle {
    constructor( context ) {
        /**
         * Create a paddle object for Pong. Sets the size and default position.
         * 
         * @param {Object} context Canvas Context
         */

        this._ctx = context;
        // Set the size
        this.size = { x: 15, y: 175 };
        // Se the default position to 15 from the right edge, centered vertically
        this.position = { x: window.innerWidth - this.size.x - 15, y: window.innerHeight/2 - this.size.y/2};   
    }
    updateXPosition() {
        /**
         * Run this function any time you need to make sure the paddle is positioned correcly, for example, when resizing the canvas.
         */

        this.position.x = window.innerWidth - this.size.x - 15;
    }
    updateYPosition( val ) {
        /**
         * Update the vertical position of the paddle, pivoted on it's center.
         * 
         * @param {Number} val The value of the new position for the paddle.
         */

        this.position.y = val - this.size.y / 2;
    }
    draw() {
        /**
         * Draw the paddle on the canvas.
         */

        this._ctx.fillRect( this.position.x, this.position.y, this.size.x, this.size.y );
    }
    update() {
        /**
         * Any code the paddle could need to update would be written here.
         */
    }
}