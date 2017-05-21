<template>
  <div class="app">
    <chatmap />
    <sidebar />
  </div>
</template>

<script>
  import sidebar from './sidebar.vue'
  import chatmap from './chatmap.vue'

  export default {
    components: {
      chatmap,
      sidebar
    },

    mounted() {
      this.$store.dispatch('updateChats')
      this.$store.dispatch('updateTags')
    }
  }
</script>

<style>
  .app {
    display: flex;
    flex-flow: row;
    height: 100vh;
    overflow: hidden;
  }

  body {
    margin: 0 0 0 0;
  }
</style>

