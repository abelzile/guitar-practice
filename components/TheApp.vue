<template>
<div id="app" class="app">
  <h1>-~ Guitar Practice ~-</h1>
  <TheNavigationComponent></TheNavigationComponent>
  <router-view></router-view>
</div>
</template>

<script>
  import TheNavigationComponent from './TheNavigationComponent';

  export default {
    components: {
      TheNavigationComponent
    }
  }
</script>

<style>
  body {
    background-image: url('../media/images/ricepaper2.png');
    font-family: 'Charm', cursive;
  }
  .app {
    text-align: center;
  }

</style>
