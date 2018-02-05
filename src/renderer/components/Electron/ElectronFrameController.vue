<template>
    <div class="electron-frame-controller" :class="{'is-clicked': isClicked}" @mouseenter="mouseenter" >
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
</template>

<script>
  export default {
    name: 'electron-frame-controller',
    data () {
      return {
        isAlwaysOnTop: false,
        isMaximize: false,
        isClicked: false,
        isShow: false
      }
    },
    mounted: function () {
      let win = this.$electron.remote.getCurrentWindow()
      this.isAlwaysOnTop = win.isAlwaysOnTop()
      win.on('maximize', () => {
        this.isMaximize = true
      })
      win.on('unmaximize', () => {
        this.isMaximize = false
      })
      win.on('show', () => {
        this.isShow = true // hack: window-hide
      })
    },
    methods: {
      mouseenter () {
        if (this.isShow) { // hack: window-hide
          this.isShow = !this.isShow
        } else {
          this.isClicked = false
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
        // 调用下面的代码后，下次显示窗口时，会导致奇怪的发生mouseenter事件，故 hack: window-hide
        this.$electron.remote.getCurrentWindow().hide()
      }
    }
  }
</script>

<style lang="scss" scoped>
    .electron-frame-controller {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1024;
        display: flex;
        justify-content: flex-end;
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

        $active: hsl(0, 0%, 71%);
        $active_text: $_text;

        @include button-mixin($_, $_text, $hover, $hover_text, $active, $active_text);
    }

    .button.is-close {
        $_: transparent;
        $_text: hsl(0, 0%, 48%);

        $hover: hsl(348, 100%, 61%);
        $hover_text: white;

        // $active: hsl(348, 100%, 51%);
        // $active_text: white;

        @include button-mixin($_, $_text, $hover, $hover_text, $_, $_text);
    }
</style>
