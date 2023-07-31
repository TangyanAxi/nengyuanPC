<script lang="ts" setup>
  import { ref } from 'vue';

  const props = defineProps({
    title: { type: String, default: '' },
    status: { type: Boolean, default: false },
  });
  const CardStatus = ref(props.status || false);
  const emits = defineEmits(['click']);
  const click = () => {
    CardStatus.value = !CardStatus.value;
    CardStatus.value && emits('click');
  };
</script>

<template>
  <view :class="[CardStatus ? 'card-active' : '', 'card uno-shadow-sm']">
    <view class="card-top" @click="click">
      <text>{{ title }}</text>
      <image class="arrow" src="/static/images/arrow-down.png" mode="" />
    </view>

    <view class="card-content">
      <slot></slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .card {
    width: 100%;
    background: #ffffff;
    border-radius: 20rpx;
    max-height: 125rpx;
    box-sizing: border-box;
    padding: 0 30rpx;
    overflow: hidden !important;
    margin-bottom: 25rpx;
    transition: all 0.5s;
    .card-top {
      width: 100%;
      height: 125rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > text {
        flex: 1;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
      }

      & > .arrow {
        width: 18rpx;
        height: 10rpx;
        transition: all 0.5s;
      }
    }

    .card-content {
      width: 100%;
      padding: 0 0 30rpx;
      box-sizing: border-box;
      min-height: 520rpx;
    }
  }

  .card-active {
    // transition: all 0.5s;
    max-height: 800rpx;
    & > .card-top {
      & > .arrow {
        transform: rotate(180deg);
        transform-origin: center center;
      }
    }
  }
</style>
