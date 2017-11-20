const express = require('express')
const bodyParser = require('body-parser')

var { mongoose } = require('./db/mongoose')
var { Todo } = require('./models/todo')
var { User } = require('./models/user')

const port = process.env.PORT || 3000
var app = express()

app.use( bodyParser.json() )

app.get('/', (req,res) => {
  res.send( 'Hello mon!')
})

app.post('/todos', (req,res) => {
  var todo = new Todo({
    text: req.body.text
  })
  todo.save().then(
    doc => res.send(doc),
    error => res.status(400).send(error)
  )
})


app.listen( port, () => {
  console.log(`Server up in port ${port}`)
})
