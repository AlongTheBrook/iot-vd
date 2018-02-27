<template>
    <div class="main-frame">
        <div class="main-frame-menu">
            <div class="main-frame-menu-item-start">
                <div class="fa-stack fa-lg">
                    <i class="fas fa-square fa-stack-2x"></i>
                    <i class="fas fa-paper-plane fa-stack-1x fa-inverse"></i>
                </div>
            </div>
            <div class="icon s-icon">
                <i class="fab fa-lg fa-hubspot"></i>
            </div>
            <div class="icon s-icon">
                <i class="fas fa-lg fa-history"></i>
            </div>
            <div class="main-frame-menu-item-end">
                <div class="icon s-icon">
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
    import ElectronFrameController from './electron/ElectronFrameController'

    export default {
      name: 'main-frame',
      components: {
        ElectronFrameController
      }
    }
</script>

<style lang="scss" scoped>
    @import "../style/s-icon.scss";

    .main-frame {
        display: flex;
        height: 100vh;
    }

    .main-frame-menu {
        width: 3.75rem;
        flex: none;
        background-color: #24292e;
        display: flex;
        flex-direction: column;
        align-items: center;
        @include electron-drag;
    }

    .main-frame-menu > div {
        margin-bottom: 24px;
    }

    .main-frame-menu-item-start {
        display: flex;
        flex-direction: column;
        margin-top: 18px;
    }

    .main-frame-menu-item-start > div {
        margin-bottom: 5px;
    }

    .main-frame-menu-item-start > .fa-stack {
        color: 	hsl(121, 51%, 28%);
    }

    .main-frame-menu-item-start > .fa-stack > .fa-inverse {
        color: 	hsl(0, 0%, 71%);
    }

    .main-frame-menu-item-end {
        flex: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .main-frame-menu-item-end > div {
        margin-bottom: 20px;
    }

    .main-frame-content {
        flex: auto;
    }
</style>