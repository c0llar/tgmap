let api = require('../api')
let medium = require('../medium')
let config = require('../../config')

let Update = require('../../lib/models/update')
let Chat = require('../../lib/models/chat')
let Tag = require('../../lib/models/tag')

medium.on('public_message', message => {
  if (message.text) {
    if ( message.text.startsWith('/tag ') ||
         message.text.startsWith(`/tag@${config.username} `) ) {
      api.getChatAdministrators(message.chat.id)
        .then(admins => {
          if (admins.result.some(entry => entry.user.id == message.from.id)) {
            clearTags(message.chat.id)
            setTags(message)
          }
        })
    }
  }
})

const clearTags = (chatId) =>
      Chat.update({ id: Number(chatId) }, { tags: [] }, {}, () => {})

const setTags = (message) => {
  let tags = message.text
      .split(' ')
      .filter(tag => tag != '')
      .filter((tag, i, a) => a.indexOf(tag) == i )
      .slice(1, 4)

  let tagJobs = tags.map(tagname =>
        Tag.findOne({name: tagname})
              .then(tag => tag ? tag : Tag({name: tagname}).save())
              .then(tag => pushTag(message.chat.id, tag)))

  Promise.all(tagJobs).then( _ =>
      api.sendReply(message.chat.id, message.message_id, 'Tags are set 👌'))
}

const pushTag = (chatId, tag) =>
  Chat.update(
    { id: Number(chatId) },
    { $push: { tags: tag._id}},
    {}, () => {}
  )
