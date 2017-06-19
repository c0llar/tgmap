let config = require('../config')
let api = require('../bot/api')
let Updater = require('./updater')

let Chat = require('./models/chat')

let updateAllTitles = () => {
  Chat.find()
    .then(chats => chats.map(chat => updateTitle(chat)))
}

let updateTitle = (chat) => {
  api.getChat(chat.id)
    .then(response => response.ok ? response.result.title : chat.title )
    .then(title => Chat.update(
      { id: Number(chat.id) },
      { title: title },
      {}, () => {} ))
}

module.exports = Updater(updateAllTitles, config.chatTitleUpdateInterval)
