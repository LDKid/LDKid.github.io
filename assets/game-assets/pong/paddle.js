class Paddle {
    constructor( context ) {
        this._ctx = context;
        this.size = { x: 15, y: 200 };
        this.position = { x: window.innerWidth - this.size.x - 15, y: window.innerHeight/2 - this.size.y/2};
        
    }
    updateXPosition() {
        this.position.x = window.innerWidth - this.size.x - 15;
    }
    updateYPosition( val ) {
        this.position.y = val - this.size.y / 2;
    }
    draw() {
        this._ctx.fillRect( this.position.x, this.position.y, this.size.x, this.size.y );
    }
    update() {}
}