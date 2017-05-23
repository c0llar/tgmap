let config = require('../config')

let Update = require('./models/update')
let Chat = require('./models/chat.js')

let timer = 0
let Updater = () => {
  if (!timer)
    timer = setInterval(updatePPD, config.PPDupdateInterval * 1000)

  return {
    stop: () => {
      clearInterval(timer)
      timer = 0
    },
    continue: () => {
      if (!timer)
        timer = setInterval(updatePPD, config.PPDupdateInterval * 1000)
    },
    updateInterval: (interval) => {
      clearInterval(timer)
      timer = setInterval(updatePPD, config.PPDupdateInterval * 1000)
    }
  }
}

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

module.exports = Updater
