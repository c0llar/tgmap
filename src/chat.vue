<template>
  <div class="chat">
    <div class="chatTitle" >
      {{ chat.title }}
    </div>
    <div class="username" v-if="chat.username">
      <a v-bind:href="`https://t.me/${chat.username}`">@{{chat.username}}</a>
    </div>
    <div class="tags">
      <span v-for="tag in chat.tags"
            v-bind:style="{ color: colorById(tag._id) }" >
        [{{ tag.name }}]
      </span>
    </div>
    <div> {{ chat.participants.length }} members </div>
    <div> {{ chat.postsPerDay }} posts for the last 24 hours </div>

    <div class="suggestions">
      <div> Chats nearby: </div>
      <div class="suggestion "v-for="chat in suggestions">
        <router-link v-if="chat.username" :to="{ path: chat.username }">
          {{ chat.title }}
        </router-link>
        <router-link v-else :to="{ path: String(chat.id) }">
          {{ chat.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { colorById }  from './helpers'

  export default {
    data() {
      return {
      }
    },

    methods: {
      updateCurrentChat() {
        this.$store.dispatch(
          'setCurrentChat',
          this.chat
        )
      },
      colorById
    },

    computed: {
      chat() {
        let id = this.$route.params.chatid
        let chat = this.$store.state.chats
            .filter(chat => !Number(id) ? chat.username == id
                                        : chat.id == Number(id))
        return chat[0] || {}
      },
      suggestions() {
        let id = this.$route.params.chatid
        let chatIsTarget = this.$store.state.graph.links
            .filter(link => !Number(id) ? link.target.username == id
                    : link.target.id == Number(id))
            .map(link => link.source)
        let chatIsSource = this.$store.state.graph.links
            .filter(link => !Number(id) ? link.source.username == id
                    : link.source.id == Number(id))
            .map(link => link.target)
        return chatIsTarget.concat(chatIsSource)
      }
    },

    watch: {
      '$route': 'updateCurrentChat'
    },

    mounted() {
      this.updateCurrentChat()
    },

    beforeDestroy() {
      this.$store.dispatch(
        'setCurrentChat',
        {}
      )
    }
  }
</script>

<style>
  .chat {
    font-size: 1vw;
    font-family: 'PT Mono', monospace;

    padding-top: 7px;
    padding-bottom: 7px;
    padding-left: 13px;
    padding-right: 13px;
  }

  .chatTitle {
    padding-top: 3vw;
    font-family: 'Oswald', sans-serif;
    font-size: 2vw;
    font-weight: bold;
  }

  .suggestions {
    padding-top: 7px;
  }

  .suggestion {
    font-family: 'Oswald', sans-serif;
    font-size: 1.0vw;
    font-weight: bold;
  }

  .suggestion a {
    text-decoration: none;
  }
</style>

