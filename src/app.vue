<template>
  <div>
    <div v-for="chat in chats">
      {{ chat.title }}
    </div>
    <input v-model="msg">
  </div>
</template>

<script>
  export default {
    data: {
      msg: '',
      chats: []
    },

    mounted() {
      fetch('http://local.dev/chats')
        .then(data => data.json())
        .then(chats => this.chats = chats)
    }
  }
</script>
