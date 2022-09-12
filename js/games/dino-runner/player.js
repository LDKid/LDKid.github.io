class Player {
    constructor( game, size, image, bottomOffset ) {
        /**
         * Create a player object for Dino Runner.
         * 
         * @param {Object} game Game Object
         * 
         * @param {Object} img The HTML Canvas with the entity's image
         */

        // Setup game
        this._game = game;

        // Setup constants
        this.MAX_JUMP_TIME = 20;
        this.JUMP_FORCE = ( game._canvas.width < 450 ) ? 10 : 15;
        this.GRAVITY = 1;
        this.ANIMATION_SPEED = 40;
        this.BOTTOM_OFFSET = bottomOffset;

        // Setup defaults
        this.jumpTimer = 0;
        this.size = { x: size.x, y: size.y };
        this.velocity = { x: 0, y: 0 };

        this.originalHeight = size.y;
        this.duckingHeight = size.duck;

        // Setup image
        this.image = image;

        // Finish the setup by setting the position
        this.reset();
    }
    reset() {
        /**
         * Resets the position
         */

        this.LEFT_OFFSET = 50;
        this.groundedPositionY = this._game._canvas.height - this.size.y - this.BOTTOM_OFFSET;
        this.groundedDuckingPositionY = this._game._canvas.height - this.duckingHeight - this.BOTTOM_OFFSET;
        this.position = {
            x: this.LEFT_OFFSET,
            y: 0
        }
        this.animationFrame = 0;
        this.isDucking = false;
    }
    draw() {
        /**
         * Draw the player on the canvas.
         */

        // Temporarily draw a rectangle, swap this for the sprite later
        //this._game.drawRect({ position: this.position, size: this.size });
        let sprite = ( this.isDucking ) ? 3 : ( !this.isGrounded ) ? 2 : ( this.animationFrame < this.ANIMATION_SPEED / 2 ) ? 1 : 0;
        this._game.drawImage({ img: this.image, position: this.position, size: this.size, imageSection: { x: sprite * this.size.x, y: 0, width: this.size.x, height: this.size.y } });
    }
    update( tryingToJump, tryingToDuck ) {
        /**
         * Update the player.
         */

        // Duck
        if ( tryingToDuck ) {
            this.isDucking = true;
            this.size.y = this.duckingHeight;
            if ( this.isGrounded ) {
                this.position.y = this.groundedDuckingPositionY;
                this.animationFrame = 0;
            }
        } else {
            this.isDucking = false;
            this.size.y = this.originalHeight;
            // Jump
            if ( tryingToJump ) {
                this.jump();
                this.animationFrame = 0;
            } else {
                this.jumpTimer = 0;
                this.animationFrame++;
                if ( this.animationFrame > this.ANIMATION_SPEED ) {
                    this.animationFrame = 0;
                }
            }
        }

        // Movement
        this.position.y += this.velocity.y;

        // Gravity
        if ( (tryingToDuck && this.position.y < this.groundedDuckingPositionY) || this.position.y < this.groundedPositionY ) {
            this.velocity.y += this.GRAVITY;
            this.isGrounded = false;
        } else {
            this.velocity.y = 0;
            this.isGrounded = true;
            this.jumpTimer = 0;
            this.position.y = (tryingToDuck) ? this.groundedDuckingPositionY : this.groundedPositionY;
        }
    }
    jump () {
        // If you found the flying 
        if ( this.isGrounded && this.jumpTimer == 0 ) {
            this.jumpTimer = 1;
            this.velocity.y -= this.JUMP_FORCE;
        } else if ( this.jumpTimer > 0 && this.jumpTimer < this.MAX_JUMP_TIME ) {
            this.jumpTimer++;
            this.velocity.y = -this.JUMP_FORCE - (this.jumpTimer / 50);
        }
    }
}