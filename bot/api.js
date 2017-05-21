let fs = require('fs')
let request = require('request')
let querystring = require('querystring')
let config = require('../config')

const invokeMethod = (method, arguments = {}, formData = null) => {
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
  if (certificate)
    return invokeMethod(
      'setWebhook',
      { url: url },
      { certificate: fs.createReadStream(certificate) }
    )
  else
    return invokeMethod(
      'setWebhook',
      { url: url }
    )
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

const getUserProfilePhotos = (userId, offset, limit = 100) => {
  return invokeMethod('getUserProfilePhotos', {
    user_id: userId,
    offset: offset,
    limit: limit
  })
}

module.exports = {
  invokeMethod,
  setWebhook,
  sendMsg,
  sendReply,
  sendPhoto,
  getChatAdministrators,
  getUserProfilePhotos
}
