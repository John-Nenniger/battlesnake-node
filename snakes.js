const snek = require('./snekJson');

const adjacentToSnakeWeight = -25;
const snakeWeight = -50;
const radius = 1;

const paintAroundSnakes = (gameGrid, coords, distance, val) => {

    // Will only update the grid if the coordinates provided
    // are within the bounds of the game

    let d = distance;
    let dDiag = Math.ceil(d / 2);

    let weighting = adjacentToSnakeWeight
    const boardLength = gameGrid.length;

    // d is equal to the 'radius' to paint around paint from the outside in. Stop when d < 0
    // adjacentToSnakeWeight can also be adjusted on every increment


    // Hello, gross while loop. You've gotten very big.
    // while (d > 0) {

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

    // d--;
    // weighting -= 1;
    // }

    return true;
}

const updateGridWithSnakes = (gameGrid, snakePositions) => {
    // console.log(snakePositions.you.body.data[0].x)

    snakePositions.snakes.data.forEach(snake => {
        // console.log(snake.body.data.coords);
        // console.log(snake.body.data);

        if (snake.health > 0) {


            snake.body.data.forEach((coords, index) => {
                if (coords.x === snakePositions.you.body.data[index].x && coords.y === snakePositions.you.body.data[index].y) {
                    // This is my snake!
                } else {
                    const headCoords = {
                        x: snake.body.data[0].x,
                        y: snake.body.data[0].y
                    }

                    paintAroundSnakes(gameGrid, headCoords, 1);
                }
            })

            snake.body.data.forEach(coords => {
                if (coords.x !== snakePositions.you.body.data[0].x && coords.y !== snakePositions.you.body.data[0].y) {
                    // console.log('not my snake');
                    gameGrid[coords.y][coords.x] = snakeWeight;
                }
            })
        }
    })

    if (snakePositions.you.body.data.length > 0) {
        snakePositions.you.body.data.forEach(coords => {
            gameGrid[coords.y][coords.x] = -12;
        });
    }

    return true;
}

module.exports.updateGridWithSnakes = updateGridWithSnakes;

/* TESTING */

// updateGridWithSnakes(grid, snek.json)
// console.log(grid);

// loop over enemy snake body
// snake.body.data.forEach((coords, index) => {
//     if (coords.x !== snakePositions.you.body.data[index].x && coords.y !== snakePositions.you.body.data[index].y) {
//         console.log('coords.x', coords.x)
//         console.log('coords.y', coords.y)
//         console.log('you.x', snakePositions.you.body.data[0].x)
//         console.log('you.y', snakePositions.you.body.data[0].y)
//         // console.log('not my snake');
//         paintAroundSnakes(gameGrid, coords, radius);
//     }
// })

// console.log('coords.x', coords.x)
// console.log('coords.y', coords.y)
// console.log('you.x', snakePositions.you.body.data[0].x)
// console.log('you.y', snakePositions.you.body.data[0].y)