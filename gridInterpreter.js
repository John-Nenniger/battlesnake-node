const snek = require('./snekJson');

// example grid
//grid[#down][#right]
//grid[-1][4]
//let prevMove = 'up'

function pick(x, y, grid, prevMove) { // where x and y refer to the
  // first we need to remove the opposite of the previous move from the possibilities
  // opposites.prevMove  is the one we can't pick
  // console.log(prevMove)

  //so the problem is that grid[-1] is undefined, then we try to get a property from it
  // and that crashes... This is what needs to be fixed
  
  console.log([x, y])
  let opposites = {'up':'down', 'right':'left', 'down': 'up', 'left':'right'}
  let directions = ['up', 'down', 'left', 'right']
  let values = {'down': grid[y+1][x], 'up': grid[y-1][x], 'right': grid[y][x+1], 'left': grid[y][x-1]};
  let greatest = -100;
  let nextMove = '';
  for (let key in values){
    console.log(key, values[key])
    if (!values[key] || key === opposites[prevMove]){
      // console.log('continue!')
      continue
    } else if (values[key] > greatest){
      greatest = values[key]
      nextMove = key;
      //console.log(greatest, nextMove)
    }
  }
  // console.log('greatest: ', greatest, 'nextMove: ', nextMove)
  return nextMove
}

module.exports = {pick}
