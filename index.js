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

const column = [];
column[19] = 0;
column.fill(0);

const grid = [];
for (let x = 0; x < 20; x++) {
  grid.push(column);
}


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
  let start = Date.now();

  const food = [request.body.food.data[0].x, request.body.food.data[0].y]
  const snekPlace = [request.body.you.body.data[0].x, request.body.you.body.data[0].y]

  // Response data
  const data = {
    move: 'up', // one of: ['up','down','left','right']
    taunt: 'Outta my way, snake!', // optional, but encouraged!
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
