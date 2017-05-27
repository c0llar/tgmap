let config = require('../config')
let Updater = require('./updater')

let Chat = require('./models/chat.js')

let graph = { nodes: [], links: [] }

let updateGraph = () => {
  // Chat.find({ postsPerDay: { $gt: 0 }})
  Chat.find()
    .populate('participants')
    .populate('tags')
    .then(chats => graph = { links: makeLinks(chats), nodes: chats })
}

let makeLinks = chats => {
  let links = []
  for (let i = 0; i < chats.length - 1; i +=1 )
    for (let j = i + 1; j < chats.length; j +=1 )
      links.push(makeLink(chats[i], chats[j]))
  return links.filter(link => link)
}

let makeLink = (A, B) => {
  let common = intersection(A.participants, B.participants).length
  if (common == 0) return null
  return {
    source: A,
    target: B,
    power: common / ((A.participants.length + B.participants.length) / 2)
  }
}

let intersection = (A, B) => A.filter(a => B.find(b => a._id == b._id))

let api = {
  getGraph: () => graph
}

let updater = Updater(updateGraph, config.graphUpdateInterval)

module.exports = Object.assign(updater, api)
