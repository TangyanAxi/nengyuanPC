<script setup lang="ts">
  import { ref } from 'vue';
  import tmApp from '@/tmui/components/tm-app/tm-app.vue';
  import tmMessage from '@/tmui/components/tm-message/tm-message.vue';
  // import { onLoad } from '@dcloudio/uni-app';
  // import { code } from '@/services/api/auth';
  const msg = ref<InstanceType<typeof tmMessage> | null>(null);
  //点击退回上一页
  const back = () => {
    //uni.navigateBack()//默认delta:1
    uni.navigateBack({
      delta: 1, //返回层数，2则上上页
    });
  };
</script>

<template>
  <tm-app>
    <view class="uno-w-full uno-h-100vh uno-bg-white" style="position: relative">
      <view class="content-top">
        <view style="position: absolute; width: 100rpx; height: 100rpx; margin-top: 40rpx; margin-left: 30rpx">
          <image src="/static/images/login/backPass.png" mode="scaleToFill" class="uno-w-60rpx uno-h-60rpx" @click="back" />
        </view>
        <view class="findPassWord">客服与帮助</view>
        <!-- <image src="/static/images/login/logoLogin.png" mode="" /> -->
        <view class="login-word"><p>请联系管理员寻求相应的帮助。</p></view>
      </view>
      <tm-button style="width: 640rpx; margin-left: 60rpx; margin-top: -100rpx" round="20" height="100" block label="联系管理员" />
    </view>
    <tm-message ref="msg" width="auto" />
  </tm-app>
</template>
<style>
  .content-top {
    width: 750rpx;
    height: 748rpx;
    background: linear-gradient(0deg, #ffffff 11%, #e2f0ff 100%);
    position: relative;
  }
  .space {
    height: 30rpx;
    background-color: white;
  }
  .findPassWord {
    margin: 300rpx 0 0 80rpx;
    position: absolute;
    width: 260rpx;
    height: 46rpx;
    font-size: 48rpx;
    font-weight: bold;
    color: #333333;
    line-height: 42rpx;
  }
  .login-word {
    margin: 376rpx 0 0 80rpx;
    position: absolute;
  }
</style>
