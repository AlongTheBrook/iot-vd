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
        <div class="main-frame-system-menu">
            <a class="button is-small is-light">
                &nbsp;
                <span class="icon">
                    <i class="fas fa-thumbtack"></i>
                </span>
                &nbsp;
            </a>
            <a class="button is-small is-light">
                &nbsp;
                <span class="icon">
                    <i class="fas fa-minus"></i>
                </span>
                &nbsp;
            </a>
            <a class="button is-small is-light">
                &nbsp;
                <span class="icon">
                    <i class="far fa-window-maximize"></i>
                    <!--<i class="far fa-square"></i>-->
                </span>
                &nbsp;
            </a>
            <a class="button is-small is-close">
                &nbsp;
                <span class="icon">
                    <i class="fas fa-times"></i>
                </span>
                &nbsp;
            </a>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'main-frame'
    }
</script>

<style lang="scss" scoped>
    @import "../style/s-icon.scss";

    .main-frame {
        display: flex;
        height: 100vh;
    }

    .main-frame-menu {
        width: 60px;
        background-color: #24292e;
        display: flex;
        flex-direction: column;
        align-items: center;
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
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .main-frame-menu-item-end > div {
        margin-bottom: 20px;
    }

    .main-frame-content {
        flex: 1;
    }

    .main-frame-system-menu {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1024;
        display: flex;
        justify-content: flex-end;
    }

    .main-frame-system-menu .icon {
        color: hsl(0, 0%, 48%);
    }

    .button {
        border-radius: 0;
    }

    $bc-normal: transparent;
    $bc-hover:  hsl(348, 100%, 61%);
    $bc-active: hsl(348, 100%, 51%);

    .button.is-close {
        background-color: $bc-normal;
        border-color: $bc-normal;
    }

    .button.is-close:hover {
        background-color: $bc-hover;
        border-color: $bc-hover;
    }

    .button.is-close:active {
        background-color: $bc-active;
        border-color: $bc-active;
    }

</style>