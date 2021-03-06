<template>
    <div>
        <div class="electron-frame-controller" :class="{'is-clicked': isClicked}" @mouseenter="mouseenter">
            <a class="button is-small is-normal" :class="{'is-active': isAlwaysOnTop}" @click="setAlwaysOnTop">
                &nbsp;
                <span class="icon">
                <i class="fas fa-thumbtack"></i>
            </span>
                &nbsp;
            </a>
            <a class="button is-small is-normal" @click="minimize">
                &nbsp;
                <span class="icon">
                <i class="fas fa-minus"></i>
            </span>
                &nbsp;
            </a>
            <!-- 通过v-if和v-else解决内部v-show方式导致的背景区域异常 -->
            <a class="button is-small is-normal" @click="maximize"  v-if="isMaximize">
                &nbsp;
                <span class="icon">
                <i class="far fa-window-restore"></i>
            </span>
                &nbsp;
            </a>
            <a class="button is-small is-normal" @click="maximize"  v-else>
                &nbsp;
                <span class="icon">
                <i class="far fa-window-maximize"></i>
            </span>
                &nbsp;
            </a>
            <a class="button is-small is-close" @click="close">
                &nbsp;
                <span class="icon">
                <i class="fas fa-times"></i>
            </span>
                &nbsp;
            </a>
        </div>
        <div class="electron-frame-resize-region-top"></div>
        <div class="electron-frame-resize-region-bottom"></div>
        <div class="electron-frame-resize-region-left"></div>
        <div class="electron-frame-resize-region-right"></div>
    </div>
</template>

<script>
  export default {
    name: 'electron-frame-controller',
    data () {
      return {
        isAlwaysOnTop: false,
        isMaximize: false,
        isClicked: false,
        isShowing: false,
        quit: false
      }
    },
    mounted () {
      const win = this.$electron.remote.getCurrentWindow()
      this.isAlwaysOnTop = win.isAlwaysOnTop()
      win.on('maximize', () => {
        this.isMaximize = true
      })
      win.on('unmaximize', () => {
        this.isMaximize = false
      })
      win.on('show', () => {
        this.isShowing = true
      })
      if (process.env.NODE_ENV === 'development') { // 这是一个开发时特性
        document.onkeydown = (e) => {
          if (e.altKey && e.keyCode === 82) { // ALT + R 键按下
            this.quit = true
            win.reload()
          }
        }
      }
      this.$electron.ipcRenderer.on('@quit', () => {
        this.quit = true
        win.close()
      })
      window.onbeforeunload = (e) => {
        if (!this.quit) {
          e.preventDefault()
          e.returnValue = false
          win.hide()
        }
      }
    },
    methods: {
      mouseenter () {
        if (this.isShowing) {
          this.isShowing = false
        } else {
          if (this.isClicked) {
            this.isClicked = false
          }
        }
      },
      setAlwaysOnTop () {
        this.isAlwaysOnTop = !this.isAlwaysOnTop
        this.$electron.remote.getCurrentWindow().setAlwaysOnTop(this.isAlwaysOnTop)
      },
      minimize () {
        this.isClicked = true
        this.$electron.remote.getCurrentWindow().minimize()
      },
      maximize () {
        let win = this.$electron.remote.getCurrentWindow()
        if (this.isMaximize) {
          win.unmaximize()
        } else {
          win.maximize()
        }
      },
      close () {
        this.isClicked = true
        setTimeout(() => { // 解决窗口重新显示时，关闭按钮背景的问题
          this.$electron.remote.getCurrentWindow().hide()
        }, 5)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .electron-frame-controller {
        position: absolute;
        top: 0;
        right: 0;
        z-index: $z-index-top - 1;
        display: flex;
        justify-content: flex-end;
    }

    @mixin electron-frame-resize-region($side) {
        position: absolute;
        z-index: $z-index-top;
        background-color: transparent;
        @if($side == top) {
            left: 0;
            top: 0;
            height: 3px;
            width: 100%;
        }
        @else if($side == bottom) {
            left: 0;
            bottom: 0;
            height: 3px;
            width: 100%;
        }
        @else if($side == left) {
            left: 0;
            top: 0;
            height: 100%;
            width: 3px;
        }
        @else if($side == right) {
            right: 0;
            top: 0;
            height: 100%;
            width: 3px;
        }
        @include electron-no-drag;
    }

    .electron-frame-resize-region-top {
        @include electron-frame-resize-region(top);
    }

    .electron-frame-resize-region-bottom {
        @include electron-frame-resize-region(bottom);
    }

    .electron-frame-resize-region-left {
        @include electron-frame-resize-region(left);
    }

    .electron-frame-resize-region-right {
        @include electron-frame-resize-region(right);
    }

    .button {
        border-radius: 0;
    }

    @mixin button-mixin($_, $_text, $hover, $hover_text, $active, $active_text) {
        &, .is-clicked &:hover {
            background-color: $_;
            border-color: $_;
            & .icon {
                color: $_text;
            }
        }

        &:hover, &.is-hovered {
            background-color: $hover;
            border-color: $hover;
            & .icon {
                color: $hover_text;
            }
        }

        &:active, &.is-active {
            background-color: $active;
            border-color: $active;
            & .icon {
                color: $active_text;
            }
        }
    }

    .button.is-normal {
        $_: transparent;
        $_text: hsl(0, 0%, 48%);

        $hover: hsl(0, 0%, 86%);
        $hover_text: $_text;

        $active: hsl(0, 0%, 76%);
        $active_text: $_text;

        @include button-mixin($_, $_text, $hover, $hover_text, $active, $active_text);
    }

    .button.is-close {
        $_: transparent;
        $_text: hsl(0, 0%, 48%);

        $hover: hsl(348, 100%, 61%);
        $hover_text: white;

        // 此处采用默认情况下的颜色是为了解决窗口显示时关闭按钮背景色的跳变
        $active: hsl(348, 96%, 45%);
        $active_text: white;

        @include button-mixin($_, $_text, $hover, $hover_text, $active, $active_text);
    }
</style>
