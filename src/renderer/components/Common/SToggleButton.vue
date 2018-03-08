<template>
    <div class="s-toggle-button"
         :class="{'s-toggle-button-on': value, 's-toggle-button-off': !value, disabled: disabled}"
         @transitionend.self="onTransitionend"
         @click="onClick">
        <div class="s-toggle-button-on-text">{{ onText }}</div>
        <div class="s-toggle-button-slider"></div>
        <div class="s-toggle-button-off-text">{{ offText }}</div>
    </div>
</template>

<script>
  export default {
    name: 's-toggle-button',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      onText: {
        type: String
      },
      offText: {
        type: String
      }
    },
    methods: {
      onClick () {
        this.$emit('input', !this.value)
      },
      onTransitionend (e) {
        this.$emit('toggleTransitionend', this.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .s-toggle-button {
        $height: 1.2rem;
        $width: 4.6rem;
        $bg-color-on: $turquoise;
        $bg-color-off: $grey-lighter;
        $text-color: white;
        $slider-interval: 0.2rem;
        $slider-radius: $height -  $slider-interval * 2 ;
        $slider-bg-color: white;
        $text-interval: $slider-radius / 2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        height: $height;
        width: $width;
        border-radius: $height / 2;
        &, & * {
            transition: all 0.2s linear;
        }
        @mixin s-toggle-button-text {
            flex: auto;
            width: 0;
            line-height: $slider-radius;
            font-size: $slider-radius;
            color: $text-color;
        }
        & > .s-toggle-button-on-text {
            @include s-toggle-button-text;
            transform: translateX($text-interval);
        }
        & > .s-toggle-button-slider {
            position: absolute;
            height: $slider-radius;
            width: $slider-radius;
            border-radius: $slider-radius / 2;
            background-color: $slider-bg-color;
        }
        & > .s-toggle-button-off-text {
            @include s-toggle-button-text;
            transform: translateX(-$text-interval);
            text-align: right;
        }
        &.s-toggle-button-on {
            background-color: $bg-color-on;
            & > .s-toggle-button-on-text {
                opacity: 1;
            }
            & > .s-toggle-button-slider {
                transform: translateX(#{$width - $slider-radius - $slider-interval});
            }
            & > .s-toggle-button-off-text {
                opacity: 0;
            }
        }
        &.s-toggle-button-off {
            background-color: $bg-color-off;
            & > .s-toggle-button-on-text {
                opacity: 0;
            }
            & > .s-toggle-button-slider {
                transform: translateX($slider-interval);
            }
            & > .s-toggle-button-off-text {
                opacity: 1;
            }
        }
        &.disabled {
            opacity: 0.4;
            pointer-events: none;
            // cursor: not-allowed; // 因为“pointer-events: none;”禁用一切鼠标事件，导致此句完全无效
        }
    }
</style>