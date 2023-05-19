const mongoose = require('mongoose')
const Goal = require('./goalModel')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please add a name!'],
    validate: {
      validator: (val) => {
        if(val.split(' ').length < 2){
          return false
        }
      },
      message: (props) => {
        return 'Enter your fullname'
      }
    }
  },
  email: {
    type: String,
    require: [true, 'Please add a email!'],
    unique: true,
    lowercase: true,
    minLength: 8,
    maxLength: 100
  },
  password: {
    type: String,
    require: [true, 'Please add a password!'],
    minLength: 8,
    maxLength: 100
  }
})

userSchema.methods.sayHi = function(){ //arrow function isn't allowed
  console.log(`Hi ${this.name}!`)
}
userSchema.statics.findByName = function(name){ //arrow function isn't allowed
  const users = this.where({name: new RegExp(name, 'i')}).select('-password')
  return users
}
userSchema.pre('remove', async function(next){ //on_delete=CASCADE for goals associated with user
  try{
    const res = await Goal.deleteMany({user:this._id})
    console.log(res)
    next()
  }
  catch(err){
    next(err)
  }
})

module.exports = mongoose.model('User', userSchema)
 