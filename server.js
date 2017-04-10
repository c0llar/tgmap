let config = require('./config')
let express = require('express')
let app = express()

let postsMetric = require('./lib/chatPostsMetric')
let updater = postsMetric()

let mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(config.mongodbURI)
mongoose.connection
  .on('error', err => console.log('[APP] db connection error'))
  .once('open', () => console.log('[APP] db connection established'))

let Update = require('./lib/models/update')
let Chat = require('./lib/models/chat')

app.use(express.static('public'))

app.get('/chats', (req, res) => {
  Chat.find()
    .sort({ _id: -1}).limit(25)
    .populate('tags')
    .populate('participants')
    .then(chats => {
      res.send(JSON.stringify(
        chats.concat(chats).concat(chats).concat(chats).concat(chats)
      ))
    })
})

app.get('/:chatId', (req, res) => {
  Chat.findOne({id: Number(req.params.chatId)})
    .populate('tags')
    .populate('participants')
    .then(chat => {
      res.send(JSON.stringify(chat))
    })
    .catch(err => {
      res.send('404')
    })
})

app.listen(config.serverPort, () => {
  console.log('[APP] Started')
})
