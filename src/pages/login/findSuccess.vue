<script setup lang="ts">
  import { ref } from 'vue';
  import tmApp from '@/tmui/components/tm-app/tm-app.vue';
  import tmMessage from '@/tmui/components/tm-message/tm-message.vue';
  // import { onLoad } from '@dcloudio/uni-app';
  const msg = ref<InstanceType<typeof tmMessage> | null>(null);
</script>

<template>
  <tm-app>
    <view class="uno-w-full uno-h-100vh uno-bg-white" style="position: relative">
      <view class="content-top">
        <view class="login-img">
          <image src="/static/images/login/sendSuccess.png" mode="" />
          <view class="login-word"><p>重置成功</p></view>
        </view>
        <view class="sendSuccess"> 请尽快联系管理员，更改新的密码，由管理员联系您告知新密码 </view>
      </view>
    </view>
    <tm-message ref="msg" width="auto" />
  </tm-app>
</template>
<style>
  .content-top {
    width: 750rpx;
    height: 748rpx;
    background: linear-gradient(0deg, #ffffff 11%, #e2f0ff 100%);
  }
  .space {
    height: 30rpx;
    background-color: white;
  }
  .login-img image {
    width: 251rpx;
    height: 251rpx;
    margin-top: 237rpx;
    margin-left: 200rpx;
  }
  .login-word {
    width: 340rpx;
    height: 33rpx;
    margin-left: 300rpx;
    font-size: 34rpx;
    font-weight: bold;
    color: #333333;
    line-height: 42rpx;
  }
  .sendSuccess {
    margin-top: 20rpx;
    margin-left: 140rpx;
    text-align: center;
    width: 467rpx;
    height: 67rpx;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #888888;
    line-height: 42rpx;
  }
</style>
