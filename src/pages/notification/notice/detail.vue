<script lang="ts" setup>
  import { ref } from 'vue';
  // import { noticeDetail } from '@/services/api/notice';
  import tmMessage from '@/tmui/components/tm-message/tm-message.vue';
  import { onLoad } from '@dcloudio/uni-app';
  const msg = ref<InstanceType<typeof tmMessage> | null>(null);
  const detailId = ref<string>('');

  onLoad((query: any) => {
    detailId.value = query.id;
    getDetail();
  });

  const detailInfo = ref<any>({});
  const getDetail = () => {
    // noticeDetail(detailId.value)
    //   .then((res) => (detailInfo.value = res.data))
    //   .catch((err) => msg.value?.show({ model: 'error', text: err?.message }));
  };

  /**
   * 处理富文本里的图片宽度自适应
   * 1.去掉img标签里的style、width、height属性
   * 2.img标签添加style属性：max-width:100%;height:auto
   * 3.修改所有style里的width属性为max-width:100%
   * 4.去掉<br/>标签
   * @param html
   * @returns {void|string|*}
   */
  const formatRichText = (html: any) => {
    if (html) {
      //控制小程序中图片大小
      let newContent = html.replace(/<img[^>]*>/gi, function (match: string, _capture: any) {
        match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
        return match;
      });
      newContent = newContent.replace(/style="[^"]+"/gi, function (match: string, _capture: any) {
        match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
        return match;
      });
      newContent = newContent.replace(/<br[^>]*\/>/gi, '');
      newContent = newContent.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block;margin:10px auto;"');
      return newContent;
    }
  };
</script>

<template>
  <view class="content">
    <view class="info_box">
      <view class="info_top">
        <view>{{ detailInfo.title }}</view>
        <view class="top_bottom">
          <view>admin</view> <span>{{ detailInfo.created_at }}</span>
        </view>
      </view>
      <view class="info_content"><rich-text :nodes="formatRichText(detailInfo.content)" /></view> <view class="end">END</view>
    </view>
    <tm-message ref="msg" width="auto" />
  </view>
</template>

<style lang="scss" scoped>
  .content {
    margin-top: 2rpx;
  }
  .info_box {
    padding: 40rpx 31rpx 44rpx;
    background: white;
    .info_top {
      padding-bottom: 28rpx;
      border-bottom: 1rpx solid #e1e1e1;
      & > view:nth-child(1) {
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 45rpx;
      }
      & > .top_bottom {
        width: 100%;
        font-size: 24rpx;
        color: #737373;
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > view {
          display: flex;
          align-items: center;
          image {
            width: 50rpx;
            height: 50rpx;
            border-radius: 50%;
            margin-right: 20rpx;
          }
          span {
            font-size: 28rpx;
          }
        }
      }
    }
    .info_content {
      padding: 30rpx 0 54rpx;
      font-size: 28rpx;
      color: #737373;
    }
    .end {
      font-size: 28rpx;
      color: #cacaca;
      border-bottom: 1rpx solid #cacaca;
      text-align: center;
      width: 60rpx;
      margin: 0 auto;
    }
  }
</style>
