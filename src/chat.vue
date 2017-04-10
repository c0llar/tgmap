<template>
  <div class="chat">
    <div class="chatname"> [{{ chat.title }}] </div>
    <div class="username" v-if="chat.username"> @{{chat.username}} </div>
    <span class="tag" v-for="tag in chat.tags">
       {{ tag.name }}
    </span>
  <div> {{ chat.participants.length }} members </div>
  <div> {{ chat.postsPerDay }} posts for the last 24 hours.</div>
  </div>
</template>

<script>
  export default {
    props: ['chat'],

    mounted() {
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

