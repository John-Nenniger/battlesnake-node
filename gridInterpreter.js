const snek = require('./snekJson');

// example grid

const grid = [];
for (let x = 0; x < 20; x++) {
    const column = [];
    column[19] = x;
    column.fill(x);
    grid.push(column);
}

console.log(grid)


function interpreter(x, y, grid, prevMove) { // where x and y refer to the
  const directions = ['up', 'down', 'left', 'right']

}
