<template>
  <div class="eblo">
    <div class="title"> SIDEBAR </div>
    <div v-for="chat in chats">
      {{ chat.title }}
    </div>
    <input v-model="msg">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: '',
        chats: []
      }
    },

    mounted() {
      fetch('http://local.dev/chats')
        .then(data => data.json())
        .then(chats => this.chats = chats)
    }
  }
</script>

<style>
  .eblo {
    background-color: #777;
    flex: 1 6 30%;
  }

  .title {
    width: 100vw;
    position: fixed;
    right: 30%;
    text-align: right;
    font-size: 5vw;
    font-weight: bold;
    margin: -5px 0 0 0;
  }
</style>

