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

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 9001))

app.enable('verbose errors')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(poweredByHandler)

// --- SNAKE LOGIC GOES BELOW THIS LINE ---

function randomDirection(){
  const directions = ['up', 'down', 'left', 'right']
  return directions[Math.floor(Math.random()*Math.floor(4))]
}

// Handle POST request to '/start'
app.post('/start', (request, response) => {
  // NOTE: Do something here to start the game

  // Response data
  const data = {
    color: '#DFFF00',
    head_url: 'http://www.placecage.com/c/200/200', // optional, but encouraged!
    taunt: "Not even I know what Im about to do!", // optional, but encouraged!
  }

  return response.json(data)
})

// Handle POST request to '/move'
app.post('/move', (request, response) => {
  // console.log(`my health:  ${request.body.you.health}`)
  // console.log(`turn number: ${request.body.turn}`)
  // request.body.snakes.data[0].body.data.forEach((snake) => {
  //   console.log(`a snake: ${snake}`)
  // })
  // request.body.you.body.data[0].forEach((youObj) => {
  //   console.log(`me object:${youObj}`)
  // })
  //
  console.log(`food is here: x:${request.body.food.data[0].x} y:${request.body.food.data[0].y}`)
  console.log(`I am HERE! x:${request.body.you.body.data[0].x} y:${request.body.you.body.data[0].y}`)
  // console.log(`this is how long the dumb  ${typeof request.body.food.data[0]}   ${request.body.food.data[0].length}`)
  // console.log(`snakes:  ${request.body.snakes.data}`)
  // Response data
  const data = {
    move: randomDirection(), // one of: ['up','down','left','right']
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
