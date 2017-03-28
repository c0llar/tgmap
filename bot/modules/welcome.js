let api = require('../api')
let medium = require('../medium')
let config = require('../../config')

const welcomingMessage = `
Hola soy Dora la exploradora
/info_en@${config.username}
/info_ru@${config.username}
`
const info_ru = `хуй`
const info_en = `pizda`

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
