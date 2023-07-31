<script setup lang="ts">
  import { ref } from 'vue';
  import tmMessage from '@/tmui/components/tm-message/tm-message.vue';
  const msg = ref<InstanceType<typeof tmMessage> | null>(null);

  const username = ref('');

  const handleModifyName = () => {
    if (!username.value) {
      msg.value?.show({ model: 'error', text: '请输入昵称' });
      return;
    }
    msg.value?.show({ model: 'success', text: '修改成功' });
    setTimeout(() => {
      uni.navigateBack();
    }, 1000);
  };
</script>

<template>
  <view class="content">
    <view class="phone"> <view>昵称</view> <input type="number" maxlength="11" v-model.trim="username" placeholder="请输入昵称" /> </view>
    <view class="button" @click="handleModifyName">确定</view>
    <tm-message ref="msg" width="auto" />
  </view>
</template>

<style>
  page {
    background: #f8f9fb;
  }
</style>

<style lang="scss" scoped>
  .top {
    padding: 54rpx 35rpx 50rpx;
    background: white;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    input {
      width: 50%;
      font-size: 28rpx;
      color: #999999;
      height: 100%;
    }
    & > view:nth-child(1) {
      font-size: 30rpx;
      width: 25%;
    }
    .code {
      width: 175rpx;
      height: 75rpx;
      background: #4a87fa;
      border-radius: 10rpx;
      font-size: 26rpx;
      color: #ffffff;
      text-align: center;
      line-height: 75rpx;
    }
  }
  .button {
    width: 580rpx;
    height: 95rpx;
    background: #4069e8;
    border-radius: 48rpx;
    margin: 100rpx auto 0;
    text-align: center;
    line-height: 95rpx;
    color: white;
    font-size: 28rpx;
  }
  .phone {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 38rpx 0 34rpx;
    height: 124rpx;
    background: white;
    border-bottom: 2rpx solid #f5f5f5;
    & > view {
      font-size: 30rpx;
      width: 25%;
    }
    input {
      flex: 1;
      font-size: 28rpx;
      text-align: left;
    }
  }
</style>
