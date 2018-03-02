function foodValue(distance) {
  return Math.floor(Math.log(25 / (distance + 1)) * 5) - 6
}

function absoluteDifference(a, b) {
  return Math.abs(a - b)
}

const updateFoodGrid = (x, y, grid, weight) => {
  let minx = x - 3;
  let maxx = x + 3;
  let miny = y - 3;
  let maxy = y + 3;

  for (let currentx = minx, counter = 0; currentx <= maxx; currentx++ , counter++) {
    if (currentx < 0 || currentx > 19) {
      continue
    }
    // now I need a number that starts at 1, then goes up to 9 by incrementign by 2
    // then increments by 2 back down to 1.  Maybe I'll just make it an array?
    let diamond = [1, 2, 3, 4, 3, 2, 1]
    for (let currenty = y - diamond[counter]; currenty <= y + diamond[counter]; currenty++) {
      if (currenty < 0 || currenty > 19) {
        continue
      }
      distance = absoluteDifference(currentx, x) + absoluteDifference(y, currenty)
      grid[currenty][currentx] += foodValue(distance)
    }
  }
}

module.exports.updateFoodGrid = updateFoodGrid;
