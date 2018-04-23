const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  passwordHash: String,
  type: String
})

userSchema.statics.format = (user) => {
  return {
    id: user._id,
    name: user.name,
    type: user.type
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User