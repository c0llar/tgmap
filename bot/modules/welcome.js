let api = require('../api')
let medium = require('../medium')
let config = require('../../config')

const welcomingMessage = `
Hola soy Dora la exploradora
/info_en@${config.username}
/info_ru@${config.username}
`
const info_ru = `
Этот бот собирает чаты в карту, которая доступна на https://c0llar.me
Администраторы данного чата могут задать ему тэги с помощью команды /tag [tag1] [tag2] [tag3]
`
const info_en = `
Purpose of this bot is to collect chats into map which you access at https://c0llar.me
Adminstators can set tags for a chat via /tag [tag1] [tag2] [tag3] command
`

medium.on('public_message', message => {
  if (message.new_chat_member)
    if (message.new_chat_member.username == config.username)
      api.sendMsg(message.chat.id, welcomingMessage)

  switch (message.text) {
    case '/info_en':
    case `/info_en@${config.username}`:
      api.sendMsg(message.chat.id, info_en)
      break;
    case '/info_ru':
    case `/info_ru@${config.username}`:
      api.sendMsg(message.chat.id, info_ru)
      break;
  }
})
