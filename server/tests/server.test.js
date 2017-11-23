const request = require('supertest')
const expect = require('expect')
const {ObjectID} = require('mongodb')

const {app} = require('./../server')
var {Todo} = require('./../models/todo')

const todos = [
  { text: 'first test todo',   _id: new ObjectID() },
  { text: 'second test todo',  _id: new ObjectID(), completed: true, completedAt: 333 }
]

beforeEach( (done)=> {
  Todo.remove({}).then(
    () => { return Todo.insertMany(todos) }
  ).then( () => done())

})

describe('POST /todos', () => {

  it('should create a new todo', (done) => {

    var text = 'test todo text'

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect( res => {
        expect( res.body.text ).toBe( text )
      })
      .end( (err,res) => {
        if (err) { return done(err) }

        Todo.find({text}).then(
          todos => {
            expect(todos.length).toBe(1)
            expect(todos[0].text).toBe(text)
            done()
          }
        ).catch(
          e => done(e)
        )
      })
  })

  it('should not create a new todo with invalid data', (done) => {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end( (err,res) => {
        if (err) { return done(err) }

        Todo.find().then(
          todos => {
            expect(todos.length).toBe(2)
            done()
          }
        ).catch(
          e => done(e)
        )
      })

  })


})

describe('GET /todos', () => {

  it('should get all todos', (done) => {

    request(app)
      .get('/todos')
      .expect(200)
      .expect( res => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })

})

describe('GET /todos:id', () => {

  // id = '5a142517d2c359dd2f0ae1fd'

  it('should return 404 if Invalid ID', (done) => {

    let id = '123'

    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done)

  })

  it('should return 404 if ID Not Found', (done) => {

    let id = new ObjectID().toHexString()

    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done)

  })

  it('should return todo doc', (done) => {

    let id = todos[0]._id.toHexString()

    request(app)
    .get(`/todos/${id}`)
    .expect(200)
    .expect( res => {
      expect( res.body.text ).toBe(todos[0].text)
    })
    .end(done)

  })

})

describe('DELETE /todos:id', () => {

  // id = '5a142517d2c359dd2f0ae1fd'

  it('should return 404 if Invalid ID', (done) => {

    let id = '123'

    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done)

  })

  it('should return 404 if ID Not Found', (done) => {

    let id = new ObjectID().toHexString()

    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done)

  })

  it('should return todo deleted doc', (done) => {

    let id = todos[0]._id.toHexString()

    request(app)
    .delete(`/todos/${id}`)
    .expect(200)
    .expect( res => {
      expect( res.body.text ).toBe(todos[0].text)
    })
    .end( (err,res) => {
      if (err) {
        return done(err)
      }

      Todo.findById(id).then(
        todo => {
          expect(todo).toNotExist()
          done()
        }
      ).catch( e => done(e) )

    })

  })

})

describe('PATCH /todos:id', () => {

  // id = '5a142517d2c359dd2f0ae1fd'

  it('should return 404 if Invalid ID', (done) => {

    let id = '123'

    request(app)
      .patch(`/todos/${id}`)
      .expect(404)
      .end(done)

  })

  it('should return 404 if ID Not Found', (done) => {

    let id = new ObjectID().toHexString()

    request(app)
      .patch(`/todos/${id}`)
      .expect(404)
      .end(done)

  })

  it('should clear completedAt when todo is not completed', (done) => {

    let id = todos[1]._id.toHexString()

    request(app)
    .patch(`/todos/${id}`)
    .send({completed: false})
    .expect(200)
    .expect( res => {
      expect( res.body.completedAt ).toBe(null)
    })
    .end(done)

  })

  it('should update the todo', (done) => {

    let id = todos[0]._id.toHexString()

    request(app)
    .patch(`/todos/${id}`)
    .send({text: 'changed', completed: true})
    .expect(200)
    .expect( res => {
      expect( res.body.text ).toBe('changed')
      expect( res.body.completed ).toBe(true)
      expect( res.body.completedAt ).toBeA('number')
    })
    .end(done)

  })


})
