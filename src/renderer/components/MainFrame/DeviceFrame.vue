<template>
    <div class="device-frame">
        <div class="device-frame-menu">
            device frame
            <a class="button is-primary">Button</a>
        </div>
        <div class="device-frame-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'device-frame'
    }
</script>

<style lang="scss" scoped>
    .device-frame {
        display: flex;
        height: 100vh;
    }

    .device-frame-menu {
        @include electron-no-drag;
        width: 250px;
        background-color: #e8e8e8;
    }

    .device-frame-content {
        flex: 1;
        background-color: #f5f5f5; /* #f5f5f5 */
    }
</style>