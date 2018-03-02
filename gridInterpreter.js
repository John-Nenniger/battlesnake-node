const snek = require('./snekJson');

// example grid

const grid = [];
for (let x = 0; x < 20; x++) {
    const column = [];
    column[19] = x;
    column.fill(x);
    grid.push(column);
}


let opposites = { 'up': 'down', 'right': 'left', 'down': 'up', 'left': 'right' }
let directions = ['up', 'down', 'left', 'right']
let prevMove = 'up'
let noGo = ""

function interpreter(x, y, grid, prevMove) { // where x and y refer to the
    // first we need to remove the opposite of the previous move from the possibilities
    // opposites.prevMove  is the one we can't pick
    for (let key in opposites) {
        if (key.toString() == prevMove) {
            noGo = opposites[key]
        }
    }
}

module.exports.interpreter = interpreter;
