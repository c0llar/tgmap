let api = require('../api')
let medium = require('../medium')
let config = require('../../config')

let Update = require('../../lib/models/update')
let Chat = require('../../lib/models/chat')
let User = require('../../lib/models/user')

medium.on('update', update => {
  Update(update).save()
    .then(m => console.log(m))
})

medium.on('public_message', message => {
  if (message.from) { // logging users
    User.findOne({id: Number(message.from.id)})
      .then(user => user ? user : User(message.from).save())
      .then(user => updateUserPrecence(message.chat.id, user._id))
  }

  if (message.new_chat_member) { // logging chats
    if (message.new_chat_member.username == config.username) {
      Chat.findOne({ id: Number(message.chat.id) })
        .then(chat => {
          if (!chat) Chat(message.chat).save()
        })
    }
  }
})

const updateUserPrecence = (chatId, userId) => {
  Chat.update(
    { id: Number(chatId) },
    { $addToSet : { participants: userId} },
    {}, () => {}
  )
}
