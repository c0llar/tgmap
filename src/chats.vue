<template>
  <div class="chats">
    <div class="chat" v-for="chat in chats">
      <div class="chatname"> [{{ chat.title }}] </div>
      <div class="username" v-if="chat.username"> @{{chat.username}} </div>
      <span v-for="tag in chat.tags">
        [{{ tag.name }}]
      </span>
    <div> {{ chat.participants.length }} members </div>
    <div> {{ chat.postsPerDay }} posts for the last 24 hours.</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        chats: []
      }
    },

    mounted() {
      fetch('/api/chats')
        .then(data => data.json())
        .then(chats => this.chats = chats)
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

  .chatname {
    font-family: 'Oswald', sans-serif;
    font-size: 1.5vw;
    font-weight: bold;
  }
</style>

