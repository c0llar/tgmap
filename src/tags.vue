<template>
  <div class="tags">
    <div class="tag" v-for="tag in tags">
      [{{ tag.name }}]
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tags: []
      }
    },

    mounted() {
      fetch('/api/tags')
        .then(data => data.json())
        .then(tags => this.tags = tags)
    }
  }
</script>

<style>
  .tag {
    font-size: 1.5vw;
    font-family: 'Oswald', sans-serif;
    font-weight: bold;

    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 13px;
    padding-right: 13px;
  }
</style>

