const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

var data = {
  id: 4
}

var passw = '123abc!'

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash( passw, salt, (err, hash) => {
//     console.log( hash )
//   })
// })

var hashedPassw = '$2a$10$740eqA5L2xT7TTQ67CMa6uLZn16VvjmkH2gZVdxaPzBWvB7v/thxi'

bcrypt.compare( '123!', hashedPassw, (err, res) => {
  console.log(res)
})


// var token = jwt.sign(data, '123abc')
// console.log(token)
//
// //
// var decoded = jwt.verify(token, '123abc')
// console.log(decoded)

// var message = "I am user number 3"
// var hash = SHA256(message).toString()
//
// console.log(`Message: ${message}`)
// console.log(`Hash: ${hash}`)



// var data = {
//   id: 4
// }
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// token.data.id = 5
// token.hash = SHA256(JSON.stringify(token.data)).toString()
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()
//
// if ( resultHash === token.hash ){
//   console.log('Not changed')
// } else {
//   console.log('CHANGED!')
// }
