const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const app = express()
const {
    fallbackHandler,
    notFoundHandler,
    genericErrorHandler,
    poweredByHandler
} = require('./handlers.js')

const snakes = require('./snakes');
const foodGrid = require('./foodGrid');
const interpreter = require('./gridinterpreter')
// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 9001))

app.enable('verbose errors')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(poweredByHandler)

/* ----- BEGIN_SNEK_CODE ----- */

// Define global variables that will persist between turns
let prevMove = ''; // tracks previous move
let foodPosition = []; // will just have an x and a y value


// Functions go here, to be called in the move listener

// just for testing
// foodGrid(3, 14, grid)
// console.log(grid)

function defineGrid(grid = [], height = 20, width = 20) {
    for (let x = 0; x < height; x++) {
        const column = [];
        column[width - 1] = 0;
        column.fill(0);
        grid.push(column);
    }
    return grid;
}

function randomDirection(prevDirection) {
    let directions = [];
    switch (prevDirection) {
        case "up":
            directions = ['up', 'left', 'right']
            break;
        case "down":
            directions = ['left', 'right', "down"]
            break;
        case "left":
            directions = ['left', 'up', "down"]
            break;
        case "right":
            directions = ['right', 'up', "down"]
            break;
        default:
            directions = ['up', 'left', 'down', 'right']
    }
    const randMove = directions[Math.floor(Math.random() * Math.floor(directions.length))];
    prevMove = randMove; // update global prevMove variable
    return randMove;
}

// Handle POST request to '/start'
app.post('/start', (request, response) => {
    // Response data
    const data = {
        color: 'teal',
        head_url: 'http://25.media.tumblr.com/7fcfecd8dba001ecdbae6bff5fe10342/tumblr_mg6awfY46I1s2a05ho1_400.gif', // optional, but encouraged!
        taunt: "!?", // optional, but encouraged!
    }

    return response.json(data)
})


// Handle POST request to '/move'
app.post('/move', (request, response) => {
    //
    let start = Date.now();
    //
    let move = '';
    let gameGrid = defineGrid([], request.body.height, request.body.width); // Define a new grid every turn. Solves problem of bleeding of snakes moving around on the board

    const food = [request.body.food.data[0].x, request.body.food.data[0].y]

    // Paint grid with snakes and adjacent tiles. Takes the game grid and post request as arguments.
    // Returns an updated game 'state'
    snakes.updateGridWithSnakes(gameGrid, request.body);
    foodGrid.updateFoodGrid(food[0], food[1], gameGrid, request.body.width) // This takes the board length as an arg now
    console.log(gameGrid)
    interpreter.pick(snekPlace[0], snekPlace[1], grid, prevMove)
    //move = result of pick()...
    prevMove = move

    // Response data
    const data = {
        move: move || randomDirection(prevMove), // If no move is defined default to a random direction. prevMove is a global var that keeps track of the prev move
        taunt: 'WHEREMA GONNA GO?!'
    }

    let end = Date.now();
    console.log(`SNAKE MOVE TOOK ${end - start} MS`);
    return response.json(data)
})

/* ----- END_SNEK_CODE ----- */

app.use('*', fallbackHandler)
app.use(notFoundHandler)
app.use(genericErrorHandler)

app.listen(app.get('port'), () => {
    console.log('Server listening on port %s', app.get('port'))
})

// LOG GARBAGE

// console.log(`my health:  ${request.body.you.health}`)
// console.log(`turn number: ${request.body.turn}`)
// request.body.snakes.data[0].body.data.forEach((snake) => {
//   console.log(`a snake: ${snake}`)
// })
// request.body.you.body.data[0].forEach((youObj) => {
//   console.log(`me object:${youObj}`)
// })

// console.log(`this is how long the dumb  ${typeof request.body.food.data[0]}   ${request.body.food.data[0].length}`)
// console.log(`snakes:  ${request.body.snakes.data}`)

// console.log(`food is here: x:${request.body.food.data[0].x} y:${request.body.food.data[0].y}`)
// console.log(`I am HERE! x:${request.body.you.body.data[0].x} y:${request.body.you.body.data[0].y}`)
// console.log(column, column.length)
// console.log(grid)

// From app.post/move
// const food = { x: request.body.food.data[0].x, y: request.body.food.data[0].y}
// const snekPlace = [request.body.you.body.data[0].x, request.body.you.body.data[0].y]

//
// if (request.body.turn === 1 || foodPosition[0] !== food[0] || foodPosition[1] !== food[1]) {
//   foodPosition = [food[0], food[1]]
// }
