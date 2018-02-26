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

    /* 禁用文本选择，适配所有浏览器 */
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .text-sle, .text-sle p {
    @include text-sle;
  }

  $vb-bc-light: rgba(48, 121, 244, .1) !default;
  $vb-bc-middle: rgba(48, 121, 244, .3) !default;
  $vb-bc-dark: rgba(48, 121, 244, .5) !default;

  // Change default value for background color level here
  $vb-bc-light: $grey-light;
  $vb-bc-middle: $grey-light;
  $vb-bc-dark: hsl(0, 0%, 64%);
  // ↑

  $vb-dragger-display: block !default;
  $vb-dragger-width: 12px !default;
  $vb-styler-margin: 5px 5px 5px 0 !default;
  $vb-styler-height: calc(100% - 10px) !default;

  $vb-styler-bc: $vb-bc-light !default;
  $vb-styler-bc-hover: $vb-bc-dark !default;
  $vb-styler-bc-scrolling-phantom: $vb-bc-middle !default;
  $vb-styler-bc-dragging: $vb-bc-dark !default;
  $vb-styler-bc-dragging-phantom: $vb-bc-dark !default;

  // Change default value for variable here
  $vb-dragger-display: none;
  $vb-dragger-width: 7px;
  $vb-styler-margin: 0;
  $vb-styler-height: 100%;
  // ↑

  .vb {
    & > .vb-dragger {
      display: $vb-dragger-display;
      z-index: 5;
      width: $vb-dragger-width;
      right: 0;
      & > .vb-dragger-styler {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform: rotate3d(0,0,0,0);
        transform: rotate3d(0,0,0,0);
        -webkit-transition:
                background-color 100ms ease-out,
                margin 100ms ease-out,
                height 100ms ease-out;
        transition:
                background-color 100ms ease-out,
                margin 100ms ease-out,
                height 100ms ease-out;
        background-color: $vb-styler-bc;
        margin: $vb-styler-margin;
        border-radius: 20px;
        height: $vb-styler-height;
        display: block;
      }
      &:hover > .vb-dragger-styler {
        background-color: $vb-styler-bc-hover;
        margin: 0px;
        height: 100%;
      }
    }
    &:hover > .vb-dragger{
      display: block;
    }
    &:active > .vb-dragger{
      display: block;
    }
    &.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
      background-color: $vb-styler-bc-scrolling-phantom;
    }
    &.vb-dragging > .vb-dragger > .vb-dragger-styler {
      background-color: $vb-styler-bc-dragging;
      margin: 0px;
      height: 100%;
    }
    &.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
      background-color: $vb-styler-bc-dragging-phantom;
    }
  }
</style>
