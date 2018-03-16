<template>
    <div class="device">
        <div class="device-title">
            <div class="device-title-text" @click="onDeviceMenuClick">{{ device.name }}</div>
            <div class="device-title-menu" @click="onDeviceMenuClick">...</div>
            <transition @afterEnter="afterDeviceMenuEnter" @afterLeave="afterDeviceMenuLeave">
                <div class="device-title-menu-content" v-show="isDeviceMenuShow" @blur="onDeviceMenuBlur" tabindex="-1">
                    <div class="device-info">
                        <div class="device-logo">
                            <svg class="iconfont device-logo-icon" aria-hidden="true"
                                 :style="{backgroundColor: iconBgColor(device.state)}">
                                <use :xlink:href="iconHref(device.type)"></use>
                            </svg>
                        </div>
                        <div class="device-content text-sle">
                            <div class="device-name">{{ device.name }}</div>
                            <div class="device-id">ID: {{ device.deviceId }}</div>
                        </div>
                    </div>
                    <hr>
                    <div>
                        <div>展开通讯数据</div>
                        <s-toggle-button v-model="isEventExpand"></s-toggle-button>
                    </div>
                    <hr>
                    <div class="device-title-menu-content-op-button" @click="emptyEventList(device.id)">清空通讯数据</div>
                    <hr>
                    <div class="device-title-menu-content-op-button" @click="onOpenMonitorPage">打开监控页</div>
                    <hr>
                    <div class="device-title-menu-content-delete" @click="onDelete">删除此设备</div>
                </div>
            </transition>
        </div>
        <div class="device-content">
            <div class="device-content-config">
                <p class="device-content-config-title">基本参数</p>
                <div class="field is-horizontal">
                    <div class="field-label is-small">
                        <label class="label">名称</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <input class="input is-small is-no-radius" type="text" placeholder=""/>
                            </div>
                        </div>
                    </div>
                </div>
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
            <div class="device-content-monitor" v-bar="{preventParentScroll: true}">
                <ul class="device-event-list" ref="eventList">
                    <li class="device-event" v-for="(item, index) in eventList" @click="onEventClick(index)">
                        <div class="device-event-title">{{ item.title }}</div>
                        <pre class="device-event-content" v-show="item.isExpand">{{ item.content }}</pre>
                    </li>
                </ul>
            </div>
        </div>
        <div class="device-footer">
            <div class="device-footer-msg">
                <p>{{ device.msg }}</p>
            </div>
            <div class="device-footer-control">
                <div class="device-footer-control-stop-button" v-tooltip="'停止'"  v-show="!((device.state === state.STOPPING) || (device.state === state.STOPED))">
                    <svg class="iconfont " aria-hidden="true">
                        <use xlink:href="#icon-stop"></use>
                    </svg>
                </div>
                <op-and-state-icon :device="device"></op-and-state-icon>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'
    import SToggleButton from '../../Common/SToggleButton'
    import OpAndStateIcon from '../../Common/OpAndStateIcon'

    export default {
      name: 'device',
      components: { SToggleButton, OpAndStateIcon },
      data () {
        return {
          isDeviceMenuShow: false,
          isDeviceMenuLeaving: false
        }
      },
      computed: {
        ...mapGetters('device', {
          device: 'selected'
        }),
        ...mapGetters('device', [
          'state',
          'iconHref',
          'iconBgColor'
        ]),
        eventList () {
          return this.device.eventList
        },
        msg () {
          return this.device.msg
        },
        isEventExpand: {
          get () {
            return this.device.isEventExpand
          },
          set (isEventExpand) {
            this.setEventExpand({id: this.device.id, isEventExpand: isEventExpand})
          }
        }
      },
      watch: {
        // 观察msg会导致设备间切换后，滚动每次都会滚动到最底部，由于为每台设备记录滚动条的状态比较费时，暂且搁置
        msg () {
          this.$nextTick(() => {
            const lastEventElement = this.$refs.eventList.lastChild
            if (lastEventElement) {
              lastEventElement.scrollIntoViewIfNeeded()
            }
          })
        }
      },
      methods: {
        ...mapMutations('device', [
          'setEventExpand',
          'setSingleEventExpand',
          'delete',
          'emptyEventList'
        ]),
        onEventClick (index) {
          this.setSingleEventExpand({id: this.device.id, index: index})
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
        },
        onOpenMonitorPage () {
          this.$electron.shell.openExternal('http://iot.thisyet.com/monitor/' + this.device.deviceId)
        },
        onDelete () {
          this.delete(this.device.id)
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
                @include electron-no-drag;
                cursor: pointer;
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
                        font-size: 2.5rem;
                        line-height: 1;
                        & > .device-logo-icon {
                            border-radius: 0.2rem;
                            color: hsl(0, 0%, 91%);
                        }
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
                .device-title-menu-content-op-button {
                    cursor: pointer;
                    color: hsl(0, 0%, 56%);
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
                @include borderSetOneSide(right);
                padding: 0.6rem 1.75rem 0 1.75rem;
                overflow-y: hidden;
                .device-content-config-title {
                    padding: 0.6rem 0 0.6rem 0.25rem;
                    font-weight: 500;
                }
                .field:not(:last-child) {
                    margin-bottom: 0.6rem;
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
                width: 6rem;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding-right: 1.75rem;
                font-size: 1.5rem;
                line-height: 1;
                & > .device-footer-control-stop-button {
                    flex: none;
                    width: 2.3rem;
                    color: $red;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    font-size: 1.625rem;
                }
            }
        }
    }
</style>