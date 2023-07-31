<script setup lang="ts">
  import { ref } from 'vue';
  import { useNavBar } from '@/hooks/useNavBar';
  import { router } from '@/utils/router';
  import { getStaticImage } from '@/utils';
  import { onLoad } from '@dcloudio/uni-app';
  import { eventInfo, userMess } from '@/services/api/auth';
  import tmApp from '@/tmui/components/tm-app/tm-app.vue';
  import tmMessage from '@/tmui/components/tm-message/tm-message.vue';
  import { useAuthStore } from '@/state/modules/auth';
  const msg = ref<InstanceType<typeof tmMessage> | null>(null);
  const baseUrl = import.meta.env.VITE_IMAGE_URL;
  // const baseUrl = import.meta.env.VITE_IMAGE_URL;
  onLoad(() => {
    eventInfoList();
    eventInfoList1();
    userMessList();
    eventInfoAll();
  });
  // 下拉刷新
  const refresherrefresh = () => {
    userMessArr.value = [];
    total0.value = '';
    total1.value = '';
    totalAll.value = '';
    eventInfoList();
    eventInfoList1();
    userMessList();
    eventInfoAll();
    refresherTriggered.value = true;
    setTimeout(function () {
      refresherTriggered.value = false; //停止页面加载动画
    }, 1000);
  };
  const { navBarTop } = useNavBar();
  let itemUnFinStatus = ref(0);
  let itemFinStatus = ref(1);
  let total0 = ref();
  let total1 = ref();
  let totalAll = ref(); //全部消息显示角标
  let userMessArr = ref([] as any[]);
  let transprent = ref(true); //是否显示角标
  let refresherTriggered = ref(); //下拉刷新
  let roleGroup = ref(); //用户角色
  let deAvatarImage = ref('/profile/avatar/defAvatar.png'); //设置默认图片
  const eventInfoList = () => {
    eventInfo({
      itemStatus: itemUnFinStatus.value,
    }).then((res) => {
      total0.value = res.total;
    });
  };
  //全部消息
  const eventInfoAll = () => {
    eventInfo({}).then((res) => {
      totalAll.value = res.total;
      if (totalAll.value != 0) {
        transprent.value = false;
      }
    });
  };
  const eventInfoList1 = () => {
    eventInfo({
      itemStatus: itemFinStatus.value,
    }).then((res) => {
      total1.value = res.total;
    });
  };
  const userMessList = () => {
    userMess({}).then((res) => {
      roleGroup.value = res.roleGroup;
      userMessArr.value.push(res.data);
    });
  };
  const goIndex = (index: any) => {
    switch (index) {
      case 0:
        uni.navigateTo({
          url: '/pages/me/setting',
        });
        break;
      case 1:
        uni.navigateTo({
          url: '/pages/me/serviceHelp',
        });
        break;
      case 2:
        // uni.navigateTo({
        //   url: '/pages/me/serviceHelp',
        // });
        break;
      case 3:
        uni.navigateTo({
          url: '/pages/me/about',
        });
        break;
      case 4:
        // eslint-disable-next-line no-case-declarations
        const authStore = useAuthStore();
        authStore
          .loginOut()
          .then(() => {
            msg.value?.show({ model: 'success', text: '退出成功' });
            setTimeout(() => {
              uni.reLaunch({ url: '/pages/login/index' });
            }, 1500);
          })
          .catch((err) => msg.value?.show({ model: 'error', text: err.msg }));
        break;
    }
  };
  const eventMess = (e: number) => {
    if (e == 0) {
      uni.navigateTo({
        url: '/pages/notification/eventPush/index?eventId=' + 0,
      });
    } else {
      uni.navigateTo({
        url: '/pages/notification/eventPush/index?eventId=' + 1,
      });
    }
  };
  const menu = [
    { name: '设置', icon: 'me/icon1.png', url: '/pages/me/setting', width: 41, height: 38 },
    { name: '帮助与客服', icon: 'me/icon2.png', url: '/pages/me/setting', width: 40, height: 40 },
    { name: '版本更新', icon: 'me/icon3.png', url: '/pages/me/setting', width: 36, height: 40 },
    { name: '关于', icon: 'me/icon4.png', url: '/pages/me/about', width: 40, height: 40 },
    { name: '退出', icon: 'me/icon5.png', url: '/pages/me/about', width: 43, height: 36 },
  ];
</script>

<template>
  <tm-app>
    <scroll-view
      class="uno-w-full uno-h-100vh"
      :scroll-top="0"
      scroll-y="true"
      refresher-enabled="true"
      @refresherrefresh="refresherrefresh"
      :refresherTriggered="refresherTriggered"
    >
      <!-- v-for="(item, index) in userMessArr" :key="index" -->
      <view class="uno-w-full uno-h-620rpx bg1 uno-px-34rpx" :style="{ paddingTop: `${navBarTop}px` }">
        <view class="uno-flex uno-items-center uno-justify-between uno-w-full uno-h-80rpx">
          <view class="uno-text-42rpx uno-c-[#333]">我的</view>
          <!-- <view @click="router.push('/pages/notification/index')">
            <image src="@/static/images/me/message.png" mode="scaleToFill" class="uno-w-37rpx uno-h-34rpx" />
          </view> -->
          <tm-badge color="red" dot :transprent="transprent" :top="-4" :right="-4">
            <view @click="router.push('/pages/notification/index')">
              <image src="@/static/images/me/message.png" mode="scaleToFill" class="uno-w-37rpx uno-h-37rpx" />
            </view>
          </tm-badge>
        </view>
        <!-- 个人信息 -->
        <view
          class="uno-w-full uno-h-134rpx uno-flex uno-justify-between uno-mt-40rpx"
          @click="router.push('/pages/me/userInfo')"
          v-for="(item, index) in userMessArr"
          :key="index"
        >
          <view class="uno-w-117rpx uno-h-117rpx uno-rounded-50%">
            <image
              :src="`${baseUrl}${item.avatar == null || item.avatar == '' ? deAvatarImage : item.avatar}`"
              mode="scaleToFill"
              class="uno-w-117rpx uno-h-117rpx uno-rounded-50%"
            />
          </view>
          <view class="uno-flex-1 uno-ml-40rpx">
            <view class="uno-text-32rpx uno-c-[#333] uno-font-600">{{ item.nickName }}</view>
            <view class="uno-mt-10rpx uno-text-24rpx uno-c-[#888888]">ID: {{ item.userId }}</view>
            <view class="admin uno-mt-10rpx flex-center">{{ roleGroup == null ? '未知' : roleGroup }}</view>
          </view>
          <view class="uno-h-full flex-center">
            <image src="@/static/images/advance.png" mode="scaleToFill" class="uno-w-13rpx uno-h-24rpx" />
          </view>
        </view>

        <!-- 事件统计 -->
        <view class="uno-w-full uno-h-219rpx uno-rounded-20rpx uno-bg-[rgba(255,255,255,0.7)] uno-mt-50rpx uno-pt-1rpx">
          <view class="uno-w-full flex-center uno-my-25rpx">
            <view class="line1" />
            <view class="uno-mx-20rpx uno-c-[#8AA1B6] uno-text-24rpx">事件统计</view>
            <view class="line2" />
          </view>
          <view class="uno-w-full flex-center">
            <view class="uno-w-49% uno-text-center" @click="eventMess(0)">
              <view class="uno-text-46rpx uno-font-bold uno-c-[#5780FF] Ebrima">{{ total0 }}</view>
              <view class="uno-text-26rpx uno-c-[#545454]">未读</view>
            </view>
            <view class="uno-w-2rpx uno-h-44rpx uno-bg-[#E7E7E7]" />
            <view class="uno-w-49% uno-text-center" @click="eventMess(1)">
              <view class="uno-text-46rpx uno-font-bold uno-c-[#5780FF] Ebrima">{{ total1 }}</view>
              <view class="uno-text-26rpx uno-c-[#545454]">待办</view>
            </view>
          </view>
        </view>
      </view>
      <view class="uno-w-full uno-h-[calc(100vh-550rpx)] uno-bg-white uno-rounded-t-30rpx uno-mt--70rpx uno-px-50rpx uno-py-20rpx shadow1">
        <!-- 设置 -->
        <view class="uno-w-full uno-flex uno-justify-between uno-items-center uno-py-40rpx" v-for="(item, index) in menu" :key="index" @click="goIndex(index)">
          <view class="uno-flex uno-items-center">
            <image :src="getStaticImage(item.icon)" mode="scaleToFill" :style="{ width: `${item.width}rpx`, height: `${item.height}rpx` }" />
            <view class="uno-ml-30rpx">{{ item.name }}</view>
          </view>
          <view class="uno-flex uno-items-center">
            <image src="@/static/images/advance.png" mode="scaleToFill" class="uno-w-13rpx uno-h-24rpx" v-if="index !== 4" />
          </view>
        </view>
      </view>
      <tm-message ref="msg" width="auto" />
    </scroll-view>
  </tm-app>
</template>

<style lang="scss" scoped>
  .shadow1 {
    box-shadow: 0rpx 0rpx 22rpx 0rpx rgba(110, 169, 226, 0.18);
  }
  .line1 {
    width: 30%;
    height: 1rpx;
    background: linear-gradient(90deg, #ffffff 0%, #428cd3 100%);
    opacity: 0.5;
  }
  .line2 {
    width: 30%;
    height: 1rpx;
    background: linear-gradient(90deg, #428cd3 0%, #ffffff 100%);
    opacity: 0.5;
  }
  .Ebrima {
    font-family: Ebrima;
  }
  .bg1 {
    background-image: url('/static/images/me/bg1.png');
    background-size: 100% 100%;
  }
  .admin {
    width: 140rpx;
    height: 36rpx;
    background: linear-gradient(90deg, #ff8022 0%, #ffb232 100%);
    border-radius: 5rpx 18rpx 18rpx 18rpx;
    font-size: 23rpx;
    font-weight: 500;
    color: #ffffff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }
</style>
