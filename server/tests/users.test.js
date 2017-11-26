const request = require('supertest')
const expect = require('expect')
const { ObjectID } = require('mongodb')
var { User } = require('./../models/user')

const { app } = require('./../server')
const { users, populateUsers } = require('./seed/seed')

beforeEach( populateUsers )

describe('POST /users', () => {

  it('should create a user', done => {

    var user = { email: 'test@one.com', password: '12345' }

    request(app)
      .post('/users')
      .send(user)
      .expect(200)
      .expect( res => {
        expect( res.headers['x-auth'] ).toExist()
        expect( res.body._id ).toExist()
        expect( res.body.email ).toBe(user.email)
      })
      .end( (err) => {
        if (err)  { return done(err) }

        // we use this function to make post calls to de ddbb
        User.findOne({email: user.email}).then(
          res => {
            expect(res).toExist()
            expect(res.password).toNotBe(user.password)
            done()
        })
      })

  })

  it('should return validation errors if request invalid', done => {

    var user = { email: 'test', password: '123' }

    request(app)
      .post('/users')
      .send(user)
      .expect(400)
      .end(done)
  })

  it('should not create user if email in use', done => {

    var user = users[0]

    request(app)
      .post('/users')
      .send(user)
      .expect(400)
      .end(done)

  })

})

describe('GET /users/me', () => {

  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token )
      .expect(200)
      .expect( (res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString())
        expect(res.body.email).toBe(users[0].email)
      })
      .end( (err, res) => {
        if (err) { return done(err) }
        done()
      })

  })

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect( (res) => {
        expect(res.body).toEqual({})
      })
      .end(done)
  })


})
