let mongoose = require('mongoose')

let userSchema = mongoose.Schema({
  id: Number,
  username: String,
  last_name: String,
  first_name: String
})

module.exports = mongoose.model('User', userSchema);

// from: 
// { username: 'kaschmir',
//   last_name: 'Latonov',
//   first_name: 'Anton',
//   id: 262277585 },
