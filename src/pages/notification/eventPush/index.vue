<script setup lang="ts">
  import { ref } from 'vue';
  // import { noticeList, tacticsList } from '@/services/api/notice';
  import tmBadge from '@/tmui/components/tm-badge/tm-badge.vue';
  import tmMessage from '@/tmui/components/tm-message/tm-message.vue';
  import { eventInfo, sureHandle } from '@/services/api/auth';
  import { onLoad, onShow, onPullDownRefresh } from '@dcloudio/uni-app';
  const msg = ref<InstanceType<typeof tmMessage> | null>(null);
  const showResult = ref(false);
  let refrData = ref();
  const load = ref(true);
  let eventId = ref(); //判断是已读跳转还是待办跳转
  let itemUnFinStatus = ref(0); //未读
  let itemFinStatus = ref(1); //待办
  let eventInfoArr = ref([] as any[]); //查询未读或者待办的列表
  let showMore = ref(); //是否展示没有更多数据了
  onLoad((option) => {
    eventId.value = option?.eventId;
    if (eventId.value == 0) {
      eventInfoList();
    } else {
      uni.setNavigationBarTitle({
        title: '待办',
      });
      eventInfoList1();
    }
  });
  onShow(() => {
    //如果添加后跳转到index页面就不需要刷新
    uni.$on('refreshData', function (data) {
      refrData.value = data;
    });
    if (refrData.value == 1 && eventId.value == 0) {
      eventInfoArr.value = [];
      eventInfoList();
    } else if (refrData.value == 1 && eventId.value == 1) {
      eventInfoArr.value = [];
      eventInfoList1();
    }
  });
  //未读列表
  const eventInfoList = () => {
    eventInfo({
      itemStatus: itemUnFinStatus.value,
    }).then((res) => {
      eventInfoArr.value = res.rows;
      load.value = false;
      showMore.value = true;
      if (eventInfoArr.value.length == 0) {
        showResult.value = true;
        showMore.value = false;
      }
    });
  };
  //待办列表
  const eventInfoList1 = () => {
    eventInfo({
      itemStatus: itemFinStatus.value,
    }).then((res) => {
      eventInfoArr.value = res.rows;
      load.value = false;
      showMore.value = true;
      if (eventInfoArr.value.length == 0) {
        showResult.value = true;
        showMore.value = false;
      }
    });
  };
  // 下拉刷新
  onPullDownRefresh(() => {
    eventInfoArr.value = [];
    eventInfoList();
    setTimeout(function () {
      uni.stopPullDownRefresh(); //停止页面加载动画
    }, 1000);
  });
  //跳转消息详情页面
  const goInfoMess = (index: any) => {
    let id = eventInfoArr.value[index].id;
    let itemId = eventInfoArr.value[index].itemId;
    sureHandle({
      id: itemId,
      status: '1',
    }).then((res) => {
      console.log(res);
    });
    uni.navigateTo({
      url: '/pages/notification/notice/index?id=' + `${id}` + '&data=' + JSON.stringify(eventInfoArr.value[index]),
    });
  };
</script>

<template>
  <view>
    <view
      class="uno-w-full uno-h-110rpx uno-px-40rpx uno-flex uno-mt-50rpx uno-mb-80rpx"
      @click="goInfoMess(index)"
      v-for="(item, index) in eventInfoArr"
      :key="index"
    >
      <tm-badge dot color="red" v-if="item.itemStatus != '2'">
        <view class="uno-w-110rpx uno-h-110rpx uno-rounded-20rpx uno-bg-[#FAFBFC] uno-border-2rpx uno-border-[#F2F2F2] flex-center">
          <image src="https://doctorapi.94lihai.com/images/img5.png" mode="scaleToFill" class="uno-w-84rpx uno-h-84rpx" />
        </view>
      </tm-badge>
      <tm-badge color="red" v-else>
        <view class="uno-w-110rpx uno-h-110rpx uno-rounded-20rpx uno-bg-[#FAFBFC] uno-border-2rpx uno-border-[#F2F2F2] flex-center">
          <image src="https://doctorapi.94lihai.com/images/img5.png" mode="scaleToFill" class="uno-w-84rpx uno-h-84rpx" />
        </view>
      </tm-badge>

      <view class="uno-flex-1 uno-mx-30rpx">
        <view class="uno-c-[#333333] uno-text-30 uno-leading-50rpx uno-font-600 title">{{ item.title }}</view>
        <view class="uno-c-[#797979] uno-text-23 uno-mt-10rpx system-messages">{{ item.content }}</view>
      </view>
      <view>
        <view class="uno-c-[#797979] uno-text-23 uno-mt-10rpx">{{ item.createDate }}</view>
        <view>
          <span class="uno-c-[#797979] uno-text-23 uno-mt-10rpx" v-if="item.itemStatus === '2'">已办</span>
          <span class="uno-c-[#797979] uno-text-23 uno-mt-10rpx" v-if="item.itemStatus === '0' && item.needDeal === 'Y'">未读&nbsp;待办</span>
          <span class="uno-c-[#797979] uno-text-23 uno-mt-10rpx" v-if="item.itemStatus === '0' && item.needDeal === 'N'">未读</span>
          <span class="uno-c-[#797979] uno-text-23 uno-mt-10rpx" v-if="item.itemStatus === '1' && item.needDeal === 'Y'">待办</span>
        </view>
      </view>
    </view>

    <!-- <view class="uno-w-full uno-h-110rpx uno-px-40rpx uno-flex" @click="router.push('/pages/notification/eventPush/index')">
      <tm-badge :dot="tactics.flag === 1" color="red">
        <view class="uno-w-110rpx uno-h-110rpx uno-rounded-20rpx uno-bg-[#FAFBFC] uno-border-2rpx uno-border-[#F2F2F2] flex-center">
          <image src="https://doctorapi.94lihai.com/images/img4.png" mode="scaleToFill" class="uno-w-84rpx uno-h-84rpx" />
        </view>
      </tm-badge>
      <view class="uno-flex-1 uno-mx-30rpx">
        <view class="uno-c-[#333333] uno-text-30 uno-leading-50rpx uno-font-600">事件推送</view>
        <view class="uno-c-[#797979] uno-text-23 uno-mt-10rpx event-push">
          {{ '平台策略平台策略平台策略平台策略`)' }}
        </view>
      </view>
      <view>
        <view class="uno-c-[#797979] uno-text-23 uno-mt-10rpx">{{ '2023/03/03' }}</view>
      </view>
    </view> -->
    <uni-load-more status="没有更多数据了" v-if="showMore" iconType="auto" />
    <view v-if="showResult" style="margin-top: 30%">
      <tm-result :showBtn="false" title="暂无数据" subTitle="" />
    </view>
    <tm-spin :load="load" v-if="load" tip="正在加载，耐心等待。。。" style="margin-top: 100rpx" />
    <tm-message ref="msg" width="auto" />
  </view>
</template>

<style lang="scss" scoped>
  .system-messages {
    width: 315rpx;
    font-size: 23rpx;
    color: #797979;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }
  .event-push {
    width: 315rpx;
    font-size: 23rpx;
    color: #797979;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }
  .title {
    width: 300rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }
</style>
