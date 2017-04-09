<template>
  <div class="chat">
    <div class="chatname"> [{{ chat.title }}] </div>
    <div class="username" v-if="chat.username"> @{{chat.username}} </div>
    <div v-for="tag in chat.tags">
      <div class="tag" > {{ tag.name }} </div>
    </div>
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
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .chatname {
    font-weight: bold;
  }
</style>

