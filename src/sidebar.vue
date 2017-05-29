<template>
  <div class="sidebar">
    <div class="menu">
      <div class="title"> {{ $route.name }} </div>
      <div class="buttons">
        <router-link to="/about"> [about] </router-link>
        <router-link to="/tags"> [tags] </router-link>
        <router-link to="/chats"> [chats] </router-link>
      </div>
    </div>

    <div class="sidebarContainer">
      <router-view> </router-view>
      <div class="footer">
        <a href="https://github.com/c0llar/tgmap">
          <img src="img/github.svg" width="25vw" height="25vw" />
        </a>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchBuffer: ''
      }
    },

    mounted() {
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
    position: fixed;
    font-size: 7vw;
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    text-align: right;
    width: 100vw;
    right: 30%;
    margin: -2.5vw 3px 0 0;
  }

  .buttons {
    font-size: 1vw !important;
    margin-top: -1.5vw;
  }

  .buttons a {
    color: white;
    text-decoration: none;
    font-size: 1.2vw;
    margin-right: 3px;
  }

  .sidebarContainer {
    height: 100vh;
    overflow: scroll;
  }

  .footer {
    font-family: 'PT Mono', monospace;
    font-size: 1vw;
    text-align: center;
    margin-top: 1vw;
    margin-bottom: 1.5vw;
  }
</style>

