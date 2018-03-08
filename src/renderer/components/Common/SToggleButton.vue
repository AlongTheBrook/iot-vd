<template>
    <div class="s-toggle-button"
         :class="{disabled: disabled}"
         :style="style"
         @transitionend.self="onTransitionend"
         @click="onClick">
        <div class="s-toggle-button-on-text" :style="onTextStyle">{{ onText }}</div>
        <div class="s-toggle-button-slider" :style="sliderStyle"></div>
        <div class="s-toggle-button-off-text" :style="offTextStyle">{{ offText }}</div>
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
      },
      unit: {
        type: String,
        default: 'rem'
      },
      height: {
        type: [Number, String],
        default: 1.2
      },
      width: {
        type: [Number, String],
        default: 2.6
      },
      bgColorOn: {
        type: String,
        default: '#00d1b2'
      },
      bgColorOff: {
        type: String,
        default: '#dbdbdb'
      },
      textColor: {
        type: String,
        default: 'white'
      },
      sliderInterval: {
        type: [Number, String],
        default: 0.2
      },
      sliderBgColor: {
        type: String,
        default: 'white'
      }
    },
    computed: {
      borderRadius () {
        return (this.height / 2)
      },
      sliderRadius () {
        return (this.height - this.sliderInterval * 2)
      },
      textInterval () {
        return (this.sliderRadius / 2)
      },
      style () {
        return {
          height: this.unitize(this.height),
          width: this.unitize(this.width),
          borderRadius: this.unitize(this.borderRadius),
          backgroundColor: this.value ? this.bgColorOn : this.bgColorOff
        }
      },
      onTextStyle () {
        return {
          lineHeight: this.unitize(this.sliderRadius),
          fontSize: this.unitize(this.sliderRadius),
          color: this.textColor,
          transform: this.translateX(this.unitize(this.textInterval)),
          opacity: this.value ? 1 : 0
        }
      },
      sliderStyle () {
        return {
          height: this.unitize(this.sliderRadius),
          width: this.unitize(this.sliderRadius),
          borderRadius: this.unitize(this.sliderRadius / 2),
          backgroundColor: this.sliderBgColor,
          transform: this.value ? this.translateX(this.unitize(this.width - this.sliderRadius - this.sliderInterval)) : this.translateX(this.unitize(this.sliderInterval))
        }
      },
      offTextStyle () {
        return {
          lineHeight: this.unitize(this.sliderRadius),
          fontSize: this.unitize(this.sliderRadius),
          color: this.textColor,
          transform: this.translateX(this.unitize(-this.textInterval)),
          opacity: this.value ? 0 : 1
        }
      }
    },
    methods: {
      unitize (value) {
        return value + this.unit
      },
      translateX (value) {
        return 'translateX(' + value + ')'
      },
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        &, & * {
            transition: all 0.2s linear;
        }
        @mixin s-toggle-button-text {
            flex: auto;
            width: 0;
        }
        & > .s-toggle-button-on-text {
            @include s-toggle-button-text;
        }
        & > .s-toggle-button-slider {
            position: absolute;
        }
        & > .s-toggle-button-off-text {
            @include s-toggle-button-text;
            text-align: right;
        }
        &.disabled {
            opacity: 0.4;
            pointer-events: none;
            // cursor: not-allowed; // 因为“pointer-events: none;”禁用一切鼠标事件，导致此句完全无效
        }
    }
</style>