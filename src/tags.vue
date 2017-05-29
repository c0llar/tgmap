<template>
  <div class="tags">
    <span v-for="tag in $store.state.tags">
      <div class="tag" v-if="tag.count">
        <router-link v-bind:style="{ color: colorById(tag._id) }"
                           :to="{ name: 'CHATS'}">
          <span v-on:click="$parent.searchBuffer = tag.name">
            [{{ tag.name }}]<sup>×{{ tag.count }}</sup>
          </span>
        </router-link>
      </div>
    </span>
  </div>
</template>

<script>
  import { colorById }  from './helpers'

  export default {
    data() {
      return {}
    },

    methods: {
      colorById
    },

    mounted() {
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

  .tag a {
    text-decoration: none;
  }
</style>

