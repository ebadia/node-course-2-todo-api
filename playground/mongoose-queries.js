const {ObjectID} = require('mongodb')

const {mongoose} = require ('./../server/db/mongoose')
const {Todo} = require ('./../server/models/todo')

var id = '5a142517d2c359dd2f0ae1fd'

if ( !ObjectID.isValid(id) ) {
  console.log('ID not valid')
}

// Todo.find({
//   _id: id
// }).then(
//   // returns an array
//   todos => console.log('Todos', todos)
// )
//
// Todo.findOne({
//   _id: id
// }).then(
//   // returns an object
//   todo => console.log( 'Todo', todo )
// )

Todo.findById(id).then(
  todo => {
    if(!todo) return console.log('Not found')
    console.log( 'Todo by id', todo)
  }
).catch( error => console.log(error))
