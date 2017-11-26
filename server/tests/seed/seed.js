const { ObjectID } = require('mongodb')
const jwt = require('jsonwebtoken')

var { Todo } = require('./../../models/todo')
var { User } = require('./../../models/user')


const todos = [
  { text: 'first test todo',   _id: new ObjectID() },
  { text: 'second test todo',  _id: new ObjectID(), completed: true, completedAt: 333 }
]

const user1id = new ObjectID()
const user2id = new ObjectID()

const users = [
  { email: 'good@one.com', password: '12345',   _id: user1id , tokens: [ { access: 'auth', token: jwt.sign( { _id: user1id, access: 'auth' }, 'abc123' ).toString() } ] },
  { email: 'bad@one.com', password: '12345',  _id: user2id }
]

const populateTodos = (done)=> {
  Todo.remove({}).then(
    () => { return Todo.insertMany(todos) }
  ).then( () => done())
}

const populateUsers = (done)=> {
  User.remove({}).then(
    () => {
      var user1 = new User( users[0] ).save()
      var user2 = new User( users[1] ).save()

      return Promise.all([user1, user2])
    }
  ).then( () => done())
}

module.exports = {
  todos,
  users,
  populateTodos,
  populateUsers
}
