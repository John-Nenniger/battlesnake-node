const snek = require('./snekJson');

const grid = [];
for (let x = 0; x < 20; x++) {
    const column = [];
    column[19] = 0;
    column.fill(0);
    grid.push(column);
}

const paintAroundSnakes = (gameGrid, coords) => {
    gameGrid[coords.x][coords.y - 1] = -8 // top
    gameGrid[coords.x + 1][coords.y] = -8 // right
    gameGrid[coords.x][coords.y + 1] = -8 // down
    gameGrid[coords.x - 1][coords.y] = -8 // left

    return true;
}

const updateGridWithSnakes = (gameGrid, snakePositions) => {
    snakePositions.snakes.data.forEach(snake => {

        snake.body.data.forEach(coords => {
            paintAroundSnakes(gameGrid, coords);
            gameGrid[coords.y][coords.x] = -10;
        })
    })

    return true;
}

updateGridWithSnakes(grid, snek.json)

module.exports = updateGridWithSnakes;
