const SPRITE_COUNT = 1;
const PICKUP_SIZE_MULTIPLIER = 1.6;

class Pickup {
    constructor({game, gridSize, imageCanvas, playerPos}) {
        this._game = game;
        this.sprite = SPRITE_COUNT;
        this.image = imageCanvas;
        this.size = {x: gridSize * PICKUP_SIZE_MULTIPLIER, y: gridSize * PICKUP_SIZE_MULTIPLIER};
        this.gridSize = gridSize;
        this.setRandomPosition(playerPos);
    }
    setRandomPosition(snakeCells) {
        let newPosFound = false;
        while (!newPosFound) {
            let x = rng(0, this._game._canvas.width - this.size.x);
            let y = rng(0, this._game._canvas.height - this.size.y);
            this.position = {x, y};
            newPosFound = true;
            snakeCells.forEach(cell => {
                if (this._game.checkCollsion(cell)) {
                    newPosFound = false;
                }
            });
        }
    }
    draw() {
        this._game.drawImage({ img: this.image, position: this.position, size: this.size, imageSection: { x: this.sprite * 16, y: 0, width: 16, height: 16 } });
    }
    update() {
        if (++this.sprite > SPRITE_COUNT) {
            this.sprite = 0;
        }
    }
}