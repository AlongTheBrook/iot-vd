<template>
    <div class="main-frame">
        <div class="main-frame-menu electron-frameless-drag">
            <div>abc</div>
            <div class="icon">
                <i class="fab fa-connectdevelop"></i>
            </div>
            <div>abc</div>
            <div class="main-frame-menu-item-end">
                <div>end</div>
            </div>
        </div>
        <div class="main-frame-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'main-frame'
    }
</script>

<style scoped>
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

    .main-frame-menu-item-end {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .main-frame-content {
        flex: 1;
        background-color: #e8e8e8;
    }

    .electron-frameless-drag {
        -webkit-app-region: drag;
    }
</style>