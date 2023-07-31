<script lang="ts" setup>
  import { getCache } from '@/utils/catch';
  import { router } from '@/utils/router';

  const userInfo = getCache('userInfo');
</script>

<template>
  <view class="uno-w-full">
    <view class="uno-w-full uno-h-248rpx uno-mt-4rpx uno-bg-white uno-pl-32rpx">
      <view class="uno-w-full uno-h-123rpx uno-border-b-1rpx uno-border-[#ECECEC] uno-pr-32rpx" @click="router.push('/pages/me/editPhone')">
        <view class="uno-w-full uno-h-full uno-flex uno-items-center uno-justify-between">
          <view class="uno-text-30rpx uno-c-[#333333]">手机号</view>
          <view class="uno-flex uno-items-center uno-justify-center">
            <view class="uno-text-30rpx uno-c-[#828282]">{{ userInfo?.phone || '' }}</view>
            <image src="@/static/images/advance.png" mode="scaleToFill" class="uno-w-16rpx uno-h-26rpx uno-ml-24rpx" />
          </view>
        </view>
      </view>
      <view class="uno-w-full uno-h-123rpx uno-pr-32rpx" @click="router.push('/pages/me/editPassword')">
        <view class="uno-w-full uno-h-full uno-flex uno-items-center uno-justify-between">
          <view class="uno-text-30rpx uno-c-[#333333]">修改密码</view>
          <image src="@/static/images/advance.png" mode="scaleToFill" class="uno-w-16rpx uno-h-26rpx" />
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
  page {
    background-color: #f8f9fb;
  }
</style>
