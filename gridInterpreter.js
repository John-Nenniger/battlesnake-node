// const snek = require('./snekJson');

// example grid
//grid[#down][#right]
//grid[-1][4]
//let prevMove = 'up'

function pick(x, y, grid, prevMove) { // where x and y refer to the
  // first we need to remove the opposite of the previous move from the possibilities
  // opposites.prevMove  is the one we can't pick
  console.log('in pick: ', 'x', x, `y:${y}`)
  //so the problem is that grid[-1] is undefined, then we try to get a property from it
  // and that crashes... This is what needs to be fixed
  let values = {};

  if (!grid[y - 1]) {
    values = { 'down': grid[y + 1][x], 'right': grid[y][x + 1], 'left': grid[y][x - 1] };
  } else if (!grid[y + 1]) {
    values = { 'up': grid[y - 1][x], 'right': grid[y][x + 1], 'left': grid[y][x - 1] };
  } else {
    values = { 'down': grid[y + 1][x], 'up': grid[y - 1][x], 'right': grid[y][x + 1], 'left': grid[y][x - 1] };
  }
  console.log(values)
  let opposites = { 'up': 'down', 'right': 'left', 'down': 'up', 'left': 'right' }
  let directions = ['up', 'down', 'left', 'right']
  let greatest = -100;
  let nextMove = '';
  for (let key in values) {
    if (values[key] === undefined || key === opposites[prevMove]) {
      console.log('continue!')
      continue
    } else if (values[key] > greatest) {
      greatest = values[key]
      nextMove = key;
      //console.log(greatest, nextMove)
    }
  }
  // console.log('greatest: ', greatest, 'nextMove: ', nextMove)
  return nextMove
}

module.exports = { pick }
