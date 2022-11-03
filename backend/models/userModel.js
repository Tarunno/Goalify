const { default: mongoose } = require('mongoose')
const monggoose = require('mongoose')

const userSchema = monggoose.Schema({
  name: {
    type: String,
    require: [true, 'Please add a name!']
  },
  email: {
    type: String,
    require: [true, 'Please add a email!'],
    unique: true
  },
  password: {
    type: String,
    require: [true, 'Please add a password!']
  }
})

module.exports = mongoose.model('User', userSchema)
