let fs = require('fs')
let config = require('../config')
let mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(config.mongodbURI)
mongoose.connection
  .on('error', err => console.log('[BOT] db connection error'))
  .once('open', () => console.log('[BOT] db connection established'))

fs.readdir( __dirname + '/modules/', (err, files) => {
  files.forEach(file => require(`./modules/${file}`))
})


