<script setup lang="ts">
  import { ref } from 'vue';
  import { getStaticImage } from '@/utils';
  import tmApp from '@/tmui/components/tm-app/tm-app.vue';
  import tmMessage from '@/tmui/components/tm-message/tm-message.vue';
  const msg = ref<InstanceType<typeof tmMessage> | null>(null);
  const active = ref(0);

  const menu = [
    { name: '设备资料', icon: 'knowledge/add/icon1.png', url: '' },
    { name: '维保经验库', icon: 'knowledge/add/icon2.png', url: '' },
    { name: '规章制度', icon: 'knowledge/add/icon3.png', url: '' },
    { name: '设备知识', icon: 'knowledge/add/icon4.png', url: '' },
  ];
  function clickGo(index: any) {
    if (index == 0) {
      uni.navigateTo({
        url: '/pages/knowledge/deviceInformation/addInforma',
      });
    } else if (index == 1) {
      uni.navigateTo({
        url: '/pages/knowledge/fixExper/addExper',
      });
    } else if (index == 2) {
      uni.navigateTo({
        url: '/pages/knowledge/rulesRegulations/addRegulations',
      });
    } else if (index == 3) {
      uni.navigateTo({
        url: '/pages/knowledge/deviceKnow/addDevKnow',
      });
    }
  }
</script>

<template>
  <tm-app>
    <view class="uno-w-full uno-h-100vh uno-bg-white uno-px-44rpx">
      <view class="uno-w-full uno-mt-100rpx uno-c-[#333] uno-text-46rpx uno-font-bold">添加</view>
      <view class="uno-w-full uno-mt-30rpx uno-c-[#333] uno-text-32rpx uno-font-bold">请选择添加类型并选择文件或视频</view>
      <view class="uno-w-full uno-flex uno-flex-wrap uno-justify-between uno-h-700rpx uno-mt-80rpx">
        <view
          v-for="(item, index) in menu"
          :key="index"
          @click="(active = index), clickGo(index)"
          :class="[active === index ? 'uno-bg-[#EFF5FF] uno-border-[#337EF2] uno-border-3rpx uno-border-solid' : 'uno-bg-white']"
          class="uno-w-316rpx uno-h-316rpx uno-rounded-50rpx uno-flex uno-flex-col uno-items-center uno-justify-center shadow1"
        >
          <view class="uno-w-86rpx uno-h-86rpx">
            <image :src="getStaticImage(item.icon)" mode="scaleToFill" class="uno-w-full uno-h-full" />
          </view>
          <view class="uno-mt-60rpx uno-c-[#333] uno-font-bold uno-text-32rpx">{{ item.name }}</view>
        </view>
      </view>
      <tm-message ref="msg" width="auto" />
    </view>
  </tm-app>
</template>

<style lang="scss" scoped>
  .shadow1 {
    box-shadow: 0rpx 11rpx 46rpx 0rpx rgba(188, 188, 188, 0.21);
  }
</style>
