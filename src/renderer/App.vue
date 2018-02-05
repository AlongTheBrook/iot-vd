<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  // fontawesome 5 必须的js
  require('./external/fontawesome-all')

  export default {
    name: 'iot-vd',
    mounted: function () {
      // 禁止任何拖拽行为：主要目的用于阻止外部URL或文件拖入窗口，引发未计划的行为
      let app = document.getElementById('app')
      app.ondragenter = (e) => {
        e.preventDefault()
      }
      app.ondragover = (e) => {
        e.preventDefault()
      }
      app.ondragleave = (e) => {
        e.preventDefault()
      }
      app.ondrop = (e) => {
        e.preventDefault()
      }
    }
  }
</script>

<style lang="scss">
  @import "~bulma";

  html {
    @include electron-drag;
    overflow-y: hidden !important; /* hack: 解决bulma中 html{overflow-y: scroll}导致的滚动条 */
  }
</style>
