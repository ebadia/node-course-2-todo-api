const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect( 'mongodb://localhost:27017/TodoApp', { useMongoClient: true })

// Todo mongoose model
var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
})

var newTodo = new Todo({
  text: 'get bytes',
  completed: false
})

newTodo.save().then(
  doc => console.log('saved: ', doc),
  error => console.log('unable to save todo')
)
