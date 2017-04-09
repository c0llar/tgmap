<template>
  <div class="map">
    <canvas id="chatmap"></canvas>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },

    mounted() {
      let canvas = document.getElementById('chatmap');
      let ctx = canvas.getContext('2d');

      ctx.fillStyle = 'red';
      ctx.fillRect(10, 10, 10, 10);
    }
  }
</script>

<style>
  .map {
    background-color: #000;
    flex: 1 6 70%;
  }

  #chatmap {
    width: 100%;
    height: 100%;
  }
</style>

