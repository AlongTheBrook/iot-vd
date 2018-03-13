<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  // fontawesome 5 必须的js
  require('./external/fontawesome-all')

  // 项目内打包的iconfont的symbol方式的js
  require('./external/iconfont')

  export default {
    name: 'iot-vd',
    mounted () {
      // 禁止任何拖拽行为：主要目的用于阻止外部URL或文件拖入窗口，引发未计划的行为
      let app = document.getElementById('app')
      app.ondragenter = (e) => {
        e.preventDefault()
      }
      app.ondragover = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'none'
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

  .iconfont {
    width: 1em;
    height: 1em;
    //vertical-align: -0.15em;  // 图标和文字相邻时，垂直对齐：flex布局下可以不用
    fill: currentColor;
    overflow: hidden;  // path 和 stroke 溢出 viewBox 部分在 IE 下会显示，故需要此行
  }

  html {
    overflow: hidden; /* hack: 解决bulma中 html{overflow-y: scroll}导致的html全局滚动条 */
  }

  // 更改应用尺寸的百分比数值n（取值0~100，默认值100）,表示长宽各位窗口长宽的n%，且居中
  // $app-size-rate: 90;

  #app {
    display: block;
    position: absolute;

    top: #{(100 - $app-size-rate) / 2}vh;
    left: #{(100 - $app-size-rate) / 2}vw;
    height: #{$app-size-rate}vh;
    width: #{$app-size-rate}vw;

    @include electron-no-drag; /* 全局禁用拖拽，单独设置局部部分区域单独配置 */
    overflow: hidden;

    /* 禁用文本选择，注释部分匹配其他浏览器 */
    -webkit-user-select: none;
    /*-webkit-touch-callout: none;*/
    /*-khtml-user-select: none;*/
    /*-moz-user-select: none;*/
    /*-ms-user-select: none;*/
    /*user-select: none;*/
  }

  body,
  button,
  input,
  select,
  textarea {
    font-family: BlinkMacSystemFont, -apple-system, "Microsoft Yahei", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  }

  // 为避免可能产生的重绘问题，应该尽可能只在需要的元素上应用该类
  .text-sle, .text-sle * {
    @include text-sle;
  }

  .is-no-radius {
    border-radius: unset!important;
  }

  // Change default value for variables here
  $vb-bc-light: $grey-light;
  $vb-bc-middle: $grey-light;
  $vb-bc-dark: hsl(0, 0%, 64%);
  $vb-dragger-display: none;
  $vb-dragger-width: 7px;
  $vb-styler-margin: 0;
  $vb-styler-height: 100%;
  // ↑

  $vb-bc-light: rgba(48, 121, 244, .1) !default;
  $vb-bc-middle: rgba(48, 121, 244, .3) !default;
  $vb-bc-dark: rgba(48, 121, 244, .5) !default;

  $vb-dragger-display: block !default;
  $vb-dragger-width: 12px !default;
  $vb-styler-margin: 5px 5px 5px 0 !default;
  $vb-styler-height: calc(100% - 10px) !default;

  $vb-styler-bc: $vb-bc-light !default;
  $vb-styler-bc-hover: $vb-bc-dark !default;
  $vb-styler-bc-scrolling-phantom: $vb-bc-middle !default;
  $vb-styler-bc-dragging: $vb-bc-dark !default;
  $vb-styler-bc-dragging-phantom: $vb-bc-dark !default;

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
