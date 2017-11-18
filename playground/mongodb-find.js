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

  // db.collection('Todos').find({completed: false}).toArray().then(
  // db.collection('Todos').find({
  //   _id : new ObjectID('5a109618563bbd3f40940a08')
  // }).toArray().then(
  //   docs => {
  //     console.log('Todos')
  //     console.log( JSON.stringify( docs, undefined, 2) )
  //   },
  //   err => console.log('Unable to connect to mongoDB server')
  // )

  db.collection('Users').find({}).count().then(
    count => console.log( `>>> ${count} documents found in Todos collection`),
    err => coneole.log('Unable to count docs')
  )

  db.collection('Users').find({
    name : 'ferran'
  }).toArray().then(
    docs => {
      console.log('Users')
      console.log( JSON.stringify( docs, undefined, 2) )
    },
    err => console.log('Unable to connect to mongoDB server')
  )

  db.close()
})
