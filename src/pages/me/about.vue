<script lang="ts" setup>
  import { ref } from 'vue';
  import tmMessage from '@/tmui/components/tm-message/tm-message.vue';
  // import { about } from '@/services/api/base';
  import { onLoad } from '@dcloudio/uni-app';
  const msg = ref<InstanceType<typeof tmMessage> | null>(null);

  onLoad(() => handleAbout());

  // const aboutInfo = ref<any>(null);
  const handleAbout = () => {
    //   about()
    //     .then((res) => (aboutInfo.value = res.data))
    //     .catch((err) => msg.value?.show({ model: 'error'， text: err.msg }));
  };
  const text = ref(
    `<div class="content_area" id="content_area"
     style="font-size: 26rpx; font-weight: normal; color: #333333; line-height: 43rpx;font-family: Adobe Heiti Std;">
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 这设备管理系统用于管理公司旗下的设备信息，具体包括用户管理，角色管理，菜单管理，部门管理，岗位管理，字典管理，参数管理，日志管理，位置管理，设备管理，备件管理，结构树，设备盘点，保养标准，周期保养，
                  设备事件，特种设备，设备资料，规章制度，设备知识，维保经验，设备程序，通知管理，维修管理以及系统监控等功能。<br></p>
            </div>`,
  );
</script>

<template>
  <view class="about-page">
    <image src="/static/images/index/logo.png" style="width: 130rpx; height: 55rpx" mode="" />
    <view class="version">1.0 版本</view>
    <!-- <view class="content" v-if="aboutInfo"><rich-text :nodes="text" /></view> -->
    <tm-html :content="text" class="content" />
    <tm-message ref="msg" width="auto" />
  </view>
</template>

<style lang="scss" scoped>
  .about-page {
    width: 100%;
    min-height: 100vh;
    background: #ffffff;
    box-sizing: border-box;
    padding: 40rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    image {
      width: 85rpx;
      height: 94rpx;
      margin-bottom: 37rpx;
    }
    .name {
      font-size: 36rpx;
      font-family: FZDaHei-B02S;
      font-weight: bolder;
      color: #333333;
      margin-bottom: 20rpx;
    }
    .version {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
      margin-bottom: 40rpx;
    }
    .content {
      width: 600rpx;
      font-size: 30rpx;
      font-family: Adobe Heiti Std;
      font-weight: bold;
      color: #333333;
      line-height: 60rpx;
    }
  }
</style>
