var mongoose = require('mongoose')

// User mongoose model
var User = mongoose.model( 'User', {
  email: {
    type: String,
    require: true,
    trim: true,
    minlength: 1

  }
})

module.exports = {
  User
}
