const DEFAULT_SNAKE_SIZE = 55;

class Snake {
    constructor({ game, gridSize }) {
        
        this._game = game;

        this.GRID_SIZE = gridSize;
        this.SNAKE_SPEED = gridSize;

        this.size = { x: gridSize - 1, y: gridSize - 1 };
        this.cells = [];
        this.length = DEFAULT_SNAKE_SIZE;
        let x = game._canvas.width/2 - this.size.x/2;
        x -= x % gridSize;
        let y = game._canvas.height/2 - this.size.y/2
        y -= y % gridSize;
        this.position = { x, y };
        this.velocity = { x: this.SNAKE_SPEED, y: 0 };

        this.canChangeDirection = true;

    }
    // Controls
    tryMoveLeft() {
        if ( !this.canChangeDirection || this.velocity.x > 0 ) {
            return;
        }
        this.velocity.x = -this.SNAKE_SPEED;
        this.velocity.y = 0;
        this.canChangeDirection = false;
    }
    tryMoveRight() {
        if ( !this.canChangeDirection || this.velocity.x < 0 ) {
            return;
        }
        this.velocity.x = this.SNAKE_SPEED;
        this.velocity.y = 0;
        this.canChangeDirection = false;
    }
    tryMoveUp() {
        if ( !this.canChangeDirection || this.velocity.y > 0 ) {
            return;
        }
        this.velocity.y = -this.SNAKE_SPEED;
        this.velocity.x = 0;
        this.canChangeDirection = false;
    }
    tryMoveDown() {
        if ( !this.canChangeDirection || this.velocity.y < 0 ) {
            return;
        }
        this.velocity.y = this.SNAKE_SPEED;
        this.velocity.x = 0;
        this.canChangeDirection = false;
    }
    //
    draw() {
        /**
         * Draw the snake on the canvas. WIP
         */

        this.cells.forEach(cell => {
            this._game.drawRect({ position: cell, size: this.size });
        });
    }
    update() {
        if (this.velocity.x == 0 && this.velocity.y == 0) {
            return
        }
        // Move
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Wrap
        if (this.position.x < 0) {
            this.position.x = this._game._canvas.width - this.size.x;
            this.position.x -= this.position.x % this.GRID_SIZE;
        } else if (this.position.x + this.size.x > this._game._canvas.width ) {
            this.position.x = 0;
        }
        if (this.position.y < 0) {
            this.position.y = this._game._canvas.height - this.size.y;
            this.position.y -= this.position.y % this.GRID_SIZE;
        } else if (this.position.y + this.size.y > this._game._canvas.height ) {
            this.position.y = 0;
        }
        
        // Create a new cell in the head's position
        this.cells.unshift({ x: this.position.x, y: this.position.y });

        // If it has too many cells, delete last cell
        if (this.cells.length > this.length) {
            this.cells.pop();
        }

        // Check collisions
        for (let i = 1; i < this.cells.length; i++) {
            const CELL = this.cells[i];
            if (this.checkCollision(this.cells[0], CELL)) {
                this._game.endGame();
            }
        }

        this.canChangeDirection = true;
    }
    checkCollision(head, cell) {
        if (head.x == cell.x && head.y == cell.y) {
            return true;
        }
        return false;
    }
    getHead() {
        return {
            x: this.cells[0].x,
            y: this.cells[0].y,
            height: this.size.y,
            width: this.size.x,
        };
    }
    getAllSnakeCells() {
        let allCells = [];
        this.cells.forEach(cell => {
            allCells.push({
                x: cell.x,
                y: cell.y,
                height: this.size.y,
                width: this.size.x
            });
        });
        return allCells;
    }
    atePickup() {
        this.length++;
    }
}




// TODO:
/* 
    - Buffer controls?
    - Improve mobile controls, maybe with timer?
    - Have mobile snake smaller?
*/