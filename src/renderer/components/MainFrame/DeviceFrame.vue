<template>
    <div class="device-frame">
        <div class="device-frame-menu">
            <div class="device-list-control">
                <div class="device-list-control-search field">
                    <p class="control has-icons-right">
                        <input class="input is-small" type="text" placeholder="搜索"/>
                        <span class="icon is-small is-right">
                            <i class="fas fa-search"></i>
                        </span>
                    </p>
                </div>
                <div class="device-list-control-create field">
                    <p class="control">
                        <a class="button is-small is-primary">
                            <span class="icon">
                                <i class="fas fa-plus"></i>
                            </span>
                        </a>
                    </p>
                </div>
            </div>
            <div class="device-list-container" v-bar="{preventParentScroll: true}">
                <ul class="device-list" >
                    <draggable v-model="deviceList">
                        <li v-for="item in deviceList" :key="item.id" class="device-list-item">
                            <div class="device-list-item-start">
                                <figure class="image">
                                    <img src="https://bulma.io/images/placeholders/48x48.png">
                                </figure>
                            </div>
                            <div class="device-list-item-content">
                                <p class="device-list-item-content-title">{{ item.name }}</p>
                                <p class="device-list-item-content-subtitle">{{ item.msg }}</p>
                            </div>
                            <div class="device-list-item-end">
                                <div class="icon">
                                    <i class="far fa-heart fa-lg"></i>
                                </div>
                            </div>
                        </li>
                    </draggable>
                </ul>
            </div>
        </div>
        <div class="device-frame-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Draggable from 'vuedraggable'

    export default {
      name: 'device-frame',
      components: { Draggable },
      data () {
        return {
          deviceList: [
            {
              id: 1,
              type: 1,
              name: '设备名称 -> 家乐苑小区进水',
              msg: '最后信息 -> ☇ 15:41 ',
              state: 1
            },
            {
              id: 2,
              type: 1,
              name: '设备#002',
              msg: '☇ 数据采集 10:27 ',
              state: 1
            },
            {
              id: 3,
              type: 1,
              name: '设备#003',
              msg: '☇ 数据采集 10:27 ',
              state: 1
            },
            {
              id: 4,
              type: 1,
              name: '设备#004',
              msg: '☇ 数据采集 10:27 ',
              state: 1
            },
            {
              id: 5,
              type: 1,
              name: '设备#005',
              msg: '☇ 数据采集 10:27 ',
              state: 1
            },
            {
              id: 6,
              type: 1,
              name: '设备#006',
              msg: '☇ 数据采集 10:27 ',
              state: 1
            },
            {
              id: 7,
              type: 1,
              name: '设备#007',
              msg: '☇ 数据采集 10:27 ',
              state: 1
            },
            {
              id: 8,
              type: 1,
              name: '设备#008',
              msg: '☇ 数据采集 10:27 ',
              state: 1
            },
            {
              id: 9,
              type: 1,
              name: '设备#009',
              msg: '☇ 数据采集 10:27 ',
              state: 1
            },
            {
              id: 10,
              type: 1,
              name: '设备#010',
              msg: '☇ 数据采集 10:27 ',
              state: 1
            },
            {
              id: 11,
              type: 1,
              name: '设备#011',
              msg: '☇ 数据采集 10:27 ',
              state: 1
            },
            {
              id: 12,
              type: 1,
              name: '设备#012',
              msg: '☇ 数据采集 10:27 ',
              state: 1
            }
          ]
        }
      }
    }
</script>

<style lang="scss" scoped>
    .device-frame {
        display: flex;
        height: 100%;
    }

    .device-frame-menu {
        @include electron-no-drag;
        width: 15.625rem;
        background-color: #e8e8e8;
        display: flex;
        flex-direction: column;
    }

    .device-frame-content {
        flex: auto;
        background-color: #f5f5f5; /* #f5f5f5 */
    }

    @mixin mouse-bg-mixin($normal, $hover, $active) {
        &, .is-clicked &:hover {
            background-color: $normal;
        }

        &:hover, &.is-hovered {
            background-color: $hover;
        }

        &:active, &.is-active {
            background-color: $active;
        }
    }

    .device-list-baseclass {
        display: flex;
        height: 4rem;
        padding: 0.75rem;
    }

    .device-list-control {
        flex: none;
        $border-color: $grey-light;
        $background-color: $grey-lighter;
        @extend .device-list-baseclass;
        align-items: flex-end;
        & > .device-list-control-search {
            flex: auto;
            margin-bottom: 0 !important;
            padding-right: 0.5rem;
            & .input {
                border-radius: 0;
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
        & > .device-list-control-create {
            flex: none;
            & .button {
                border-radius: 0;
            }
        }
    }

    .device-list-container {
        flex: auto;
        display: flex;
        flex-direction: column;
    }

    .device-list {
        flex: auto;
        overflow-y: scroll;
    }

    .device-list-item {
        @include mouse-bg-mixin(transparent, $grey-lighter, $grey-light);
        @extend .device-list-baseclass;
        cursor: default;
        & > .device-list-item-start {
            flex: none;
            width: 2.5rem;
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
        & > .device-list-item-end {
            flex: none;
            width: 2.5rem;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
    }
</style>