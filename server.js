let config = require('./config')
let express = require('express')
let app = express()

let mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(config.mongodbURI)
mongoose.connection
  .on('error', err => console.log('[APP] db connection error'))
  .once('open', () => console.log('[APP] db connection established'))

let Update = require('./lib/models/update')
let Chat = require('./lib/models/chat')
let Tag = require('./lib/models/tag')

let postsMetric = require('./lib/chatPostsMetric')
let graphMetric = require('./lib/graphLinkMetric')
let graphMetric2 = require('./lib/graphLinkMetric')

app.use(express.static('public'))

app.get('/api/chats', (req, res) => {
  // Chat.find({ postsPerDay: { $gt: 0 }})
  Chat.find()
    .populate('tags')
    .populate('participants')
    .then(chats => JSON.stringify(chats))
    .then(json => res.send(json))
})

app.get('/api/tags', (req, res) => {
  Tag.find()
    .then(tags => {
      let tagsWithCount = []
      let tagJobs = tags.map(tag =>
          Chat
            .count({ tags: { $in: [tag] }, postsPerDay: { $gt: 0 }})
            .then(count =>
                tagsWithCount.push({ _id: tag._id, name: tag.name, count })))
      return Promise.all(tagJobs).then(_ => tagsWithCount)
    })
    .then(tags => JSON.stringify(tags))
    .then(json => res.send(json))
})

app.get('/api/graph', (req, res) => {
  res.send(JSON.stringify(graphMetric.getGraph()))
})

app.get('/api/:chatId', (req, res) => {
  Chat.findOne({id: Number(req.params.chatId)})
    .populate('tags')
    .populate('participants')
    .then(chat => JSON.stringify(chat))
    .then(json => res.send(json))
    .catch(err => res.send('404'))
})

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(
  config.serverPort,
  "127.0.0.1",
  () => console.log('[APP] Started')
)
