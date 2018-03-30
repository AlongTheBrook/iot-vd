<template>
    <div class="op-and-state-icon">
        <div v-tooltip="{content: '启动', show: device.state === state.STOPED ? null : false}" @click.stop="start" v-show="device.state === state.STOPED">
            <svg class="iconfont state-stoped" aria-hidden="true">
                <use xlink:href="#icon-play"></use>
            </svg>
        </div>
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
        <radial-progress-bar class="state-running" v-show="device.state === state.RUNNING"
                             :diameter="24" :stroke-width="2"
                             :start-color="'hsl(141, 71%, 48%)'" :stop-color="'hsl(141, 71%, 48%)'"
                             :totalSteps="totalSteps" :completedSteps="completedSteps">
        </radial-progress-bar>
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
  import RadialProgressBar from './RadialProgressBar'

  export default {
    name: 'op-and-state-icon',
    components: { RadialProgressBar },
    props: {
      device: {
        type: Object,
        required: true
      }
    },
    computed: {
      ...mapGetters('device', [
        'state'
      ]),
      totalSteps () {
        const steps = this.device.hbMinutes ? this.device.hbMinutes * 60 : 0
        return steps === 0 ? 100 : steps
      },
      completedSteps () {
        const steps = this.totalSteps - this.device.hbCountdownSeconds
        return steps === 0 ? 1 : steps
      }
    },
    methods: {
      start () {
        this.$electron.ipcRenderer.send('@device.start', this.device)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .op-and-state-icon {
        display: flex;
        align-items: center;
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
        .state-stoped {
            cursor: pointer;
        }
        .state-starting {
            animation: rotate 1s linear 0s infinite;
        }
        .state-device-connecting {

        }
        .state-device-reconnecting {
            color: $red;
        }
        .state-server-connecting {

        }
        .state-server-reconnecting {
            color: $red;
        }
        .state-running {
            color: $green;
        }
        .state-heartbeat {
            color: $red;
            animation: beat 0.5s ease-in-out 0s infinite;
            @keyframes beat {
                0% {
                    transform: scale(1, 1);
                }
                50% {
                    transform: scale(2, 2);
                }
                75% {
                    transform: scale(1.5, 1.5);
                }
                100% {
                    transform: scale(1, 1);
                }
            }
        }
        .state-stopping {
            color: $red;
            animation: rotate 1s linear 0s infinite;
        }
    }
</style>