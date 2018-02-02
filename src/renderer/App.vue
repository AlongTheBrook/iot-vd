<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'iot-vd'
  }
</script>

<style lang="scss">
  @import "~bulma";

  html {
    @include electron-drag;
    overflow-y: hidden !important; /* hack: 解决bulma中 html{overflow-y: scroll}导致的滚动条 */
  }
</style>
