<template>
    <div class="device">
        <div class="device-title">
            <div>设备标题</div>
        </div>
        <div class="device-content">
            <div class="device-content-config">
                <div class="device-content-config-host"></div>
                <div class="device-content-config-device"></div>
            </div>
            <div class="device-content-monitor"></div>
        </div>
        <div class="device-footer"></div>
    </div>
</template>

<script>
    export default {
      name: 'device'
    }
</script>

<style lang="scss" scoped>
    @mixin borderSetOneSide($whichSide, $color: $grey-lighter, $style: solid, $width: 1px)
    {
        border-#{$whichSide}-color: $color;
        border-#{$whichSide}-style: $style;
        border-#{$whichSide}-width: $width;
    }
    .device {
        display: flex;
        flex-direction: column;
        height: 100%;
        & > .device-title {
            flex: none;
            height: 4rem;
            padding: 1.35rem 1.75rem 0.65rem 1.75rem;
            font-size: 1.25rem;
            font-weight: 500;
            @include borderSetOneSide(bottom);
            @include electron-drag;
        }
        & > .device-content {
            flex: auto;
            display: flex;
            & > .device-content-config {
                flex: auto;
                display: flex;
                flex-direction: column;
                @include borderSetOneSide(right);
                & > .device-content-config-host {
                    flex: auto;
                    @include borderSetOneSide(bottom);
                }
                & > .device-content-config-device {
                    flex: auto;
                }
            }
            & > .device-content-monitor {
                flex: auto;
                /*background-color: darkgray;*/
            }
        }
        & > .device-footer {
            flex: none;
            height: 3rem;
            @include borderSetOneSide(top);
        }
    }
</style>