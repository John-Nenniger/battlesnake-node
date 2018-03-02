const snek = require('./snekJson');

const adjacentToSnakeWeight = 2;
const snakeWeight = 1;
const radius = 2;

let grid = [];
for (let x = 0; x < 20; x++) {
    const column = [];
    column[19] = 0;
    column.fill(0);
    grid.push(column);
}

const paintAroundSnakes = (gameGrid, coords, distance) => {
    // Will only update the grid if the coordinates provided 
    // are within the bounds of the game
    let d = distance;

    // d is equal to the 'radius' to paint around paint from the outside in. Stop when d < 0
    // adjacentToSnakeWeight can also be adjusted on every increment
    while (d > 0) {
        const exists = {
            top: false,
            down: false,
            right: false,
            left: false
        }

        // Check cardinal directions if they are within limit, set exist to true for the diagonal directions

        if (coords.y - d >= 0) {
            gameGrid[coords.y - d][coords.x] = adjacentToSnakeWeight; // TOP
            exists.top = true;
        }

        if (coords.y + d < gameGrid.length) {
            gameGrid[coords.y + d][coords.x] = adjacentToSnakeWeight; // DOWN
            exists.down = true;
        }

        if (coords.x + d < gameGrid.length) {
            gameGrid[coords.y][coords.x + d] = adjacentToSnakeWeight; // RIGHT
            exists.right = true;
        }

        if (coords.x - d >= 0) {
            gameGrid[coords.y][coords.x - d] = adjacentToSnakeWeight; // LEFT
            exists.left = true;
        }

        // There can only be a diagonal if both cardinal directions exist

        if (exists.top && exists.right) {
            gameGrid[coords.y - d][coords.x + d] = adjacentToSnakeWeight; // TOP RIGHT
        }

        if (exists.down && exists.right) {
            gameGrid[coords.y + d][coords.x + d] = adjacentToSnakeWeight; // DOWN RIGHT
        }

        if (exists.down && exists.left) {
            gameGrid[coords.y + d][coords.x - d] = adjacentToSnakeWeight; // DOWN LEFT
        }

        if (exists.top && exists.right) {
            gameGrid[coords.y - d][coords.x - d] = adjacentToSnakeWeight; // TOP LEFT
        }

        d--;
    }

    return true;
}

const updateGridWithSnakes = (gameGrid, snakePositions) => {
    snakePositions.snakes.data.forEach(snake => {

        snake.body.data.forEach(coords => {
            paintAroundSnakes(gameGrid, coords, radius);
        })
        snake.body.data.forEach(coords => {
            gameGrid[coords.y][coords.x] = snakeWeight;
        })
    })

    return true;
}

module.exports = updateGridWithSnakes;

/* TESTING */

updateGridWithSnakes(grid, snek.json)
console.log(grid);
