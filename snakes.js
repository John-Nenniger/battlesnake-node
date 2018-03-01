const snek = require('./snekJson');

const adjacentToSnakeWeight = -10;
const snakeWeight = -8;

let grid = [];
for (let x = 0; x < 20; x++) {
    const column = [];
    column[19] = 0;
    column.fill(0);
    grid.push(column);
}

const paintAroundSnakes = (gameGrid, coords) => {
    if (coords.y - 1 > 0) {
        gameGrid[coords.y - 1][coords.x] = adjacentToSnakeWeight // TOP
    }

    if (coords.y + 1 < gameGrid.length) {
        gameGrid[coords.y + 1][coords.x] = adjacentToSnakeWeight // DOWN
    }

    if (coords.x + 1 < gameGrid.length) {
        gameGrid[coords.y][coords.x + 1] = adjacentToSnakeWeight // RIGHT
    }

    if (coords.x - 1 > 0) {
        gameGrid[coords.y][coords.x - 1] = adjacentToSnakeWeight // LEFT
    }

    return true;
}

const updateGridWithSnakes = (gameGrid, snakePositions) => {
    snakePositions.snakes.data.forEach(snake => {

        snake.body.data.forEach(coords => {
            paintAroundSnakes(gameGrid, coords);
            // gameGrid[coords.y][coords.x] = snakeWeight;
        })
        snake.body.data.forEach(coords => {
            // paintAroundSnakes(gameGrid, coords);
            gameGrid[coords.y][coords.x] = snakeWeight;
        })
    })

    return true;
}

module.exports = updateGridWithSnakes;

/* TESTING */

// updateGridWithSnakes(grid, snek.json)
// console.log(grid);
