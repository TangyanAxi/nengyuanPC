<script setup lang="ts">
  import { ref } from 'vue';
  import tmApp from '@/tmui/components/tm-app/tm-app.vue';
  import tmMessage from '@/tmui/components/tm-message/tm-message.vue';
  import tmInput from '@/tmui/components/tm-input/tm-input.vue';
  import tmSheet from '@/tmui/components/tm-sheet/tm-sheet.vue';
  import { onShow, onNavigationBarButtonTap } from '@dcloudio/uni-app';
  import { deviceKnow } from '@/services/api/auth';

  const msg = ref<InstanceType<typeof tmMessage> | null>(null);

  onShow(() => {
    pageNum.value = 1;
    deviceInformaArr.value = [];
    deviceKnowList();
  });
  // 传入的请求参数
  let pageNum = ref(1);
  let pageSize = ref(10);
  let type = ref(4);
  let total = ref(); //总共的数据条数
  let deviceInformaArr = ref([] as any[]);
  let ifstatus = ref('more'); //显示正在加载还是没有更多数据
  let title = ref(); //搜索的内容
  let refresherTriggered = ref(); //下拉刷新
  //点击跳转+的方法
  onNavigationBarButtonTap(() => {
    uni.navigateTo({
      url: '/pages/knowledge/rulesRegulations/addRegulations',
    });
  });

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
  //失去焦点是触发搜索
  const blurSearch = (e: any) => {
    pageNum.value = 1;
    deviceInformaArr.value = [];
    title.value = e.detail.value;
    deviceKnowList();
  };

  const search = ref('');
  //跳转到详情
  const goDetial = (index: any) => {
    let data = deviceInformaArr.value[index];
    uni.navigateTo({
      url: '/pages/knowledge/rulesRegulations/detail?data=' + JSON.stringify(data),
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
      class="uno-w-full uno-h-100vh"
      :scroll-top="0"
      scroll-y="true"
      @scrolltolower="scrolltolower"
      refresher-enabled="true"
      @refresherrefresh="refresherrefresh"
      :refresherTriggered="refresherTriggered"
    >
      <!-- 筛选 -->
      <view>
        <tm-sheet style="margin: 0; height: 120rpx; margin-top: 2rpx; display: flex; justify-content: flex-start">
          <tm-input
            style="width: 650rpx; margin-left: 30rpx"
            v-model="search"
            :round="10"
            prefix="/static/images/index/search.png"
            showClear
            showTabsLineAni
            placeholder="请输入搜索标题"
            @blur="blurSearch"
          />
          <!-- <view style="display: flex; margin: -50rpx 40rpx 0rpx 0rpx; justify-content: flex-end !important; text-align: center">
            <view style="width: 31rpx; height: 31rpx">
              <image style="width: 31rpx; height: 31rpx" src="/static/images/index/screen.png" mode="scaleToFill" />
            </view>
            <view style="margin-left: 30rpx; margin-top: -4rpx; font-size: 27rpx; color: #333333; line-height: 42rpx">筛选</view>
          </view> -->
        </tm-sheet>
      </view>
      <!-- 列表 -->
      <view class="uno-w-full uno-my-20rpx uno-px-32rpx uno-pt-1rpx uno-pb-10rpx uno-bg-white">
        <view
          class="uno-w-full uno-h-190rpx uno-border-b-2rpx uno-border-b-[#ECECEC] uno-border-b-solid uno-mt-50rpx last:uno-border-b-0"
          v-for="(item, index) in deviceInformaArr"
          :key="index"
          @click="goDetial(index)"
        >
          <view class="uno-flex uno-items-center uno-justify-between">
            <view class="uno-text-28rx uno-c-[#333333]">{{ item.title }}</view>
            <view class="uno-px-10rpx uno-py-6rpx uno-bg-[#DEFCFF] uno-c-[#42BBC9] uno-text-24rpx flex-center">规章制度</view>
          </view>
          <view class="uno-text-24rpx uno-c-[#818181] uno-mt-60rpx" />
          <view class="uno-flex uno-items-center uno-justify-between uno-mt-30rpx">
            <view class="uno-w-38rpx uno-h-38rpx uno-rounded-50% uno-bg-blue uno-mr-20rpx" />
            <view class="uno-text-24rpx uno-c-[#818181] uno-mr-35rpx">{{ item.releaseByName }}</view>
            <view class="uno-c-[#B8B8B8] uno-text-24rpx uno-flex-1">时间 {{ item.releaseTime }}</view>
            <!-- <view class="uno-text-24rpx uno-c-[#B8B8B8]">980人看过</view> -->
          </view>
        </view>
      </view>
      <tm-message ref="msg" width="auto" />
      <uni-load-more :status="ifstatus" iconType="auto" />
    </scroll-view>
  </tm-app>
</template>
