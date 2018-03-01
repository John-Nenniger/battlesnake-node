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

// Define global variables that will persist between turns
let foodPosition = []; // will just have an x and a y value
const grid = [];
for (let x = 0; x < 20; x++){
  const column = [];
  column[19] = 0;
  column.fill(0);
  grid.push(column);
}
// console.log(grid)

// to visualize, lets say the food is at [10,10]
function foodValue(distance) {
  return Math.floor(Math.log(25/(distance+1))*5) - 6
}

function absoluteDifference(a,b){
  return Math.abs(a - b)
}

function foodGrid(x, y, grid, weight){
  let minx = x-3;
  let maxx = x+3;
  let miny = y-3;
  let maxy = y+3;

  for (let currentx = minx, counter=0; currentx <= maxx; currentx++, counter++){
    if (currentx < 0 || currentx > 19){
      continue
    }
    // now I need a number that starts at 1, then goes up to 9 by incrementign by 2
    // then increments by 2 back down to 1.  Maybe I'll just make it an array?
    let diamond = [1,2,3,4,3,2,1]
    for (let currenty = y - diamond[counter]; currenty <= y + diamond[counter]; currenty++){
      if (currenty < 0 || currenty > 19){
        continue
      }
      distance = absoluteDifference(currentx, x) + absoluteDifference(y, currenty)
      grid[currenty][currentx] += foodValue(distance)
    }
  }
}

// just for testing
foodGrid(3,14, grid)
console.log(grid)

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 9001))

app.enable('verbose errors')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(poweredByHandler)

// --- SNAKE LOGIC GOES BELOW THIS LINE ---

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
  const food = [request.body.food.data[0].x, request.body.food.data[0].y]
  const snekPlace = [request.body.you.body.data[0].x, request.body.you.body.data[0].y]

  if (request.body.turn===1 || foodPosition[0] !== food[0] || foodPosition[1] !== food[1]){
    foodGrid(food[0],food[1], grid)
    foodPosition = [food[0], food[1]]
  }

  // Response data
  const data = {
    move: 'up', // one of: ['up','down','left','right']
    taunt: 'Outta my way, snake!', // optional, but encouraged!
  }

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
