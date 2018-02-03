<template>
    <div class="electron-frame-controller">
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
        isMaximize: false
      }
    },
    mounted () {
      let win = this.$electron.remote.getCurrentWindow()
      this.isAlwaysOnTop = win.isAlwaysOnTop()
      win.on('maximize', () => {
        this.isMaximize = true
      })
      win.on('unmaximize', () => {
        this.isMaximize = false
      })
    },
    methods: {
      setAlwaysOnTop () {
        this.isAlwaysOnTop = !this.isAlwaysOnTop
        this.$electron.remote.getCurrentWindow().setAlwaysOnTop(this.isAlwaysOnTop)
      },
      minimize () {
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
        this.$electron.remote.getCurrentWindow().close()
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

    .button.is-normal {
        $_: transparent;
        $hover: hsl(0, 0%, 86%);
        $active: hsl(0, 0%, 71%);
        $_text: hsl(0, 0%, 48%);
        $hover_text: $_text;
        $active_text: $_text;

        background-color: $_;
        border-color: $_;
        color: $_text;
        &:hover, &.is-hovered {
            background-color: $hover;
            border-color: $hover;
            .icon {
                color: $hover_text;
            }
        }
        &:active, &.is-active {
            background-color: $active;
            border-color: $active;
            .icon {
                color: $active_text;
            }
        }
    }

    .button.is-close {
        $_: transparent;
        $hover: hsl(348, 100%, 61%);
        $active: hsl(348, 100%, 51%);
        $_text: hsl(0, 0%, 48%);
        $hover_text: white;
        $active_text: white;

        background-color: $_;
        border-color: $_;
        color: $_text;
        &:hover, &.is-hovered {
            background-color: $hover;
            border-color: $hover;
            .icon {
                color: $hover_text;
            }
        }
        &:active, &.is-active {
            background-color: $active;
            border-color: $active;
            .icon {
                color: $active_text;
            }
        }
    }
</style>
