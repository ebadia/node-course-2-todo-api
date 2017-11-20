// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

// var obj = new ObjectID()
// console.log(obj)

MongoClient.connect('mongodb://localhost:27017/TodoNative', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongoDB server')
  }
  console.log('Connected to mongoDB server')

  db.collection('Todos').insertOne( {
    text: 'eat lunch',
    completed: false
  }, (err,res) => {
    if (err) {
      return console.log('Unable to insert todo', err)
    }
    console.log( JSON.stringify( res.ops, undefined, 2 ))
  })


  // db.collection('Users').insertOne( {
  //   name: 'albert',
  //   age: 50,
  //   location: 'lleida'
  // }, (err,res) => {
  //   if (err) {
  //     return console.log('Unble to insert user')
  //   }
  //   console.log( res.ops[0]._id.getTimestamp() )
  // })
  //
  // db.collection('Users').insertOne( {
  //   name: 'ferran',
  //   age: 56,
  //   location: 'bcn'
  // }, (err,res) => {
  //   if (err) {
  //     return console.log('Unble to insert user')
  //   }
  //   console.log( res.ops[0]._id.getTimestamp() )
  // })


  db.close()
})
