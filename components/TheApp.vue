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
  @font-face {
    font-family: 'Cutive Mono';
    font-style: normal;
    font-weight: 400;
    src: local(''),
      url('../media/fonts/cutive-mono-v9-latin-regular.woff2') format('woff2'),
      url('../media/fonts/cutive-mono-v9-latin-regular.woff') format('woff');
  }
  @font-face {
    font-family: 'Charm';
    font-style: normal;
    font-weight: 400;
    src: local(''),
      url('../media/fonts/charm-v5-latin-regular.woff2') format('woff2'),
      url('../media/fonts/charm-v5-latin-regular.woff') format('woff');
  }
  body {
    background-image: url('../media/images/ricepaper2.png');
    font-family: 'Charm', cursive;
  }
  .app {
    text-align: center;
  }

</style>
