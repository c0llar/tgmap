let config = require('../config')

let Update = require('./models/update')
let Chat = require('./models/chat.js')

let timerId = 0
let Updater = () => {
  let t = Date.now()
  if (timerId) {
    return false // TODO return handler
  } else {
    timerId = setInterval(updatePPD, config.PPDupdateInterval * 1000)
    return true // TODO return handler
  }
}

let yesterday = 0
let updatePPD = () => {
  yesterday = (Date.now() - (1000 * 60 * 60 * 24)) / 1000
  Chat.find()
    .then(chats => {
      for (let chat of chats) {
        Update.count({
          'message.chat.id' : chat.id,
          'message.date' : {$gt: yesterday}
          }).then(count => {
            chat.postsPerDay = count
            chat.save()
          })
      }
    })
}

module.exports = Updater
