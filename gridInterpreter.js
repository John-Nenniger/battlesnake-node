const snek = require('./snekJson');

// example grid
//grid[#down][#right]

//let prevMove = 'up'

function pick(x, y, grid, prevMove) { // where x and y refer to the
  // first we need to remove the opposite of the previous move from the possibilities
  // opposites.prevMove  is the one we can't pick
  let opposites = {'up':'down', 'right':'left', 'down': 'up', 'left':'right'}
  let directions = ['up', 'down', 'left', 'right']
  let values = {'down':grid[y+1][x], 'up':grid[y-1][x], 'right':grid[y][x+1], 'left':grid[y][x-1]};
  let greatest = -100;
  let nextMove = '';
  for (let key in values){
    console.log(key, values[key], prevMove, opposites[prevMove])
    if (isNaN(values[key]) || key === opposites[prevMove]){
      continue
    } else if (values[key] > greatest){
      greatest = values[key]
      nextMove = key;
    }
  }
  console.log('greatest: ', greatest, 'nextMove: ', nextMove)
  return nextMove
}

module.exports = {pick}
