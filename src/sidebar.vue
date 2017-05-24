<template>
  <div class="sidebar">
    <div class="menu">
      <div class="title"> {{ $route.name }} </div>
      <div class="buttons">
        <router-link to="/tags"> [tags] </router-link>
        <router-link to="/chats"> [chats] </router-link>
      </div>
    </div>

    <div class="sidebarContainer">
      <router-view> </router-view>
      <div class="footer"> github link </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {}
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

    width: 100vw;
    right: 30%;

    text-align: right;

    font-size: 7vw;
    font-family: 'Oswald', sans-serif;
    font-weight: bold;

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
    margin-top: 1vw;
    margin-bottom: 1.5vw;
    text-align: center;
    font-size: 1vw;
    font-family: 'PT Mono', monospace;
  }
</style>

