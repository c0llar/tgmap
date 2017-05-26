<template>
  <div class="chat">
    <div v-for="chat in findChat($store.state.chats, $route.params.chatid)">
      <div class="chatTitle">
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
      <div> {{ chat.postsPerDay }} posts for the last 24 hours</div>
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
      findChat: (chats, id) => {
        if (!Number(id))
          return [ chats.find(chat => chat.username == id) ]
        else
          return [ chats.find(chat => chat.id == Number(id)) ]
        return []
      },
      colorById
    },

    mounted() {
      console.log(this.$store.state.chats, this.$route)
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

  .chatname {
    font-family: 'Oswald', sans-serif;
    font-size: 1.5vw;
    font-weight: bold;
  }
</style>

