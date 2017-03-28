let mongoose = require('mongoose')
let Schema = mongoose.Schema

let Tag = require('./tag')
let User = require('./user')
let Update = require('./update')

let chatSchema = mongoose.Schema({
  type: String,
  username: String,
  title: String,
  id: Number,

  postsPerDay: Number,
  // updates: [{ type: Schema.Types.ObjectId, ref: 'Update' }],
  participants: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    default: []
  },
  tags: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    default: []
  }
})

module.exports = mongoose.model('Chat', chatSchema);
