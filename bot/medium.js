let EventEmitter = require('events').EventEmitter;
let localtunnel = require('localtunnel')

let express = require('express')
let bodyParser = require('body-parser')
let app = express()
app.use(bodyParser.json())

let config = require('../config')
let api = require('./api')

let medium = new EventEmitter();

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
      .then( _ => console.log(`[PROD] webhook was set at ${config.webhookUrl}`))
  }
}

app.post('*', (req, res) => {
  emitUpdate(req.body)
  res.end()
});

app.listen(
  config.webhookPort,
  "127.0.0.1",
  () => {
    setupWebhook()
    console.log('[BOT] Started')
  }
)

module.exports = medium
