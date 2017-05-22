let config = require('../config')

let Chat = require('./models/chat.js')

let graph = { nodes: [], links: [] }

let timerId = 0
let Updater = () => {
  if (timerId) {
    return { getGraph: () => graph }
  } else {
    timerId = setInterval(updateGraph, config.graphUpdateInterval * 1000)
    return { getGraph: () => graph }
  }
}

let updateGraph = () => {
  Chat.find({ postsPerDay: { $gt: 0 }})
    .populate('participants')
    .then(chats => graph = {links: makeLinks(chats), nodes: chats} )
}

let makeLinks = chats => {
  let links = []
  for (let i = 0; i < chats.length - 1; i +=1 )
    for (let j = i + 1; j < chats.length; j +=1 )
      links.push(makeLink(chats[i], chats[j]))
  return links
}

let makeLink = (chatA, chatB) => {
  let power = intersection(chatA.participants, chatB.participants).length /
              ((chatA.participants.length + chatB.participants.length) / 2)
  return {
    source: chatA,
    target: chatB,
    power: power
  }
}

let intersection = (A, B) => A.filter(a => B.find(b => a._id == b._id))


module.exports = Updater
