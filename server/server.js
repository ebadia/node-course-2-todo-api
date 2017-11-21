const express = require('express')
const bodyParser = require('body-parser')

var { mongoose } = require('./db/mongoose')
var { Todo } = require('./models/todo')
var { User } = require('./models/user')

const port = process.env.PORT || 3000
var app = express()

app.use( bodyParser.json() )

app.get('/todos', (req,res) => {
  Todo.find().then(
    todos => {
      res.send({todos})
    },
    error => res.status(400).send(error)
  )
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

module.exports = {
  app
}
