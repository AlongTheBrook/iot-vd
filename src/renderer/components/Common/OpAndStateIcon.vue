<template>
    <div>
        <svg class="iconfont state-stoped" aria-hidden="true" v-show="device.state === state.STOPED">
            <use xlink:href="#icon-play"></use>
        </svg>
        <svg class="iconfont state-starting" aria-hidden="true" v-show="device.state === state.STARTING">
            <use xlink:href="#icon-loading"></use>
        </svg>
        <svg class="iconfont state-device-connecting" aria-hidden="true" v-show="device.state === state.DEVICE_CONNECTING">
            <use xlink:href="#icon-connecting"></use>
        </svg>
        <svg class="iconfont state-device-reconnecting" aria-hidden="true" v-show="device.state === state.DEVICE_RECONNECTING">
            <use xlink:href="#icon-connecting"></use>
        </svg>
        <svg class="iconfont state-server_connecting" aria-hidden="true" v-show="device.state === state.SERVER_CONNECTING">
            <use xlink:href="#icon-server"></use>
        </svg>
        <svg class="iconfont state-server-reconnecting" aria-hidden="true" v-show="device.state === state.SERVER_RECONNECTING">
            <use xlink:href="#icon-server"></use>
        </svg>
        <svg class="iconfont state-running" aria-hidden="true" v-show="device.state === state.RUNNING">
            <use xlink:href="#icon-circle"></use>
        </svg>
        <svg class="iconfont state-heartbeat" aria-hidden="true" v-show="device.state === state.HEARTBEAT">
            <use xlink:href="#icon-heart"></use>
        </svg>
        <svg class="iconfont state-stopping" aria-hidden="true" v-show="device.state === state.STOPPING">
            <use xlink:href="#icon-loading"></use>
        </svg>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'op-and-state-icon',
    props: {
      device: {
        type: Object,
        required: true
      }
    },
    computed: {
      ...mapGetters('device', [
        'state'
      ])
    }
  }
</script>

<style lang="scss" scoped>
    .state {
        @keyframes rotate {
            0% {
                transform: rotate(0deg);
            }
            25% {
                transform: rotate(90deg);
            }
            50% {
                transform: rotate(180deg);
            }
            75% {
                transform: rotate(270deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        &-stoped {
            cursor: pointer;
        }
        &-starting {
            animation: rotate 1s linear 0s infinite;
        }
        &-device-connecting {

        }
        &-device-reconnecting {
            color: $red;
        }
        &-server-connecting {

        }
        &-server-reconnecting {
            color: $red;
        }
        &-running {
            color: $green;
        }
        &-heartbeat {
            color: $red;
            animation: beat 0.5s ease-in 0s infinite;
            @keyframes beat {
                0% {
                    transform: scale(1, 1);
                }
                25% {
                    transform: scale(1.5, 1.5);
                }
                50% {
                    transform: scale(2, 2);
                }
                100% {
                    transform: scale(1, 1);
                }
            }
        }
        &-stopping {
            color: $red;
            animation: rotate 1s linear 0s infinite;
        }
    }
</style>