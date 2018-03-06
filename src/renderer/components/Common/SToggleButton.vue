<template>
    <div class="s-toggle-button"
         :class="{'s-toggle-button-off': isOff,
             's-toggle-button-on': isOn,
             's-toggle-button-off-active': isOffActive,
             's-toggle-button-on-active': isOnActive}"
         @animationend="onAnimationend"
         @click="onClick">
        <div class="s-toggle-button-slider"></div>
    </div>
</template>

<script>
  export default {
    name: 's-toggle-button',
    props: {
      initFlag: {
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
        flag: false,
        isOff: true,
        isOn: false,
        isOffActive: false,
        isOnActive: false
      }
    },
    methods: {
      onClick () {
        this.flag = !this.flag
        if (this.flag) {
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
        this.$emit('toggle', this.flag)
      },
      onAnimationend (e) {
        if (e.srcElement.className.includes('s-toggle-button-slider')) {
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
          this.$emit('toggleAnimationend', this.flag)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    .s-toggle-button {
        $height: 1.2rem;
        $width: 2.8rem;
        $bg-color-off: $grey-lighter;
        $bg-color-on: $turquoise;
        $slider-bg-color: white;
        $animation-duration: .2s;
        $slider-interval: 0.2rem;
        $slider-radius: $height -  $slider-interval * 2 ;
        display: block;
        position: relative;
        height: $height;
        width: $width;
        border-radius: $height / 2;
    & > .s-toggle-button-slider {
          position: absolute;
          top:  $slider-interval;
          height: $slider-radius;
          width: $slider-radius;
          border-radius: $slider-radius / 2;
          background-color: $slider-bg-color;
      }
    &.s-toggle-button-off {
         background-color: $bg-color-off;
    & >  .s-toggle-button-slider {
          left: $slider-interval;
      }
    }
    &.s-toggle-button-on {
         background-color: $bg-color-on;
    & >  .s-toggle-button-slider {
          left: $width - $slider-radius - $slider-interval;
      }
    }
    &.s-toggle-button-off-active {
         animation: s-toggle-button-frames #{$animation-duration} linear reverse;
    & > .s-toggle-button-slider {
          animation: s-toggle-button-circle-frames #{$animation-duration} linear reverse;
      }
    }
    &.s-toggle-button-on-active {
         animation: s-toggle-button-frames #{$animation-duration} linear;
    & > .s-toggle-button-slider {
          animation: s-toggle-button-circle-frames #{$animation-duration} linear;
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
    @keyframes s-toggle-button-circle-frames {
        from {
            left: $slider-interval;
        }
        to {
            left: $width - $slider-radius - $slider-interval;
        }
    }
    }
</style>