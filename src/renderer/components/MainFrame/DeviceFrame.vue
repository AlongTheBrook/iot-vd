<template>
    <div class="device-frame">
        <div class="device-frame-menu">
            <div class="device-li-base">

            </div>
            <ul>
                <li class="device-li">
                    <div class="device-li-start">
                        <figure class="image">
                            <img src="https://bulma.io/images/placeholders/48x48.png">
                        </figure>
                    </div>
                    <div class="device-li-content">
                        <p class="device-li-content-title">设备名称 -> 家乐苑小区进水</p>
                        <p class="device-li-content-subtitle">最后信息 -> √ 15:41</p>
                    </div>
                    <div class="device-li-end">
                        <div class="icon">
                            <i class="far fa-heart fa-lg"></i>
                        </div>
                    </div>
                </li>

                <li class="device-li">
                    <div class="device-li-start">
                        <figure class="image">
                            <img src="https://bulma.io/images/placeholders/48x48.png">
                        </figure>
                    </div>
                    <div class="device-li-content">
                        <p class="device-li-content-title">设备名称 -> 家乐苑小区进水</p>
                        <p class="device-li-content-subtitle">最后信息 -> √ 15:41</p>
                    </div>
                    <div class="device-li-end">
                        <div class="icon">
                            <i class="far fa-heart fa-lg"></i>
                        </div>
                    </div>
                </li>
                <li class="device-li">
                    <div class="device-li-start">
                        <figure class="image">
                            <img src="https://bulma.io/images/placeholders/48x48.png">
                        </figure>
                    </div>
                    <div class="device-li-content">
                        <p class="device-li-content-title">设备名称 -> 家乐苑小区进水</p>
                        <p class="device-li-content-subtitle">最后信息 -> √ 15:41</p>
                    </div>
                    <div class="device-li-end">
                        <div class="icon">
                            <i class="far fa-heart fa-lg"></i>
                        </div>
                    </div>
                </li>
                <li class="device-li">
                    <div class="device-li-start">
                        <figure class="image">
                            <img src="https://bulma.io/images/placeholders/48x48.png">
                        </figure>
                    </div>
                    <div class="device-li-content">
                        <p class="device-li-content-title">设备名称 -> 家乐苑小区进水</p>
                        <p class="device-li-content-subtitle">最后信息 -> √ 15:41</p>
                    </div>
                    <div class="device-li-end">
                        <div class="icon">
                            <i class="far fa-heart fa-lg"></i>
                        </div>
                    </div>
                </li>
            </ul>
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
        width: 15.625rem;
        background-color: #e8e8e8;
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

    .device-li-base {
        display: flex;
        height: 4rem;
        padding: 0.75rem;
    }

    .device-li {
        @include mouse-bg-mixin(transparent, $grey-lighter, $grey-light);
        @extend .device-li-base;
        & > .device-li-start {
            flex: none;
            width: 2.5rem;
        }
        & > .device-li-content {
            flex: auto;
            line-height: 1.25rem;
            padding-left: 0.5rem;
            letter-spacing: -0.05rem;
            &, & > p {
                @include text-sle;
            }
            & > .device-li-content-title {
                font-size: 0.9rem;
                font-weight: 600;
            }
            & > .device-li-content-subtitle {
                font-size: 0.8rem;
                color: hsl(0, 0%, 48%);
            }
        }
        & > .device-li-end {
            flex: none;
            width: 2.5rem;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
    }
</style>