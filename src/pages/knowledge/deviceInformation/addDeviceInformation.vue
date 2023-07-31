<script setup lang="ts">
  import { ref } from 'vue';
  import tmApp from '@/tmui/components/tm-app/tm-app.vue';
  import tmMessage from '@/tmui/components/tm-message/tm-message.vue';
  const msg = ref<InstanceType<typeof tmMessage> | null>(null);
</script>

<template>
  <tm-app>
    <view class="uno-w-full uno-h-100vh uno-bg-white">
      <view class="uno-w-full uno-min-h-1000rpx uno-bg-white uno-px-33rpx uno-pt-1rpx">
        <view>
          <view style="height: 43rpx; font-size: 46rpx; margin: 100rpx 0 0 20rpx; font-weight: bold; color: #333333; line-height: 42rpx">添加</view>
          <view
            style="height: 31rpx; font-size: 32rpx; font-family: PingFang SC; margin: 50rpx 0 0 20rpx; font-weight: bold; color: #333333; line-height: 42rpx"
            >请选择添加类型并选择文件或视频</view
          >
        </view>
        <!-- 选择 -->
        <view style="display: flex; flex-wrap: wrap; justify-content: space-around">
          <view
            class="information"
            tabindex="1"
            style="
              width: 316rpx;
              height: 315rpx;
              box-shadow: 0rpx 11rpx 46rpx 0rpx rgba(188, 188, 188, 0.21);
              border-radius: 50rpx;
              text-align: center;
              margin-top: 100rpx;
            "
          >
            <image src="/static/images/knowledge/add/icon1.png" mode="scaleToFill" style="width: 86rpx; height: 86rpx; margin-top: 60rpx" />

            <view style="margin-top: 50rpx; color: #333333ff; font-weight: bold">设备资料</view>
          </view>
          <view
            class="information"
            tabindex="2"
            style="
              width: 316rpx;
              height: 315rpx;
              box-shadow: 0rpx 11rpx 46rpx 0rpx rgba(188, 188, 188, 0.21);
              border-radius: 50rpx;
              text-align: center;
              margin-top: 100rpx;
            "
          >
            <image src="/static/images/knowledge/add/icon2.png" mode="scaleToFill" style="width: 86rpx; height: 86rpx; margin-top: 60rpx" />

            <view style="margin-top: 50rpx; color: #333333ff; font-weight: bold">设备资料</view>
          </view>
          <view
            class="information"
            tabindex="3"
            style="
              width: 316rpx;
              height: 315rpx;
              box-shadow: 0rpx 11rpx 46rpx 0rpx rgba(188, 188, 188, 0.21);
              border-radius: 50rpx;
              text-align: center;
              margin-top: 50rpx;
            "
          >
            <image src="/static/images/knowledge/add/icon3.png" mode="scaleToFill" style="width: 86rpx; height: 86rpx; margin-top: 60rpx" />

            <view style="margin-top: 50rpx; color: #333333ff; font-weight: bold">设备资料</view>
          </view>
          <view
            class="information"
            tabindex="4"
            style="
              width: 316rpx;
              height: 315rpx;
              box-shadow: 0rpx 11rpx 46rpx 0rpx rgba(188, 188, 188, 0.21);
              border-radius: 50rpx;
              text-align: center;
              margin-top: 50rpx;
            "
          >
            <image src="/static/images/knowledge/add/icon4.png" mode="scaleToFill" style="width: 86rpx; height: 86rpx; margin-top: 60rpx" />

            <view style="margin-top: 50rpx; color: #333333ff; font-weight: bold">设备资料</view>
          </view>
        </view>
      </view>
      <tm-message ref="msg" width="auto" />
    </view>
  </tm-app>
</template>
<style lang="scss" scoped>
  .information:focus {
    background: #eff5ffff;
    border: 3rpx solid #337ef2;
    box-shadow: 0rpx 11rpx 46rpx 0rpx rgba(188, 188, 188, 0.21);
    border-radius: 50rpx;
  }
</style>
