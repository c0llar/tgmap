<template>
  <div class="chats">
    <div class="searchInput">
      <input v-model="search"
             type="text" placeholder="search" spellcheck="false" />
    </div>
    <div class="chat" v-for="chat in filter($store.state.chats, search)">
      <div class="chatname">
        <router-link v-if="chat.username" :to="{ path: chat.username }">
          {{ chat.title }}
        </router-link>
        <router-link v-else :to="{ path: String(chat.id) }">
          {{ chat.title }}
        </router-link>
      </div>
      <div class="username" v-if="chat.username">
        <a v-bind:href="`https://t.me/${chat.username}`">@{{chat.username}}</a>
      </div>
      <div class="tags">
        <span v-for="tag in chat.tags"
              v-bind:style="{ color: colorById(tag._id), cursor: 'pointer' }" >
          <span v-on:click="search = tag.name"> [{{ tag.name }}] </span>
        </span>
      </div>
    <div> {{ chat.participants.length }} members </div>
    <div> {{ chat.postsPerDay }} posts for the last 24 hours</div>
    </div>
  </div>
</template>

<script>
  import { colorById }  from './helpers'

  export default {
    data() {
      return {
        search: this.$parent.searchBuffer || ''
      }
    },

    methods: {
      filter: (chats, str) => chats
        .filter(chat => chat.title.indexOf(str) >= 0 ||
                        chat.tags.some(tag => tag.name.indexOf(str) >= 0)),
      colorById
    },

    beforeRouteLeave(to, from, next) {
      this.$parent.searchBuffer = this.search
      next()
    },

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

  .tags {
    padding-bottom: 3px;
  }

  .username {
    padding-bottom: 3px;
  }

  input[type=text] {
    border: none;
    font-family: 'Oswald', sans-serif;
    font-size: 2vw;
    font-weight: bold;
  }

  input[type=text]:focus {
    outline: none;
  }

  .searchInput {
    padding-top: 3.2vw;
    padding-left: 13px;
    padding-right: 13px;
  }

  .chatname a {
    text-decoration: none;
  }

  .chatname {
    font-family: 'Oswald', sans-serif;
    font-size: 1.5vw;
    font-weight: bold;
  }
</style>

