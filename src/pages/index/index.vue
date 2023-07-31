<script setup lang="ts">
  import { ref } from 'vue';
  // import { onShow } from '@dcloudio/uni-app';
  import { useNavBar } from '@/hooks/useNavBar';
  import { router } from '@/utils/router';
  import { getStaticImage } from '@/utils';
  import tmMessage from '@/tmui/components/tm-message/tm-message.vue';
  import tmApp from '@/tmui/components/tm-app/tm-app.vue';
  import { onLoad } from '@dcloudio/uni-app';
  import { deviceKnow, untreated } from '@/services/api/auth';
  const msg = ref<InstanceType<typeof tmMessage> | null>(null);
  const { navBarTop } = useNavBar();
  onLoad(() => {
    deviceKnowList();
    unTreated();
  });
  const menu = ref([
    { name: '设备管理', icon: 'index/icon1.png', url: '/pages/index/deviceManagement/index' },
    { name: '特种设备', icon: 'index/icon2.png', url: '/pages/index/specialDevice/index' },
    { name: '周期保养', icon: 'index/icon3.png', url: '/pages/index/deviceMaintain/index' },
    { name: '备品备件', icon: 'index/icon4.png', url: '/pages/index/spares/index' },
    { name: '设备结构树', icon: 'index/icon5.png', url: '/pages/index/deviceStructure/index' },
    { name: '设备盘点', icon: 'index/icon6.png', url: '/pages/index/deviceInventory/index' },
    { name: '设备事件', icon: 'index/icon7.png', url: '/pages/index/deviceEvent/index' },
    { name: '设备程序', icon: 'index/icon8.png', url: '/pages/index/deviceProcedure/index' },
  ]);
  function infoMore() {
    uni.navigateTo({
      url: '/pages/knowledge/deviceKnow/index',
    });
  }
  function goKonwWare() {
    pageNum.value = 1;
    deviceInformaArr.value = [];
    deviceKnowList();
  }
  // 传入的请求参数
  let pageNum = ref(1);
  let pageSize = ref(10);
  let type = ref(2);
  let total = ref(); //总共的数据条数
  let deviceInformaArr = ref([] as any[]);
  let ifstatus = ref(''); //显示正在加载还是没有更多数据
  let contentText = ref({
    contentdown: '暂无数据',
    contentnomore: '点击更多查看详细内容',
  }); //显示正在加载还是没有更多数据
  let title = ref(); //搜索的内容
  let untreatedArr = ref([] as any[]); //搜索的内容
  let untreatedTotla = ref(); //搜索的内容
  let refresherTriggered = ref(); //下拉刷新
  //查询设备维修多少未处理
  const unTreated = () => {
    untreated({}).then((res) => {
      res.data.map((item: { type: number }) => {
        if (item.type == 2) {
          return untreatedArr.value.push(item);
        }
      });
      untreatedTotla.value = untreatedArr.value.length;
    });
  };
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
        // deviceInformaArr.value = [...deviceInformaArr.value, ...res.rows];
        deviceInformaArr.value = res.rows.slice(0, 5);
      }
      total.value = res.total;
      if (total.value == 0) {
        ifstatus.value = 'more';
      } else if (total.value > 5) {
        ifstatus.value = 'noMore';
      } else if (total.value <= 5) {
        ifstatus.value = 'noMore';
        contentText.value.contentnomore = '暂无更多数据';
      }
      // //判断是上拉加载更多还是正在加载
      // if (deviceInformaArr.value.length < total.value) {
      //   ifstatus.value = 'more';
      // } else {
      //   ifstatus.value = 'noMore';
      // }
    });
    // .catch((err) => msg.value?.show({ model: 'error', text: err.msg }));
  };
  //滚动到底部触发
  // const scrolltolower = () => {
  //   if (deviceInformaArr.value.length < total.value) {
  //     ifstatus.value = 'loading';
  //     pageNum.value++;
  //     deviceKnowList();
  //   } else {
  //     ifstatus.value = 'noMore';
  //   }
  // };
  //跳转到详情
  const goDetial = (index: any) => {
    let data = deviceInformaArr.value[index];
    uni.navigateTo({
      url: '/pages/knowledge/deviceInformation/detail?data=' + JSON.stringify(data),
    });
  };
  const goMessageAll = () => {
    uni.navigateTo({
      url: '/pages/notification/index',
    });
  };
  //跳转到保养标准
  const devicMainStard = () => {
    uni.navigateTo({
      url: '/pages/index/deviceMainStandard/index',
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
  <tmApp>
    <!-- @scrolltolower="scrolltolower" -->
    <scroll-view
      class="uno-w-full uno-h-100vh uno-bg-white"
      :scroll-top="0"
      scroll-y="true"
      refresher-enabled="true"
      @refresherrefresh="refresherrefresh"
      :refresherTriggered="refresherTriggered"
    >
      <view class="uno-w-full uno-h-342rpx uno-px-25rpx bg1" :style="{ paddingTop: `${navBarTop}px` }">
        <!-- 顶部搜索 -->
        <view class="uno-w-full uno-h-110rpx uno-flex uno-items-center uno-justify-between uno-px-6rpx">
          <view>
            <image src="/static/images/index/logo.png" mode="scaleToFill" class="uno-w-64rpx uno-h-28rpx" />
          </view>
          <view class="uno-w-516rpx uno-h-70rpx uno-rounded-35rpx uno-bg-[#F2FAFF] uno-flex uno-items-center">
            <image src="/static/images/index/search.png" mode="scaleToFill" class="uno-w-26rpx uno-h-26rpx uno-ml-30rpx" />
            <input @blur="goKonwWare" v-model="title" class="uno-text-24rpx uno-c-[#A0BBD5] uno-ml-20rpx" placeholder="查找知识库" />
          </view>
          <view>
            <image src="/static/images/index/message.png" mode="scaleToFill" class="uno-w-26rpx uno-h-32rpx" />
          </view>
        </view>
      </view>
      <view class="uno-w-full uno-px-25rpx uno-mt--180rpx">
        <!-- 菜单 card -->
        <view class="uno-w-full uno-h-395rpx uno-rounded-30rpx uno-mt-20rpx shadow1 uno-flex uno-flex-wrap uno-justify-between uno-items-center uno-p-20rpx">
          <view
            class="uno-w-25% uno-h-120rpx uno-flex uno-flex-col uno-items-center uno-justify-between"
            v-for="(item, index) in menu"
            :key="index"
            @click="router.push(item.url)"
          >
            <view class="uno-w-75rpx uno-h-75rpx">
              <image :src="getStaticImage(item.icon)" mode="scaleToFill" class="uno-w-full uno-h-full" />
            </view>
            <view class="uno-text-25rpx uno-c-[#333]">{{ item.name }}</view>
          </view>
        </view>

        <!-- 报修/维修 -->
        <view class="uno-w-full uno-h-142rpx uno-flex uno-items-center uno-justify-between uno-mt-40rpx">
          <view
            class="uno-bg-[#EAF2FF] uno-rounded-20rpx uno-w-340rpx uno-h-full uno-flex uno-items-center"
            @click="router.push('/pages/index/deviceFix/index')"
          >
            <view class="uno-w-104rpx uno-h-110rpx uno-mx-10rpx">
              <image src="/static/images/index/icon9.png" mode="scaleToFill" class="uno-w-full uno-h-full" />
            </view>
            <view>
              <view class="uno-c-[#494949] uno-text-30rpx uno-font-bold">设备报修</view>
              <view class="uno-c-[#747474] uno-text-22rpx uno-mt-10rpx">{{ untreatedTotla }}项上报未处理</view>
            </view>
          </view>
          <view
            class="uno-bg-[#EAF2FF] uno-rounded-20rpx uno-w-340rpx uno-h-full uno-flex uno-items-center"
            @click="router.push('/pages/index/maintenancePlan/index')"
          >
            <view class="uno-w-97rpx uno-h-106rpx uno-mx-10rpx">
              <image src="/static/images/index/icon10.png" mode="scaleToFill" class="uno-w-full uno-h-full" />
            </view>
            <view>
              <view class="uno-c-[#494949] uno-text-30rpx uno-font-bold">维修计划</view>
              <view class="uno-c-[#747474] uno-text-22rpx uno-mt-10rpx">{{ untreatedTotla }}项上报未处理</view>
            </view>
          </view>
        </view>

        <!-- 通知 -->
        <view class="uno-w-full uno-h-74rpx uno-bg-white uno-mt-34rpx uno-rounded-10rpx notify-shadow" @click="goMessageAll">
          <image src="/static/images/index/notify.png" mode="scaleToFill" class="uno-w-144rpx uno-h-full" />
          <view
            style="
              margin-top: 16rpx;
              width: 488rpx;
              height: 23rpx;
              font-size: 24rpx;
              font-family: PingFang SC;
              font-weight: 500;
              color: #4e4e4e;
              line-height: 42rpx;
            "
            >点击查看所有消息通知！</view
          >
        </view>

        <!-- 科普 -->
        <view class="uno-w-full uno-h-140rpx uno-mt-48rpx" @click="devicMainStard">
          <image src="/static/images/index/banner.png" mode="scaleToFill" class="uno-w-full uno-h-full" />
        </view>
      </view>

      <!-- 知识库 -->
      <view class="uno-w-full uno-min-h-500rpx uno-mt-30rpx uno-border-t-20rpx uno-border-t-[#F7F7F7] uno-border-t-solid uno-p-32rpx">
        <view class="uno-flex uno-items-center uno-justify-between">
          <view class="uno-text-32rpx uno-c-black uno-flex uno-items-center">
            <image src="/static/images/index/icon11.png" mode="scaleToFill" class="uno-w-36rpx uno-h-32rpx uno-mr-20rpx" />
            <text>知识库</text>
          </view>
          <view class="uno-text-21rpx uno-c-[#909090] uno-flex uno-items-center" @click="infoMore">
            <text>更多</text>
            <image src="/static/images/index/arrow.png" mode="scaleToFill" class="uno-w-10rpx uno-h-18rpx uno-ml-14rpx" />
          </view>
        </view>
        <view
          class="uno-w-full uno-h-200rpx uno-border-b-2rpx uno-border-b-[#ECECEC] uno-border-b-solid"
          v-for="(item, index) in deviceInformaArr"
          :key="index"
          @click="goDetial(index)"
        >
          <view class="uno-flex uno-items-center uno-justify-between uno-mt-30rpx">
            <view class="uno-text-28rx uno-c-[#333333] title">{{ item.title }}</view>
            <view class="uno-px-10rpx uno-py-6rpx uno-bg-[#DEFCFF] uno-c-[#42BBC9] uno-text-24rpx flex-center">设备资料</view>
          </view>
          <view class="uno-text-24rpx uno-c-[#818181] uno-mt-20rpx" />
          <view class="uno-flex uno-items-center uno-justify-between uno-mt-30rpx">
            <view class="uno-w-38rpx uno-h-38rpx uno-rounded-50% uno-bg-blue uno-mr-20rpx" />
            <view class="uno-text-24rpx uno-c-[#818181] uno-mr-35rpx">{{ item.releaseByName }}</view>
            <view class="uno-c-[#B8B8B8] uno-text-24rpx uno-flex-1">发布于 {{ item.releaseTime }}</view>
            <!-- <view class="uno-text-24rpx uno-c-[#B8B8B8]">980人看过</view> -->
          </view>
        </view>
        <uni-load-more :status="ifstatus" iconType="auto" :contentText="contentText" />
      </view>
      <tm-message ref="msg" width="auto" />
    </scroll-view>
  </tmApp>
</template>

<style lang="scss" scoped>
  .bg1 {
    background: linear-gradient(0deg, rgba(213, 240, 255, 0) 0%, #b8d1ff 100%);
  }
  .shadow1 {
    background-color: #fff;
    box-shadow: 0rpx 5rpx 26rpx 0rpx rgba(141, 160, 207, 0.18);
  }
  .notify-shadow {
    box-shadow: -4rpx 4rpx 11rpx 0rpx rgba(141, 160, 207, 0.18);
    display: flex;
  }
  .title {
    width: 500rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }
</style>
