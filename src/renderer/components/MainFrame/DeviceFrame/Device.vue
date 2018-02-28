<template>
    <div class="device">
        <div class="device-title">
            <div class="device-title-text">设备标题</div>
            <div class="device-title-menu">...</div>
            <div class="device-title-menu-content"></div>
        </div>
        <div class="device-content">
            <div class="device-content-config">
                <div class="device-content-config-host">
                    <p class="device-content-config-title">服务器参数</p>
                    <div class="field is-horizontal">
                        <div class="field-label is-small">
                            <label class="label">服务器</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input class="input is-small is-no-radius" type="text" placeholder="IP地址或域名地址"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-small">
                            <label class="label">端口</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input class="input is-small is-no-radius" type="text" placeholder=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-small">
                            <label class="label">注册包</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input class="input is-small is-no-radius" type="text" placeholder=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-small">
                            <label class="label">心跳包</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input class="input is-small is-no-radius" type="text" placeholder=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-small">
                            <label class="label">心跳周期</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input class="input is-small is-no-radius" type="text" placeholder=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="device-content-config-device">
                    <p class="device-content-config-title">设备参数</p>
                    <div class="field is-horizontal">
                        <div class="field-label is-small">
                            <label class="label">串口号</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input class="input is-small is-no-radius" type="text" placeholder=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-small">
                            <label class="label">波特率</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input class="input is-small is-no-radius" type="text" placeholder=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-small">
                            <label class="label">数据位</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input class="input is-small is-no-radius" type="text" placeholder=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-small">
                            <label class="label">奇偶校验</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input class="input is-small is-no-radius" type="text" placeholder=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-small">
                            <label class="label">停止位</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input class="input is-small is-no-radius" type="text" placeholder=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="device-content-monitor">
                <div>device-content-monitor</div>
            </div>
        </div>
        <div class="device-footer">
            <div class="device-footer-msg">
                <p>最后信息：☇ 数据采集 10:27</p>
            </div>
            <div class="device-footer-control">
                <a class="button is-primary is-small is-no-radius">启动</a>
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
            padding: 1.35rem 0.75rem 0.65rem 1.75rem;
            font-size: 1.25rem;
            font-weight: 500;
            @include borderSetOneSide(bottom);
            @include electron-drag;
            display: flex;
            justify-content: space-between;
            & > .device-title-text {

            }
            & > .device-title-menu {
                @include electron-no-drag;
                cursor: pointer;
                letter-spacing: 0.1rem;
                font-weight: 600;
                &:hover {
                    color: $turquoise;
                }
            }
            & > .device-title-menu-content {
                position: absolute;
                right: 0;
                top: 4rem;
                width: 15rem;
                height: calc(100% - 4rem);
                background-color: white;
                @include borderSetOneSide(left);
                z-index: $z-index-top - 10;
            }
        }
        & > .device-content {
            flex: auto;
            display: flex;
            & > .device-content-config {
                flex: none;
                width: 22rem;
                display: flex;
                flex-direction: column;
                @include borderSetOneSide(right);
                $el-padding: 0 1.75rem 0 1.75rem;
                $overflow-y: hidden;
                .device-content-config-title {
                    padding: 0.75rem 0 0.75rem 0.25rem;
                    font-weight: 500;
                }
                & > .device-content-config-host {
                    flex: auto;
                    @include borderSetOneSide(bottom);
                    padding: $el-padding;
                    overflow-y: $overflow-y;
                }
                & > .device-content-config-device {
                    flex: auto;
                    padding: $el-padding;
                    overflow-y: $overflow-y;
                }
                .field-label {
                    flex: none;
                    width: 3.5rem;
                }
                .field-body {
                    flex: auto;
                }
                .label {
                    font-size: 0.85rem;
                    font-weight: 500;
                }
                .input {
                    font-size: 0.85rem;
                    height: 1.75rem;
                }
            }
            & > .device-content-monitor {
                flex: auto;
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
            }
        }
    }
</style>