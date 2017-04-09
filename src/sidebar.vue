<template>
  <div class="sidebar">
    <div class="menu">
      <span class="buttons"> [search] [tags] </span>
      <span class="title"> {{ msg }} </span>
    </div>

    <div class="sidebarContainer">
      <chat v-for="chat in chats" v-bind:chat="chat" :key="chat.id"></chat>
    </div>

  </div>
</template>

<script>
  import chat from './chat.vue'

  export default {
    data() {
      return {
        msg: 'CHATS',
        chats: []
      }
    },

    components: {
      chat
    },

    mounted() {
      fetch('/chats')
        .then(data => data.json())
        .then(chats => this.chats = chats)
        .then(_ => console.log(this.chats))
    }
  }
</script>

<style>
  .sidebar {
    background-color: #fff;
    color: black;
    flex: 1 6 30%;
  }

  .menu {
    color: white;
    width: 100vw;
    position: fixed;
    right: 30%;
    text-align: right;
    font-size: 5vw;
    font-weight: bold;
    margin: -1vw 0 0 0;
  }

  .buttons {
    font-size: 1vw;
    margin-right: 0.5vw;
  }
</style>

