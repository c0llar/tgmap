<template>
  <div class="sidebar">
    <div class="menu">
      <span class="buttons">
        <router-link to="/tags"> [tags] </router-link>
        <router-link to="/chats"> [chats] </router-link>
      </span>
      <span class="title"> {{ $route.name }} </span>
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

    margin: -3vw -7px 0 0;
  }

  .buttons a {
    color: white;
    text-decoration: none;
    font-size: 1vw;
    margin-right: 0.5vw;
    
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

