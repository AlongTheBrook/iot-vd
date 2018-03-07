<template>
    <div class="s-toggle-button"
         :class="{'s-toggle-button-off': isOff,
             's-toggle-button-on': isOn,
             's-toggle-button-off-active': isOffActive,
             's-toggle-button-on-active': isOnActive}"
         @animationend.self="onAnimationend"
         @click="onClick">
        <div class="s-toggle-button-on-text">{{ onText }}</div>
        <div class="s-toggle-button-off-text">{{ offText }}</div>
        <div class="s-toggle-button-slider"></div>
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
      onText: {
        type: String
      },
      offText: {
        type: String
      }
    },
    data () {
      return {
        isOff: true,
        isOn: false,
        isOffActive: false,
        isOnActive: false
      }
    },
    created () {
      this.isOn = this.value
      this.isOff = !this.value
    },
    methods: {
      onClick () {
        let toggledValue = !this.value
        if (toggledValue) {
          this.isOff = false
          this.isOn = true
          this.isOffActive = false
          this.isOnActive = true
        } else {
          this.isOff = true
          this.isOn = false
          this.isOffActive = true
          this.isOnActive = false
        }
        this.$emit('input', toggledValue)
      },
      onAnimationend (e) {
        if (this.isOnActive) {
          this.isOff = false
          this.isOn = true
          this.isOffActive = false
          this.isOnActive = false
        } else if (this.isOffActive) {
          this.isOff = true
          this.isOn = false
          this.isOffActive = false
          this.isOnActive = false
        }
        this.$emit('toggleAnimationend', this.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .s-toggle-button {
        $height: 1.2rem;
        $width: 2.6rem;
        $bg-color-off: $grey-lighter;
        $bg-color-on: $turquoise;
        $text-color: white;
        $slider-bg-color: white;
        $animation-duration: 0.2s;
        $slider-interval: 0.2rem;
        $slider-radius: $height -  $slider-interval * 2 ;
        display: block;
        position: relative;
        cursor: pointer;
        height: $height;
        width: $width;
        border-radius: $height / 2;
        @mixin s-toggle-button-text($state) {
            position: absolute;
            top: $slider-interval;
            line-height: $slider-radius;
            font-size: $slider-radius;
            color: $text-color;
            $text-interval: $slider-radius / 2;
            @if($state == 'off') {
                right: $text-interval;
            }
            @else if($state == 'on') {
                left: $text-interval;
            }
        }
        & > .s-toggle-button-on-text {
            @include s-toggle-button-text('on');
        }
        & > .s-toggle-button-off-text {
            @include s-toggle-button-text('off');
        }
        & > .s-toggle-button-slider {
              position: absolute;
              top:  $slider-interval;
              height: $slider-radius;
              width: $slider-radius;
              border-radius: $slider-radius / 2;
              background-color: $slider-bg-color;
        }
        &.s-toggle-button-on {
            background-color: $bg-color-on;
            & > .s-toggle-button-off-text {
                opacity: 0;
            }
            & > .s-toggle-button-on-text {
                opacity: 1;
            }
            & >  .s-toggle-button-slider {
                left: $width - $slider-radius - $slider-interval;
            }
        }
        &.s-toggle-button-off {
            background-color: $bg-color-off;
            & > .s-toggle-button-off-text {
                opacity: 1;
            }
            & > .s-toggle-button-on-text {
                opacity: 0;
            }
            & >  .s-toggle-button-slider {
                left: $slider-interval;
            }
        }
        &.s-toggle-button-on-active {
            animation: s-toggle-button-frames #{$animation-duration} linear;
            & > .s-toggle-button-on-text {
                animation: s-toggle-button-text-frames #{$animation-duration} linear;
            }
            & > .s-toggle-button-off-text {
                animation: s-toggle-button-text-frames #{$animation-duration} linear reverse;
            }
            & > .s-toggle-button-slider {
                animation: s-toggle-button-slider-frames #{$animation-duration} linear;
            }
        }
        &.s-toggle-button-off-active {
            animation: s-toggle-button-frames #{$animation-duration} linear reverse;
            & > .s-toggle-button-on-text {
                animation: s-toggle-button-text-frames #{$animation-duration} linear reverse;
            }
            & > .s-toggle-button-off-text {
                animation: s-toggle-button-text-frames #{$animation-duration} linear;
            }
            & > .s-toggle-button-slider {
                animation: s-toggle-button-slider-frames #{$animation-duration} linear reverse;
            }
        }
        @keyframes s-toggle-button-frames {
            from {
                background-color: $bg-color-off;
            }
            to {
                background-color: $bg-color-on;
            }
        }
        @keyframes s-toggle-button-text-frames {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        @keyframes s-toggle-button-slider-frames {
            from {
                left: $slider-interval;
            }
            to {
                left: $width - $slider-radius - $slider-interval;
            }
        }
    }
</style>