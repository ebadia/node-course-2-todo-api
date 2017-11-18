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

  // // deleteMany
  // db.collection('Todos').deleteMany({
  //   text: 'eat lunch'
  // }).then(
  //   res => console.log(res.result),
  //   err => console.log(err)
  // )

  // deleteOne
  // db.collection('Todos').deleteOne({
  //   text: 'eat lunch'
  // }).then(
  //     res => console.log(res.result),
  //     err => console.log(err)
  // )

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({
  //   text: 'eat lunch'
  // }).then(
  //     res => console.log(res),
  //     err => console.log(err)
  // )

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5a109c5b4c3f07a039f5b600')
  }).then(
    res => console.log(res),
    err => console.log(err)
  )

  db.close()
})
