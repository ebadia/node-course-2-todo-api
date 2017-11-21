const {ObjectID} = require('mongodb')

const {mongoose} = require ('./../server/db/mongoose')
const {Todo} = require ('./../server/models/todo')

var id = '5a142517d2c359dd2f0ae1fd'

if ( !ObjectID.isValid(id) ) {
  console.log('ID not valid')
}

// Todo.remove({})
//
// ALL RECORDS
// Todo.remove({}).then(
//   todo => {
//     if(!todo) return console.log('Not found')
//     console.log( 'Todo by id', todo)
//   }
// ).catch( error => console.log(error))

// Todo.findOneAndRemove()
// Todo.findByIdAndRemove(id)
//
Todo.findByIdAndRemove('5a14a2ffcef1ceeaa26eaed5').then(
 result => console.log(result)
)
