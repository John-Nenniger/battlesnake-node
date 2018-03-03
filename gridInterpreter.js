const snek = require('./snekJson');

// example grid
//grid[#down][#right]

const grid = [];
for (let x = 0; x < 20; x++) {
    const column = [];
    column[19] = x;
    column.fill(x);
    grid.push(column);
}


let opposites = {'up':'down', 'right':'left', 'down': 'up', 'left':'right'}
let directions = ['up', 'down', 'left', 'right']
let prevMove = 'up'
let noGo = ""

function interpreter(x, y, grid, prevMove) { // where x and y refer to the
  // first we need to remove the opposite of the previous move from the possibilities
  // opposites.prevMove  is the one we can't pick
  let values = {grid[y+1][x]:'down', grid[y-1][x]:'up', grid[y][x+1]:'right', grid[y][x]:'left'};
  let greatest = -100;
  for (let key in values){
    if (isNaN(key)){
      continue
    } else if (values.key === opposites.prevMove){
        delete values.key
    } else if (key > greatest){
      greatest = key
    }
  }
  return greatest
}
