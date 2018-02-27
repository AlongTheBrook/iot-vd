<template>
    <div class="device">
        <div class="device-title">
            设备标题
        </div>
        <div class="device-content">
            <div class="device-content-config">
                <div class="device-content-config-host"></div>
                <div class="device-content-config-device"></div>
            </div>
            <div class="device-content-monitor"></div>
        </div>
        <div class="device-footer">
            <div class="device-footer-msg">
                <p>最后信息：☇ 数据采集 10:27</p>
            </div>
            <div class="device-footer-control">
                <a class="button is-primary is-small">启动</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'device'
    }
</script>

<style lang="scss" scoped>
    @mixin borderSetOneSide($whichSide, $color: $grey-lighter, $style: solid, $width: 1px) {
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
            display: flex;
            align-items: center;
            & > .device-footer-msg {
                flex: 8 8 auto;
                padding-left: 1.75rem;
            }
            & > .device-footer-control {
                flex: 2 2 auto;
                width: 4rem;
                display: flex;
                justify-content: flex-end;
                padding-right: 1.75rem;
                & .button {
                    border-radius: 0;
                }
            }
        }
    }
</style>