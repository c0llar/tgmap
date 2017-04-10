let fs = require('fs')
let request = require('request')
let querystring = require('querystring')
let config = require('../config')

const invokeMethod = (method, arguments = {}, file = null) => {
  let formData = null
  if (file)
    formData = { document: fs.createReadStream(file) }

  return new Promise((resolve, reject) => {
    request.post(
      { url: `https://api.telegram.org/bot${config.token}/${method}`,
        qs: arguments,
        formData: formData },
      (err, res, body) => resolve(JSON.parse(body))
    )
  })
}

const setWebhook = (url, certificate) => {
  return invokeMethod('setWebhook', {
    url: url
  }, certificate)
}

const sendMsg = (recepient, text) => {
  return invokeMethod('sendMessage', {
    chat_id: recepient,
    text: text
  })
}

const sendPhoto = (recepient, photo) => {
  return invokeMethod(
    'sendDocument',
    { chat_id: recepient },
    photo
  )
}

const sendReply = (recepient, replyTo, text ) => {
  return invokeMethod('sendMessage', {
    chat_id: recepient,
    reply_to_message_id: replyTo,
    text: text
  })
}

const getChatAdministrators = (chatId) => {
  return invokeMethod('getChatAdministrators', {
    chat_id: chatId
  })
}

module.exports = {
  invokeMethod,
  setWebhook,
  sendMsg,
  sendReply,
  sendPhoto,
  getChatAdministrators
}
