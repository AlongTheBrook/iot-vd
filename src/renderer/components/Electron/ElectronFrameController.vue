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
        <a class="button is-small is-normal" @click="maximize">
            &nbsp;
            <span class="icon" v-show="!isMaximize">
                <i class="far fa-window-maximize"></i>
            </span>
            <span class="icon" v-show="isMaximize">
                <i class="far fa-window-restore"></i>
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
      this.$electron.ipcRenderer.on('maximize', (e, flag) => {
        this.isMaximize = flag
      })
      this.$electron.ipcRenderer.on('isAlwaysOnTop', (e, flag) => {
        this.isAlwaysOnTop = flag
      })
      this.$electron.ipcRenderer.send('electron-frame-controller', 'mounted')
    },
    methods: {
      setAlwaysOnTop () {
        this.isAlwaysOnTop = !this.isAlwaysOnTop
        this.$electron.ipcRenderer.send('setAlwaysOnTop', this.isAlwaysOnTop)
      },
      minimize () {
        this.$electron.ipcRenderer.send('minimize')
      },
      maximize () {
        this.$electron.ipcRenderer.send('maximize', !this.isMaximize)
      },
      close () {
        this.$electron.ipcRenderer.send('close')
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
