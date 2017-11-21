const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')
const _ = require('lodash')

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

app.get('/todos/:id', (req,res) => {

  if ( !ObjectID.isValid(req.params.id) ) {
    return res.status(404).send()
  }

  Todo.findById(req.params.id).then(
    todo => {
      if (!todo) {
        return res.status(404).send()
      }
      res.send(todo)
    },
    error => res.status(400).send(error)
  )

})

app.delete('/todos/:id', (req,res) => {

  if( !ObjectID.isValid(req.params.id) ){
    return res.status(404).send()
  }

  Todo.findByIdAndRemove(req.params.id).then(
    todo => {
      if (!todo) {
        return res.status(404).send()
      }
      res.send(todo)
    },
    error => res.status(400).send(error)
  )

})

app.patch('/todos/:id', (req,res) => {

  if ( !ObjectID.isValid(req.params.id) ) {
    return res.status(404).send()
  }

  // filters what can be updated
  var body = _.pick(req.body, ['text', 'completed'] )

  if ( _.isBoolean(body.completed) && body.completed ){
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }

  Todo.findByIdAndUpdate( req.params.id, {$set: body}, {new: true} ).then(
    todo => {
      if (!todo) {
        return res.status(404).send()
      }
      res.send(todo)
    },
    error => res.status(400).send(error)
  )

})


app.listen( port, () => {
  console.log(`Server up at port ${port}`)
})

module.exports = {
  app
}
