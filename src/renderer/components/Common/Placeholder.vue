<template>
    <div class="placeholder" :style="{backgroundColor: bgColor}">
        <div class="placeholder-title"></div>
        <div class="placeholder-content" :style="{color: color}">
            <div class="placeholder-icon icon s-icon">
                <i class="fas fa-lg" :class="[icon]"></i>
            </div>
            <div class="placeholder-text">{{ text }}</div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'placeholder',
    props: {
      icon: {
        type: String,
        required: true
      },
      text: {
        type: String
      },
      bgColor: {
        type: String,
        default: '#e8e8e8'
      },
      color: {
        type: String,
        default: 'hsl(0, 0%, 71%)'
      }
    }
  }
</script>

<style lang="scss" scoped>
    .placeholder {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        & > .placeholder-title {
            flex: none;
            height: 4rem;
            @include electron-drag;
        }
        & > .placeholder-content {
            flex: auto;
            height: calc(100% - 4rem);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            & > .placeholder-icon {
                font-size: 4rem;
                margin-bottom: 2rem;
            }
            & > .placeholder-text {
                font-size: 2rem;
            }
        }
    }
</style>