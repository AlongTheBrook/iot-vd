/**
version: 0.9.0
属性			值类型		默认值		说明
value			Boolean		false		状态值
disabled		Boolean		false		是否禁用按钮，禁用后，无法通过鼠标操作，但是可以通过父组件绑定的数据操作
onText			String		null		on状态的文本
offText			String		null		off状态的文本
unit			String 		'rem'		计算所用的单位，对所有数值属性有效，支持所有css支持的长度单位
height			Number		1.2			定义按钮高度值，同时也是组件内部其他属性按比例自动缩放的基础值
width			Number		2.6			定义按钮宽度值，同时也是组件内部其他属性按比例自动缩放的基础值
bgColorOn		String		'#00d1b2'	on状态按钮背景色
bgColorOff		String		'#dbdbdb'	off状态按钮背景色
textColorOn		String 		'white'		on状态文本颜色
textColorOff	String 		'white'		off状态文本颜色
sliderInterval	Number		0.2			滑块与边缘的间距值
sliderBgColor	String		'white'		滑块背景色
说明：以上属性均能通过父组件单向绑定，以动态改变组件特性；若想双向绑定状态，则使用v-model指令来绑定，取代value的单向绑定
*/
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
        type: Number,
        default: 1.2
      },
      width: {
        type: Number,
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
      textColorOn: {
        type: String,
        default: 'white'
      },
      textColorOff: {
        type: String,
        default: 'white'
      },
      sliderInterval: {
        type: Number,
        default: 0.2
      },
      sliderBgColor: {
        type: String,
        default: 'white'
      }
    },
    computed: {
      sliderSideLength () {
        return (this.height - this.sliderInterval * 2)
      },
      textInterval () {
        return (this.sliderSideLength / 2)
      },
      style () {
        return {
          height: this.unitize(this.height),
          width: this.unitize(this.width),
          borderRadius: this.unitize(this.height),
          backgroundColor: this.state ? this.bgColorOn : this.bgColorOff
        }
      },
      onTextStyle () {
        return {
          lineHeight: this.unitize(this.sliderSideLength),
          fontSize: this.unitize(this.sliderSideLength),
          color: this.textColorOn,
          transform: this.translateX(this.unitize(this.textInterval)),
          opacity: this.state ? 1 : 0
        }
      },
      sliderStyle () {
        return {
          height: this.unitize(this.sliderSideLength),
          width: this.unitize(this.sliderSideLength),
          backgroundColor: this.sliderBgColor,
          transform: this.state ? this.translateX(this.unitize(this.width - this.sliderSideLength - this.sliderInterval)) : this.translateX(this.unitize(this.sliderInterval))
        }
      },
      offTextStyle () {
        return {
          lineHeight: this.unitize(this.sliderSideLength),
          fontSize: this.unitize(this.sliderSideLength),
          color: this.textColorOff,
          transform: this.translateX(this.unitize(-this.textInterval)),
          opacity: this.state ? 0 : 1
        }
      }
    },
    data () {
      return {
        state: this.value,
        clicked: false
      }
    },
    watch: {
      value (newValue) {
        if (this.clicked) {
          this.clicked = false
        } else {
          this.state = newValue
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
        this.clicked = true
        this.state = !this.state
        this.$emit('input', this.state)
      },
      onTransitionend () {
        this.$emit('toggleTransitionend', this.state)
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
            border-radius: 50%;
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