<template>
    <div class="main-frame">
        <div class="main-frame-menu">
            <div class="main-frame-menu-item-start">
                <div class="fa-stack fa-lg">
                    <i class="fas fa-square fa-stack-2x"></i>
                    <i class="fas fa-paper-plane fa-stack-1x fa-inverse"></i>
                </div>
            </div>
            <div class="icon s-icon" router="device-frame" :class="{'s-active': router === 'device-frame'}" @click="onRouting">
                <i class="fab fa-lg fa-hubspot"></i>
            </div>
            <div class="icon s-icon" router="history-frame" :class="{'s-active': router === 'history-frame'}" @click="onRouting">
                <i class="fas fa-lg fa-history"></i>
            </div>
            <div class="main-frame-menu-item-end">
                <div class="icon s-icon" router="more-frame" :class="{'s-active': router === 'more-frame'}" @click="onRouting">
                    <i class="fas fa-lg fa-bars"></i>
                </div>
            </div>
        </div>
        <div class="main-frame-content">
            <router-view></router-view>
        </div>
        <electron-frame-controller></electron-frame-controller>
    </div>
</template>

<script>
    import ElectronFrameController from './Electron/ElectronFrameController'

    export default {
      name: 'main-frame',
      components: {
        ElectronFrameController
      },
      data () {
        return {
          router: null
        }
      },
      mounted () {
        this.router = 'device-frame'
      },
      watch: {
        router (value) {
          this.$router.push({name: value})
        }
      },
      methods: {
        onRouting (e) {
          this.router = e.currentTarget.attributes.router.value
        }
      }
    }
</script>

<style lang="scss" scoped>
    @import "../style/s-icon.scss";

    .main-frame {
        display: flex;
        height: 100%;
        width: 100%;
        & > .main-frame-menu {
            flex: none;
            width: 3.75rem;
            background-color: #24292e;
            display: flex;
            flex-direction: column;
            align-items: center;
            @include electron-drag;
            & > div {
                margin-bottom: 24px;
            }
            & > .main-frame-menu-item-start {
                display: flex;
                flex-direction: column;
                margin-top: 18px;
                & > div {
                    margin-bottom: 5px;
                }
                & > .fa-stack {
                     color: 	hsl(121, 51%, 28%);
                    & > .fa-inverse {
                        color: 	hsl(0, 0%, 71%);
                    }
                 }
            }
            & > .main-frame-menu-item-end {
                flex: auto;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                & > div {
                    margin-bottom: 20px;
                }
            }
        }
        & > .main-frame-content {
            flex: auto;
            width: calc(100% - 3.75rem);
        }
    }
</style>