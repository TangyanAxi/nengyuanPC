<template>
  <view class="uno-w-full">
    <view class="uno-w-full uno-h-280rpx uno-mt-4rpx uno-bg-white uno-pl-32rpx">
      <view class="uno-w-full uno-h-156rpx uno-border-b-1rpx uno-border-[#ECECEC] uno-pr-32rpx">
        <view class="uno-w-full uno-h-full uno-flex uno-items-center uno-justify-between">
          <view class="uno-text-30rpx uno-c-[#333333]">头像</view>
          <view class="uno-flex uno-items-center uno-justify-center" @click="handleChooseImage">
            <image :src="avatarImgUrl" mode="scaleToFill" class="uno-w-98rpx uno-h-98rpx uno-rounded-50%" />
            <image src="/static/images/advance.png" mode="scaleToFill" class="uno-w-16rpx uno-h-26rpx uno-ml-24rpx" />
          </view>
        </view>
      </view>
      <view class="uno-w-full uno-h-123rpx uno-pr-32rpx">
        <view class="uno-w-full uno-h-full uno-flex uno-items-center uno-justify-between">
          <view class="uno-text-30rpx uno-c-[#333333]">昵称</view>
          <input
            @blur="exitUserName"
            class="uno-text-30rpx uno-c-[#828282] uno-mr-16rpx"
            align="right"
            v-model="userNickName"
            :maxlength="10"
            placeholder="请输入昵称"
            placeholder-class="input-placeholder"
          />
        </view>
      </view>
    </view>
    <kspCropper mode="fixed" :width="300" :height="400" :maxWidth="1024" :maxHeight="1024" :url="url" @cancel="oncancel" @ok="onok" />
    <tm-message ref="msg" width="auto" />
  </view>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { getCache } from '@/utils/catch';
  import { TOKEN_KEY } from '@/enums/cacheEnum';
  import { avatarImg, exitPhone, getInfo } from '@/services/api/auth';
  import { onLoad } from '@dcloudio/uni-app';
  import kspCropper from '@/components/ksp-cropper/ksp-cropper.vue';
  import tmMessage from '@/tmui/components/tm-message/tm-message.vue';
  const msg = ref<InstanceType<typeof tmMessage> | null>(null);
  // const userInfo = getCache('userInfo');
  const uploadImgUrl = ref(import.meta.env.VITE_UPLOAD_URL + '/common/upload'); // 上传的图片服务器地址
  let avatarImgUrl = ref();
  let userNickName = ref();
  let url = ref();
  onLoad(() => {
    getInfoList();
  });

  //获取用户昵称和头像
  const getInfoList = () => {
    getInfo({}).then((res) => {
      userNickName.value = res.user.nickName;
      // .replace(/\/profile/g, '')
      avatarImgUrl.value = import.meta.env.VITE_IMAGE_URL + res.user.avatar;
    });
  };
  function oncancel() {
    // url设置为空，隐藏控件
    url.value = '';
  }
  function onok(ev: { path: any; base64: any }) {
    url.value = '';
    avatarImgUrl.value = ev.path;
    uni.uploadFile({
      url: uploadImgUrl.value,
      filePath: avatarImgUrl.value, //要上传文件资源的路径。
      name: 'file',
      header: { Authorization: 'Bearer ' + getCache(TOKEN_KEY) },
      success: (res) => {
        let avatarfile = JSON.parse(res.data).fileName;
        avatarImg({
          avatar: avatarfile,
        })
          .then((res) => {
            if (res.code == 200) {
              msg.value?.show({ model: 'success', text: '修改成功' });
            } else {
              msg.value?.show({ model: 'success', text: '修改失败' });
            }
          })
          .catch((err) => msg.value?.show({ model: 'error', text: err.msg }));
      },
    });
  }
  const handleChooseImage = () => {
    uni.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      success: (res) => {
        // url.value = res.tempFilePaths[0];
        let tempFilePath = res.tempFilePaths;
        let filePath = tempFilePath[0];
        uni.uploadFile({
          url: uploadImgUrl.value,
          name: 'file',
          filePath: filePath, //要上传文件资源的路径。
          header: { Authorization: 'Bearer ' + getCache(TOKEN_KEY) },
          success: (res) => {
            let avatarfile = JSON.parse(res.data);
            url.value = avatarfile.url;
          },
        });
      },
    });
  };
  //修改昵称
  const exitUserName = () => {
    exitPhone({
      nickName: userNickName.value,
    })
      .then((res) => {
        if (res.code == 200) {
          msg.value?.show({ model: 'success', text: '修改成功' });
        } else {
          msg.value?.show({ model: 'success', text: '修改失败' });
        }
      })
      .catch((err) => msg.value?.show({ model: 'error', text: err.msg }));
  };
</script>

<style lang="scss">
  page {
    background-color: #f8f9fb;
  }
</style>
