function foodValue(distance) {
  return Math.floor(Math.log(25 / (distance + 3)) * 5) - 3
}

function absoluteDifference(a, b) {
  return Math.abs(a - b)
}

const updateFoodGrid = (food, grid, boardLength) => {
  food.forEach((array) => {
    console.log(array, array[0], array[1])
    let x = array[0]
    let y = array[1]
    let minx = x - 5;
    let maxx = x + 5;
    let miny = y - 5;
    let maxy = y + 5;

    for (let currentx = minx, counter = 0; currentx <= maxx; currentx++ , counter++) {
      if (currentx < 0 || currentx > boardLength - 1) {
        continue
      }
      // now I need a number that starts at 1, then goes up to 9 by incrementign by 2
      // then increments by 2 back down to 1.  Maybe I'll just make it an array?
      let diamond = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]
      for (let currenty = y - diamond[counter]; currenty <= y + diamond[counter]; currenty++) {
        if (currenty < 0 || currenty > boardLength) {
          continue
        }
        distance = absoluteDifference(currentx, x) + absoluteDifference(y, currenty)
        // console.log(foodValue(distance));
        // console.log(grid[currenty][currentx]);

        grid[currenty][currentx] += foodValue(distance)
      }
    }
  })
}

module.exports = {
  updateFoodGrid
}
