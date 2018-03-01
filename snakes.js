const snek = require('./snekJson');

const grid = [];
for (let x = 0; x < 20; x++) {
    const column = [];
    column[19] = 0;
    column.fill(0);
    grid.push(column);
}

const updateGridWithSnakes = (gameGrid, snakePositions) => {
    snakePositions.snakes.data.forEach(snake => {

        snake.body.data.forEach(coords => {
            gameGrid[coords.y][coords.x] = 5
        })
    })
}

console.log(grid)
updateGridWithSnakes(grid, snek.json)
console.log(grid)
