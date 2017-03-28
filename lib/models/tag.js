let mongoose = require('mongoose')

let tagSchema = mongoose.Schema({
  name: String
})

module.exports = mongoose.model('Tag', tagSchema);
