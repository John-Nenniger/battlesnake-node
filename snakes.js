const snek = require('./snekJson');

const adjacentToSnakeWeight = -1;
const snakeWeight = -6;
const radius = 6;

const paintAroundSnakes = (gameGrid, coords, distance) => {
    // Will only update the grid if the coordinates provided
    // are within the bounds of the game

    let d = distance;
    let dDiag = Math.ceil(d / 2);

    let weighting = adjacentToSnakeWeight
    const boardLength = gameGrid.length;

    // d is equal to the 'radius' to paint around paint from the outside in. Stop when d < 0
    // adjacentToSnakeWeight can also be adjusted on every increment


    // Hello, gross while loop. You've gotten very big.
    while (d > 0) {

        const exists = {
            top: false,
            down: false,
            right: false,
            left: false
        }

        // Check cardinal directions if they are within limit, set exist to true for the diagonal directions

        if (coords.y - d >= 0) {
            gameGrid[coords.y - d][coords.x] = weighting; // TOP
            exists.top = true;
        }

        if (coords.y + d < boardLength) {
            gameGrid[coords.y + d][coords.x] = weighting; // DOWN
            exists.down = true;
        }

        if (coords.x + d < boardLength) {
            gameGrid[coords.y][coords.x + d] = weighting; // RIGHT
            exists.right = true;
        }

        if (coords.x - d >= 0) {
            gameGrid[coords.y][coords.x - d] = weighting; // LEFT
            exists.left = true;
        }

        // There can only be a diagonal if both cardinal directions exist

        // I'm sorry about all these if statements :(
        if (exists.top && exists.right && coords.y - dDiag >= 0 && coords.x + dDiag < boardLength) {

            gameGrid[coords.y - dDiag][coords.x + dDiag] = weighting; // TOP RIGHT
        }

        if (exists.down && exists.right && coords.y + dDiag < boardLength && coords.x + dDiag < boardLength) {

            gameGrid[coords.y + dDiag][coords.x + dDiag] = weighting; // DOWN RIGHT
        }

        if (exists.down && exists.left && coords.y + dDiag < boardLength && coords.x - dDiag >= 0) {

            gameGrid[coords.y + dDiag][coords.x - dDiag] = weighting; // DOWN LEFT
        }

        if (exists.top && exists.left && coords.y - dDiag >= 0 && coords.x - dDiag >= 0) {

            gameGrid[coords.y - dDiag][coords.x - dDiag] = weighting; // TOP LEFT
        }

        d--;
        weighting *= 1.5;
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

    if (snakePositions.you.body.data.length > 0) {
        snakePositions.you.body.data.forEach(coords => {
            gameGrid[coords.y][coords.x] = snakeWeight;
        });
    }


    // console.log(gameGrid)
    return true;
}

module.exports.updateGridWithSnakes = updateGridWithSnakes;

/* TESTING */

// updateGridWithSnakes(grid, snek.json)
// console.log(grid);
