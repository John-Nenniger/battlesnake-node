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

// Define global variables that will persist between turns here
let foodPosition = []; // will just have an x and a y value
let move = ""
const grid = [];

for (let x = 0; x < 20; x++) {
  const column = [];
  column[19] = 0;
  column.fill(0);
  grid.push(column);
}

// Functions go here, to be called in the move listener

// just for testing
console.log(grid)

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 9001))

app.enable('verbose errors')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(poweredByHandler)

// --- SNAKE LOGIC GOES BELOW THIS LINE ---

function randomDirection(prevDirection) {
  let directions = [];
  switch (prevDirection) {
    case "up": directions = ['up', 'left', 'right']
      break;
    case "down": directions = ['left', 'right', "down"]
      break;
    case "left": directions = ['left', 'up', "down"]
      break;
    case "right": directions = ['right', 'up', "down"]
      break;
  }
  return directions[Math.floor(Math.random() * Math.floor(3))]
}

// Handle POST request to '/start'
app.post('/start', (request, response) => {
  // NOTE: Do something here to start the game

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

  const food = [request.body.food.data[0].x, request.body.food.data[0].y]
  const snekPlace = [request.body.you.body.data[0].x, request.body.you.body.data[0].y]

  if (request.body.turn === 1 || foodPosition[0] !== food[0] || foodPosition[1] !== food[1]) {
    foodGrid(food[0], food[1], grid)
    foodPosition = [food[0], food[1]]
  }



  // Response data
  const data = {
    move: move, // one of: ['up','down','left','right']
    taunt: 'WHEREMA GONNA GO?!', // optional, but encouraged!
  }
  let end = Date.now();
  console.log(`SNAKE MOVE TOOK ${end - start} MS`);
  return response.json(data)
})

// --- SNAKE LOGIC GOES ABOVE THIS LINE ---

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
