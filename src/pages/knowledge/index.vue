<script setup lang="ts">
  import { ref } from 'vue';
  import { router } from '@/utils/router';
  import { getStaticImage } from '@/utils';
  import tmApp from '@/tmui/components/tm-app/tm-app.vue';
  import tmMessage from '@/tmui/components/tm-message/tm-message.vue';
  import { onLoad } from '@dcloudio/uni-app';
  import { deviceKnow } from '@/services/api/auth';
  const msg = ref<InstanceType<typeof tmMessage> | null>(null);

  onLoad(() => {
    deviceKnowList();
  });
  // 处理 deviceStatus 字典
  const deviceStatusDict = (deviceStatus: string | number) => {
    const dict = {
      1: '维修经验库',
      2: '设备知识',
      3: '设备资料',
      4: '规章制度',
    };
    return dict[deviceStatus as keyof typeof dict] || '';
  };
  const listImg = [
    '/static/images/knowledge/lunbo.png',
    '/static/images/knowledge/lunbo.png',
    '/static/images/knowledge/lunbo.png',
    '/static/images/knowledge/lunbo.png',
  ];

  const menu = [
    { name: '设备资料', icon: 'knowledge/icon1.png', url: '/pages/knowledge/deviceInformation/index' },
    { name: '维保经验库', icon: 'knowledge/icon2.png', url: '/pages/knowledge/fixExper/index' },
    { name: '规章制度', icon: 'knowledge/icon3.png', url: '/pages/knowledge/rulesRegulations/index' },
    { name: '设备知识', icon: 'knowledge/icon4.png', url: '/pages/knowledge/deviceKnow/index' },
  ];

  const tabsTitle = ref([
    { key: '1', title: '设备资料' },
    { key: '2', title: '维修经验库' },
    { key: '3', title: '规章制度' },
    { key: '4', title: '设备知识' },
  ]);
  // 点击头部tabs进行查询
  const tabsChange = (key: number) => {
    if (key == 1) {
      pageNum.value = 1;
      type.value = 3;
      deviceInformaArr.value = [];
      deviceKnowList();
    } else if (key == 2) {
      pageNum.value = 1;
      type.value = 1;
      deviceInformaArr.value = [];
      deviceKnowList();
    } else if (key == 3) {
      pageNum.value = 1;
      type.value = 4;
      deviceInformaArr.value = [];
      deviceKnowList();
    } else if (key == 4) {
      pageNum.value = 1;
      type.value = 2;
      deviceInformaArr.value = [];
      deviceKnowList();
    }
  };
  // 传入的请求参数
  let pageNum = ref(1);
  let pageSize = ref(10);
  let type = ref(3);
  let total = ref(); //总共的数据条数
  let deviceInformaArr = ref([] as any[]);
  let ifstatus = ref('more'); //显示正在加载还是没有更多数据
  let title = ref(); //搜索的内容
  let refresherTriggered = ref(); //下拉刷新
  // 查询设备资料列表
  const deviceKnowList = () => {
    const params = {
      pageNum: pageNum.value,
      pageSize: pageSize.value,
      type: type.value,
      title: title.value,
    };
    deviceKnow(params).then((res) => {
      if (res.rows?.length) {
        deviceInformaArr.value = [...deviceInformaArr.value, ...res.rows];
      }
      total.value = res.total;
      //判断是上拉加载更多还是正在加载
      if (deviceInformaArr.value.length < total.value) {
        ifstatus.value = 'more';
      } else {
        ifstatus.value = 'noMore';
      }
    });
    // .catch((err) => msg.value?.show({ model: 'error', text: err.msg }));
  };
  //滚动到底部触发
  const scrolltolower = () => {
    if (deviceInformaArr.value.length < total.value) {
      ifstatus.value = 'loading';
      pageNum.value++;
      deviceKnowList();
    } else {
      ifstatus.value = 'noMore';
    }
  };
  //跳转到详情
  const goDetial = (index: any) => {
    let data = deviceInformaArr.value[index];
    uni.navigateTo({
      url: '/pages/knowledge/deviceInformation/detail?data=' + JSON.stringify(data),
    });
  };
  const refresherrefresh = () => {
    refresherTriggered.value = true;
    pageNum.value = 1;
    deviceInformaArr.value = [];
    deviceKnowList();
    setTimeout(function () {
      refresherTriggered.value = false; //停止页面加载动画
    }, 1000);
  };
</script>

<template>
  <tm-app>
    <scroll-view
      class="uno-w-full uno-h-100vh uno-bg-white uno-relative"
      :scroll-top="0"
      scroll-y="true"
      @scrolltolower="scrolltolower"
      refresher-enabled="true"
      @refresherrefresh="refresherrefresh"
      :refresherTriggered="refresherTriggered"
    >
      <!-- 轮播图 -->
      <view class="uno-w-ful uno-h-272rpx uno-my-20rpx uno-px-22rpx">
        <tm-carousel :round="3" :width="700" :height="270" :list="listImg" model="dot" dotPosition="bottom" />
      </view>
      <!-- 金刚区 -->
      <view class="uno-w-full uno-flex uno-h-170rpx uno-mt-50rpx">
        <view
          class="uno-w-25% uno-h-full uno-flex uno-flex-col uno-items-center uno-justify-between"
          v-for="(item, index) in menu"
          :key="index"
          @click="router.push(item.url)"
        >
          <view class="uno-w-136rpx uno-h-136rpx">
            <image :src="getStaticImage(item.icon)" mode="scaleToFill" class="uno-w-full uno-h-full" />
          </view>
          <view class="uno-c-[#383838] uno-text-26rpx">{{ item.name }}</view>
        </view>
      </view>
      <view class="uno-w-full uno-h-24rpx uno-bg-[#F7F7F7] uno-mt-70rpx uno-mb-20rpx" />
      <!-- tab -->
      <tm-tabs
        :list="tabsTitle"
        :width="750"
        :height="100"
        :itemHeight="90"
        showTabsLineAni
        :item-width="150"
        :showTabsLine="false"
        activeFontColor="#333333"
        unSelectedColor="#686868"
        :itemRound="4"
        @change="tabsChange"
      />
      <!-- 列表 -->
      <view class="uno-w-full uno-my-30rpx uno-px-32rpx">
        <view
          class="uno-w-full uno-h-200rpx uno-border-b-2rpx uno-border-b-[#ECECEC] uno-border-b-solid"
          v-for="(item, index) in deviceInformaArr"
          :key="index"
          @click="goDetial(index)"
        >
          <view class="uno-flex uno-items-center uno-justify-between uno-mt-30rpx">
            <view class="uno-text-28rx uno-c-[#333333] title">{{ item.title }}</view>
            <view class="uno-px-10rpx uno-py-6rpx uno-bg-[#DEFCFF] uno-c-[#42BBC9] uno-text-24rpx flex-center">{{ deviceStatusDict(type) }}</view>
          </view>
          <view class="uno-text-24rpx uno-c-[#818181] uno-mt-20rpx" />
          <view class="uno-flex uno-items-center uno-justify-between uno-mt-30rpx">
            <view class="uno-w-38rpx uno-h-38rpx uno-rounded-50% uno-bg-blue uno-mr-20rpx" />
            <view class="uno-text-24rpx uno-c-[#818181] uno-mr-35rpx">{{ item.releaseByName }}</view>
            <view class="uno-c-[#B8B8B8] uno-text-24rpx uno-flex-1">发布于 {{ item.releaseTime }}</view>
            <!-- <view class="uno-text-24rpx uno-c-[#B8B8B8]">980人看过</view> -->
          </view>
        </view>
      </view>
      <!-- 添加按钮 -->
      <view
        class="uno-fixed uno-right-30rpx uno-bottom-60rpx uno-w-110rpx uno-h-110rpx uno-rounded-50% uno-bg-[#327DF1] shadow1 flex-center"
        @click="router.push('/pages/knowledge/add')"
      >
        <image src="/static/images/knowledge/add.png" mode="scaleToFill" class="uno-w-40rpx uno-h-40rpx" />
      </view>
      <tm-message ref="msg" width="auto" />
      <uni-load-more :status="ifstatus" iconType="auto" />
    </scroll-view>
  </tm-app>
</template>

<style lang="scss" scoped>
  .shadow1 {
    box-shadow: 0rpx 6rpx 15rpx 0rpx rgba(50, 125, 241, 0.35);
  }
  .title {
    width: 500rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }
</style>
