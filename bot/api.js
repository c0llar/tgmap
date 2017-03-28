let https = require('https')
let querystring = require('querystring')
let config = require('../config')

const invokeMethod = (method, arguments = {}) => {
  let params = querystring.stringify(arguments)
  let query = `https://api.telegram.org/bot${config.token}/${method}?${params}`
  return new Promise((resolve, reject) => {
    https.get(query, res => {
      let body = ''
      res.on('data', data => body += data)
      res.on('end', () => resolve(JSON.parse(body)))
    });
  })
}

const sendMsg = (recepient, text) => {
  return invokeMethod('sendMessage', {
    chat_id: recepient,
    text, text
  })
}

const getChatAdministrators = (chatId) => {
  return invokeMethod('getChatAdministrators', {
    chat_id: chatId
  })
}

module.exports = {
  invokeMethod,
  sendMsg,
  getChatAdministrators
}
