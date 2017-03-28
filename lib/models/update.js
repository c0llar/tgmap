let mongoose = require('mongoose')

let updateSchema = mongoose.Schema({
  update_id: {
    type: Number,
    required: true
  },
  message: Object,
  edited_message: Object,
  channel_post: Object,
  edited_channel_post: Object,
  inline_query: Object,
  chosen_inline_result: Object,
  callback_query: Object
})

module.exports = mongoose.model('Update', updateSchema);
