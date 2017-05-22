<template>
  <div class="chat">
    <div v-for="chat in findChat($store.state.chats, $route.params.chatid)">
      <div class="chatTitle">
        {{ chat.title }}
      </div>
    </div>
  </div>
</template>

<script>
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
      }
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

