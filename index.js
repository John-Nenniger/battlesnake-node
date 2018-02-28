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
// console.log(column, column.length)
const grid = [];
for (let x=0;x<20;x++){
  grid.push(column);
}
// console.log(grid)


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
  const food = [request.body.food.data[0].x, request.body.food.data[0].y]
  const snekPlace = [request.body.you.body.data[0].x, request.body.you.body.data[0].y]

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
  // NOTE: Do something here to generate your move
  const food = [request.body.food.data[0].x, request.body.food.data[0].y]
  const snekPlace = [request.body.you.body.data[0].x, request.body.you.body.data[0].y]

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
