<template>
    <div class="device">
        <div class="device-title">
            <div class="device-title-text">设备标题</div>
            <div class="device-title-menu" @click="onDeviceMenuClick">...</div>
            <transition @afterEnter="afterDeviceMenuEnter" @afterLeave="afterDeviceMenuLeave">
                <div class="device-title-menu-content" v-show="isDeviceMenuShow" @blur="onDeviceMenuBlur" tabindex="-1">
                    <div class="device-info">
                        <div class="device-logo">
                            <figure class="image">
                                <img src="https://bulma.io/images/placeholders/48x48.png">
                            </figure>
                        </div>
                        <div class="device-content text-sle">
                            <div class="device-name">设备名称</div>
                            <div class="device-id">ID: 123456</div>
                        </div>
                    </div>
                    <hr>
                    <div>
                        <div>通讯数据展开</div>
                        <s-toggle-button v-model="isDeviceEventContentExpand"></s-toggle-button>
                    </div>
                    <hr>
                    <div class="device-title-menu-content-delete">删除此设备</div>
                </div>
            </transition>
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
            <div class="device-content-monitor" v-bar="{preventParentScroll: true}">
                <ul class="device-event-list" ref="deviceEventList">
                    <li class="device-event" v-for="item in deviceEventList" @click="onDeviceEventClick(item)">
                        <div class="device-event-title">{{ item.title }}</div>
                        <pre class="device-event-content" v-show="item.isContentExpand">{{ item.content }}</pre>
                    </li>
                </ul>
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
    import SToggleButton from '../../Common/SToggleButton'
    export default {
      name: 'device',
      components: { SToggleButton },
      data () {
        return {
          isDeviceEventContentExpand: true,
          isDeviceMenuShow: false,
          isDeviceMenuLeaving: false,
          deviceEventList: [
            {
              title: '2018-3-2 17:49:30.123 服务器 -> 设备',
              content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
              isContentExpand: false
            },
            {
              title: '2018-3-2 17:49:30.123 服务器 -> 设备',
              content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
              isContentExpand: false
            },
            {
              title: '2018-3-2 17:49:30.123 服务器 -> 设备  2018-3-2 17:49:30.123 服务器 -> 设备 2018-3-2 17:49:30.123 服务器 -> 设备',
              content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93 f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93 f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
              isContentExpand: false
            },
            {
              title: '2018-3-2 17:49:30.123 服务器 -> 设备',
              content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
              isContentExpand: false
            },
            {
              title: '2018-3-2 17:49:30.123 服务器 -> 设备',
              content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
              isContentExpand: false
            },
            {
              title: '2018-3-2 17:49:30.123 服务器 -> 设备',
              content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
              isContentExpand: false
            },
            {
              title: '2018-3-2 17:49:30.123 服务器 -> 设备',
              content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
              isContentExpand: false
            },
            {
              title: '2018-3-2 17:49:30.123 服务器 -> 设备',
              content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
              isContentExpand: false
            },
            {
              title: '2018-3-2 17:49:30.123 服务器 -> 设备',
              content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
              isContentExpand: false
            },
            {
              title: '2018-3-2 17:49:30.123 服务器 -> 设备',
              content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
              isContentExpand: false
            },
            {
              title: '2018-3-2 17:49:30.123 服务器 -> 设备',
              content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
              isContentExpand: false
            }
          ]
        }
      },
      methods: {
        addDeviceEvent (deviceEvent) {
          if (this.deviceEventList.length >= 128) {
            this.deviceEventList.shift()
          }
          this.deviceEventList.push(deviceEvent)
          this.$nextTick(() => {
            this.$refs.deviceEventList.lastChild.scrollIntoViewIfNeeded()
          })
        },
        traggerDeviceEventContentExpand (flag) {
          for (let deviceEvent of this.deviceEventList) {
            deviceEvent.isContentExpand = flag
          }
        },
        onDeviceEventClick (targetData) {
          targetData.isContentExpand = !targetData.isContentExpand
        },
        onDeviceMenuClick () {
          if (!this.isDeviceMenuLeaving) {
            this.isDeviceMenuShow = !this.isDeviceMenuShow
          }
        },
        onDeviceMenuBlur () {
          this.isDeviceMenuShow = false
          this.isDeviceMenuLeaving = true
        },
        afterDeviceMenuEnter (el) {
          el.focus()
        },
        afterDeviceMenuLeave (el) {
          this.isDeviceMenuLeaving = false
        }
      }
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
        width: 100%;
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
            $content-width: 16rem;
            & .device-title-menu-content {
                position: absolute;
                right: 0;
                top: 4rem;
                width: $content-width;
                height: calc(100% - 4rem);
                background-color: white;
                @include borderSetOneSide(left);
                z-index: $z-index-top - 10;
                padding: 1.5rem;
                font-size: 0.95rem;
                font-weight: lighter;
                color: $grey-light;
                &:focus {
                    outline: unset;
                }
                hr {
                    @include hr-mixin;
                    margin-top: 0.75rem;
                }
                & > * {
                    margin-top: 0.75rem;
                }
                & > :nth-child(1) {
                    margin-top: unset;
                }
                .device-info {
                    display: flex;
                    height: 2.5rem;
                    & > .device-logo {
                        flex: none;
                        width: 2.5rem;
                    }
                    & > .device-content {
                        flex: auto;
                        padding-left: 0.7rem;
                        line-height: 1.25rem;
                        color: $grey;
                        & > .device-name {
                            font-weight: 600;
                        }
                        & > .device-id {
                            font-weight: lighter;
                        }
                    }
                }
                .device-title-menu-content-delete {
                    text-align: center;
                    color: $red;
                    cursor: pointer;
                    margin: unset;
                    line-height: 3rem;
                }
            }
            .v-enter, .v-leave-to {
                transform: translateX($content-width);
            }
            .v-enter-active, .v-leave-active {
                transition: all .3s;
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
                width: calc(100% - 22rem);
                // padding: 0.75rem;  // 此行代码会造成原生滚动条显示
                /*overflow-y: scroll;*/
                & > .device-event-list {
                    padding: 0.75rem;
                    & > .device-event {
                        cursor: pointer;
                        font-size: 0.9rem;
                        padding: 0.35rem;
                        &:hover, &:hover pre {
                            background-color: #e8e8e8;
                        }
                        pre {
                            font-size: 0.85rem;
                            padding: 0.25rem 0.5rem;
                            white-space: pre-wrap;
                            word-break: break-all;
                        }
                    }
                }
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