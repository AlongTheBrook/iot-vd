<template>
    <div class="device-frame">
        <div class="device-frame-menu">
            <div class="device-list-control">
                <div class="device-list-control-search field">
                    <p class="control has-icons-right">
                        <input class="input is-small is-no-radius" type="text" placeholder="搜索"/>
                        <span class="icon is-small is-right">
                            <i class="fas fa-search"></i>
                        </span>
                    </p>
                </div>
                <div class="device-list-control-button field" v-tooltip="'全部停止'">
                    <p class="control">
                        <a class="button is-small is-danger is-no-radius">
                            <span class="icon">
                                <i class="fas fa-stop"></i>
                            </span>
                        </a>
                    </p>
                </div>
                <div class="device-list-control-button field" v-tooltip="'全部启动'">
                    <p class="control">
                        <a class="button is-small is-success is-no-radius">
                            <span class="icon">
                                <i class="fas fa-play"></i>
                            </span>
                        </a>
                    </p>
                </div>
                <div class="device-list-control-button field" v-tooltip="'创建设备'" @click="onCreateDevice">
                    <p class="control">
                        <a class="button is-small is-primary is-no-radius">
                            <span class="icon">
                                <i class="fas fa-plus"></i>
                            </span>
                        </a>
                    </p>
                </div>
            </div>
            <div class="device-list-container" v-bar="{preventParentScroll: true}">
                <ul class="device-list"  ref="deviceList">
                    <draggable v-model="list">
                        <li class="device-list-item" v-for="(item, index) in list" :key="item.id" @click="onClick(item.id)"
                            :class="{'is-active': item.selected}"
                            @contextmenu.prevent="$refs.deviceItemCtxMenu.open($event, item)">
                            <div class="device-list-item-start">
                                <svg class="iconfont device-list-item-start-icon" aria-hidden="true"
                                     :style="{backgroundColor: iconBgColor(item.state)}">
                                    <use :xlink:href="iconHref(item.type)"></use>
                                </svg>
                            </div>
                            <div class="device-list-item-content">
                                <p class="device-list-item-content-title">{{ item.name }}</p>
                                <p class="device-list-item-content-subtitle">{{ item.msg }}</p>
                            </div>
                            <div class="device-list-item-end-pre" v-tooltip="'停止'" v-show="!((item.state === state.STOPPING) || (item.state === state.STOPED))">
                                <svg class="iconfont" aria-hidden="true">
                                    <use xlink:href="#icon-stop"></use>
                                </svg>
                            </div>
                            <div class="device-list-item-end">
                                <op-and-state-icon :device="item"></op-and-state-icon>
                            </div>
                        </li>
                    </draggable>
                    <context-menu ref="deviceItemCtxMenu" id="context-menu" @ctx-open="onDeviceItemCtxMenuOpen">
                        <li @click="onClearEventList">清空通信数据</li>
                        <li @click="onOpenMonitorPage">打开监控页</li>
                        <hr>
                        <li @click="onDelete" class="delete-device">删除设备</li>
                        <hr>
                        <li class="disabled">可以通过拖拽排序</li>
                    </context-menu>
                </ul>
            </div>
        </div>
        <div class="device-frame-content">
            <device v-if="hasSelected"></device>
            <placeholder v-else icon="fa-paper-plane" bgColor="#f5f5f5" color="hsl(0, 0%, 86%)"></placeholder>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import OpAndStateIcon from '../Common/OpAndStateIcon'
    import Device from './DeviceFrame/Device'
    import Placeholder from '../Common/Placeholder'
    import Draggable from 'vuedraggable'
    import ContextMenu from 'vue-context-menu'

    export default {
      name: 'device-frame',
      components: { OpAndStateIcon, Device, Placeholder, Draggable, ContextMenu },
      data () {
        return {
          ctxMenuTargetDevice: null
        }
      },
      computed: {
        list: {
          get () {
            return this.$store.state.device.list
          },
          set (newList) {
            this.replace(newList)
          }
        },
        ...mapGetters('device', [
          'state',
          'selected',
          'iconHref',
          'iconBgColor'
        ]),
        hasSelected () {
          if (this.selected) {
            return true
          }
          return false
        }
      },
      methods: {
        ...mapMutations('device', [
          'replace',
          'setSelected',
          'delete',
          'clearEventList'
        ]),
        ...mapActions('device', [
          'createDevice'
        ]),
        onCreateDevice () {
          const id = Math.floor(Math.random() * 1000)
          this.createDevice({
            id: id,
            name: '设备' + id,
            deviceId: id,
            type: Math.random() > 0.5 ? 'SERIAL_PORT' : 'TCP',
            serialPortName: 'COM2',
            baudRate: 9600,
            databits: 8,
            parity: 'NONE',
            stopbits: 1,
            host: '127.0.0.1',
            port: 50021,
            regPackage: '{NDMyMTBAOTg3NjU=}',
            hbPackage: 'H',
            hbMinutes: 5,
            selected: false,
            state: 'STOPED',
            hbCountdownSeconds: 56,
            msg: '',
            isEventExpand: false,
            eventList: []
          })
          this.$nextTick(() => {
            const firstDeviceElement = this.$refs.deviceList.firstChild.firstChild
            if (firstDeviceElement) {
              firstDeviceElement.scrollIntoViewIfNeeded()
            }
          })
        },
        onClick (id) {
          this.setSelected(id)
        },
        onClearEventList () {
          this.clearEventList(this.ctxMenuTargetDevice.id)
        },
        onOpenMonitorPage () {
          this.$electron.shell.openExternal('http://iot.thisyet.com/monitor/' + this.ctxMenuTargetDevice.deviceId)
        },
        onDelete () {
          this.delete(this.ctxMenuTargetDevice.id)
        },
        onDeviceItemCtxMenuOpen (device) {
          this.ctxMenuTargetDevice = device
        }
      }
    }
</script>

<style lang="scss" scoped>
    @mixin mouse-bg-mixin($normal, $hover, $active) {
        &, .is-clicked &:hover {
            background-color: $normal;
        }

        &:hover, &.is-hovered {
            background-color: $hover;
        }

        /*&:active, */&.is-active {
                          background-color: $active;
                      }
    }

    .device-list-baseclass {
        display: flex;
        height: 4rem;
        padding: 0.75rem;
    }

    .device-frame {
        display: flex;
        height: 100%;
        width: 100%;
        & > .device-frame-menu {
            @include electron-no-drag;
            width: 15.625rem;
            background-color: #e8e8e8;
            display: flex;
            flex-direction: column;
            & > .device-list-control {
                flex: none;
                $border-color: $grey-light;
                $background-color: $grey-lighter;
                @extend .device-list-baseclass;
                justify-content: space-between;
                align-items: flex-end;
                & > * {
                    margin-bottom: 0 !important;
                }
                & > .device-list-control-search {
                    flex: auto;
                    & .input {
                        border-color: $border-color;
                        box-shadow: none;
                        background-color: $background-color;
                        &:focus {
                            background-color:  $white-ter;
                        }
                    }
                    & .icon {
                        color: #7a7a7a;
                    }
                }
                & > .device-list-control-button {
                    flex: none;
                    margin-left: 0.5rem;
                    .icon {
                        color: $white-ter;
                    }
                }
            }
            & > .device-list-container {
                flex: auto;
                display: flex;
                flex-direction: column;
                & > .device-list {
                    flex: auto;
                    .device-list-item {
                        @include mouse-bg-mixin(transparent, $grey-lighter, hsl(0, 0%, 76%));
                        @extend .device-list-baseclass;
                        cursor: default;
                        & > .device-list-item-start {
                            flex: none;
                            width: 2.5rem;
                            font-size: 2.5rem;
                            line-height: 1;
                            & > .device-list-item-start-icon {
                                border-radius: 0.2rem;
                                color: hsl(0, 0%, 91%);
                            }
                        }
                        & > .device-list-item-content {
                            flex: auto;
                            line-height: 1.25rem;
                            padding-left: 0.5rem;
                            letter-spacing: -0.05rem;
                            &, & > p {
                                @include text-sle;
                            }
                            & > .device-list-item-content-title {
                                font-size: 0.9rem;
                                font-weight: 600;
                            }
                            & > .device-list-item-content-subtitle {
                                font-size: 0.8rem;
                                color: hsl(0, 0%, 48%);
                            }
                        }
                        &:hover > .device-list-item-end-pre {
                            display: flex;
                        }
                        & > .device-list-item-end-pre {
                            flex: none;
                            width: 2.5rem;
                            display: none;
                            justify-content: flex-end;
                            align-items: center;
                            font-size: 1.625rem;
                            line-height: 1;
                            color: $red;
                            cursor: pointer;
                        }
                        & > .device-list-item-end {
                            flex: none;
                            width: 2.5rem;
                            display: flex;
                            justify-content: flex-end;
                            align-items: center;
                            font-size: 1.5rem;
                            line-height: 1;
                        }
                    }
                }
            }
        }
        & > .device-frame-content {
            flex: auto;
            width: calc(100% - 15.625rem);
            background-color: #f5f5f5; /* #f5f5f5 */
        }
    }
</style>

<style lang="scss">
   #context-menu {
       cursor: default;
       &.ctx-menu-container {
           border: unset;
       }
       .delete-device {
           color: $red;
       }
        ul {
            border-radius: unset;
            padding: unset;
            color: black;
            font-size: 0.8rem;
            min-width: 9.25rem;
            border-color:  hsl(0, 0%, 78%) ;
        }
        hr {
            @include hr-mixin;
        }
       li {
           line-height: 1.7rem;
           padding: 0 1.25rem;
           &:hover {
               background-color: hsl(0, 0%, 91%);
           }
           &.disabled {
               background-color: unset;
               color:  $grey-light;
               cursor: not-allowed;
           }
       }
    }
</style>