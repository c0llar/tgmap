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
let Tag = require('./lib/models/tag')

app.use(express.static('public'))

app.get('/api/chats', (req, res) => {
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

app.get('/api/tags', (req, res) => {
  Tag.find()
    .then(tags => {
      res.send(JSON.stringify(tags))
    })
})

app.get('/api/:chatId', (req, res) => {
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

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(
  config.serverPort,
  "127.0.0.1",
  () => console.log('[APP] Started')
)
