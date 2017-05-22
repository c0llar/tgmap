<template>
  <div class="tags">
    <span v-for="tag in $store.state.tags">
      <div class="tag" v-if="tag.count">
        [{{ tag.name }}]<sup>×{{ tag.count }}</sup>
      </div>
    </span>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },

    mounted() {
      this.$store.dispatch('updateTags')
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

