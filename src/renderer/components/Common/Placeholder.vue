<template>
    <div class="placeholder">
        <div class="placeholder-title"></div>
        <div class="placeholder-content">
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
      }
    }
  }
</script>

<style lang="scss" scoped>
    .placeholder {
        height: 100%;
        width: 100%;
        background-color: #e8e8e8;
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
            color: $grey-light;
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