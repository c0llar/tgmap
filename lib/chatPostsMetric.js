let config = require('../config')
let Updater = require('./updater')

let Update = require('./models/update')
let Chat = require('./models/chat')

let updatePPD = () =>
  Chat.find()
    .then(chats => chats.map(chat => updatePostCount(chat)))

let updatePostCount = (chat) => {
  let yesterday = (Date.now() - (1000 * 60 * 60 * 24)) / 1000
  Update.count({
    'message.chat.id' : chat.id,
    'message.date' : {$gt: yesterday}
  }).then(count => {
    chat.postsPerDay = count
    chat.save()
  })
}

module.exports = Updater(updatePPD, config.PPDupdateInterval)
