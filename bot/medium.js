let http = require('http')
let EventEmitter = require('events').EventEmitter;
let localtunnel = require('localtunnel')

let config = require('../config')
let api = require('./api')

let medium = new EventEmitter();

let server = http.createServer((request, response) => {
  let body = []
  request
    .on('data', chunk => body.push(chunk))
    .on('end', () => {
      body = Buffer.concat(body).toString()
      emitUpdate(JSON.parse(body))
      response.end()
    })
})

let emitUpdate = update => {
  if (update.message) {
    if (update.message.chat.type == 'private')
      medium.emit('private_message', update.message)
    else
      medium.emit('public_message', update.message)
  }

  medium.emit('update', update)
}

let setupWebhook = () => {
  api.setWebhook("") // remove old webhook
  if (config.DEBUG) {
    localtunnel(config.webhookPort, (err, tunnel) =>
                api.setWebhook(tunnel.url)
                .then(res => console.log(`[DEBUG] ${res.description}`)))
  } else {
    api.setWebhook(config.webhookUrl, config.certificate)
  }
}

server.listen(
  config.webhookPort,
  '127.0.0.1',
  () => {
    setupWebhook()
    console.log('[BOT] Started')
  }
)

module.exports = medium
