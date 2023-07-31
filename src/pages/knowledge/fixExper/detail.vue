<script setup lang="ts">
  import { ref } from 'vue';
  import tmApp from '@/tmui/components/tm-app/tm-app.vue';
  import tmMessage from '@/tmui/components/tm-message/tm-message.vue';
  import { onLoad } from '@dcloudio/uni-app';
  import { getCache } from '@/utils/catch';
  import { TOKEN_KEY } from '@/enums/cacheEnum';
  const msg = ref<InstanceType<typeof tmMessage> | null>(null);
  //点击下载
  let data = ref();
  let formData = ref([] as any[]);
  let failType = ref();
  let failTypeName = ref();
  const baseUrl = import.meta.env.VITE_IMAGE_URL;
  const headers = ref({ Authorization: 'Bearer ' + getCache(TOKEN_KEY) });
  let fileSrc = ref();
  const percent = ref(0);
  const percentVal = ref(0);
  const tmProgre = ref(false);
  onLoad((option) => {
    data.value = JSON.parse(option?.data);
    formData.value.push(data.value);
    fileSrc.value = baseUrl + data.value.url;
    failType.value = fileSrc.value.substr(fileSrc.value.lastIndexOf('.'));
    if (failType.value == '.pdf') {
      failTypeName.value = 'PDF文件';
    } else if (failType.value == '.mp4') {
      failTypeName.value = '视频文件';
    } else if (failType.value == 'docx' || failType.value == 'doc') {
      failTypeName.value = '文档';
    } else if (failType.value == 'avi') {
      failTypeName.value = '音频视频文件';
    } else if (failType.value == 'xls' || failType.value == 'lsx') {
      failTypeName.value = 'Excel';
    } else if (failType.value == 'ppt' || failType.value == 'pptx') {
      failTypeName.value = 'PPT';
    } else {
      failTypeName.value = '其他';
    }
  });
  const downLoad = () => {
    tmProgre.value = true;
    const downFail = uni.downloadFile({
      header: headers,
      url: fileSrc.value,
      success: (res) => {
        if (res.statusCode === 200) {
          //保存到本地
          let tempFIlePath = res.tempFilePath;
          uni.saveFile({
            tempFilePath: tempFIlePath,
            success: (res) => {
              //res.savedFilePath文件的保存路径
              //保存成功并打开文件
              uni.openDocument({
                filePath: res.savedFilePath,
                success: (_res) => msg.value?.show({ model: 'success', text: '下载成功' }),
              });
            },
            fail: () => msg.value?.show({ model: 'error', text: '下载失败' }),
          });
        } else {
          msg.value?.show({ model: 'error', text: '下载失败' });
        }
      },
    });
    downFail.onProgressUpdate((res) => {
      percent.value = res.progress;
      if (percent.value == 100) {
        tmProgre.value = false;
      }
      if (percentVal.value == 101) {
        downFail.abort();
        tmProgre.value = false;
      }
    });
  };
  const close = () => {
    percentVal.value = 101;
  };
</script>

<template>
  <tm-app>
    <view class="uno-w-full uno-h-100vh">
      <view class="uno-w-full uno-bg-white uno-px-33rpx uno-pt-1rpx" v-for="(item, index) in formData" :key="index">
        <view class="uno-text-36rpx uno-c-[#363636] uno-font-bold uno-mt-30rpx title">{{ item.title }}</view>
        <view class="uno-w-full uno-h-74rpx uno-flex uno-justify-between uno-mt-30rpx">
          <view class="uno-w-70%">
            <view class="uno-flex">
              <view class="uno-c-[#414141] uno-text-24rpx uno-mr-40rpx">{{ item.releaseByName }}</view>
              <view class="uno-c-[#939393] uno-text-24rpx"
                >发布于 <text class="uno-c-[#414141]">{{ item.releaseTime }}</text></view
              >
            </view>
            <view class="uno-c-[#939393] uno-text-24rpx uno-mt-10rpx"
              >类型 <text class="uno-c-[#414141]">{{ failTypeName }}</text></view
            >
          </view>
          <view class="uno-w-192rpx uno-h-64rpx uno-bg-[#FFAD39] flex-center uno-rounded-5rpx">
            <image src="/static/images/down.png" mode="scaleToFill" class="uno-w-27rpx uno-h-27rpx uno-align-middle" />
            <view class="uno-text-24rpx uno-c-white uno-ml-10rpx" @click="downLoad">下载文档</view>
          </view>
        </view>
        <view class="uno-w-full uno-h-1rpx uno-bg-[#EBECEF] uno-mt-100rpx" />
        <view class="progress" v-if="tmProgre">
          <p>下载进度</p>
          <tm-progress linear="right" :width="636" color="orange" v-model:percent="percent" />
          <view style="float: right">
            <tm-button :margin="[10]" color="red" size="small" :shadow="0" label="取消" @click="close" />
          </view>
        </view>
        <!-- <tm-html :content="rx" style="margin-top: 30rpx" /> -->
        <!-- <view style="height: 200rpx; width: 500rpx">
          <web-view :webview-styles="webviewStyles" :src="fileSrc" />
        </view> -->
      </view>
      <tm-message ref="msg" width="auto" />
    </view>
  </tm-app>
</template>

<style lang="scss" scoped>
  .title {
    width: 500rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }
  .progress {
    height: 160rpx;
    background-color: rgba(255, 255, 255, var(--un-bg-opacity));
    margin-top: 20rpx;
    text-align: center;
  }
</style>
