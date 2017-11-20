// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

var obj = new ObjectID()
console.log(obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongoDB server')
  }
  console.log('Connected to mongoDB server')

  db.collection('Todos').find({}).count().then(
    count => console.log( `>>> ${count} documents found in Todos collection`),
    err => coneole.log('Unable to count docs')
  )

  db.collection('Todos').findOneAndUpdate(
    { _id: new ObjectID('5a1084812753099f2c70bed8') },
    { $set: { completed: false } },
    { returnOriginal: false }
  ).then(
    data => {
      console.log( data )
    },
    error => {
      console.log( error )
    }
  )

  db.collection('Users').findOneAndUpdate(
    { _id: new ObjectID('5a10bf1f563bbd3f40941870') },
    {
      $set: { location: 'girona' },
      $inc: { age: -5 }
    },
    { returnOriginal: false }
  ).then(
    data => {
      console.log( data )
    },
    error => {
      console.log( error )
    }
  )

  db.close()
})
