let config = require('../config')

let Update = require('./models/update')
let Chat = require('./models/chat.js')

let timerId = 0
let Updater = () => {
  if (timerId) {
    return { stop: stopUpdater }
  } else {
    timerId = setInterval(updatePPD, config.PPDupdateInterval * 1000)
    return { stop: stopUpdater }
  }
}

let updatePPD = () => {
  Chat.find()
    .then(chats => chats.map(chat => updatePostCount(chat)))
}

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

let stopUpdater = () => {
  clearInterval(timerId)
  timerId = 0
}

module.exports = Updater
