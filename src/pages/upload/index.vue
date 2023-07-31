<template>
  <view class="content">
    <view class="padding">
      <view>已选择文件列表：</view>
      <view v-for="(item, index) in files.values()" :key="index">
        <view>提示：【path主要用于图片视频类文件回显，他用自行处理】：{{ item.path }}</view>
        <view>{{ item.name }}</view>
        <view style="margin-left: 10rpx">大小：{{ item.size }}</view>
        <view style="margin-left: 10rpx">状态：{{ item.type }}</view>
        <view style="margin-left: 10rpx">进度：{{ item.progress }}</view>
        <view style="margin-left: 10rpx" v-if="item.responseText">服务端返回演示：{{ item.responseText }}</view>
        <text @click="resetUpload(item.name)" v-if="item.type == 'fail'" style="margin-left: 10rpx; padding: 0 10rpx; border: 1rpx solid #007aff"
          >重新上传</text
        >
        <text @click="clear(item.name)" style="margin-left: 10rpx; padding: 0 10rpx; border: 1rpx solid #007aff">删除</text>
      </view>
    </view>

    <view class="padding">
      <UploadFile
        ref="lsjUpload"
        childId="upload1"
        :width="width"
        :height="height"
        :option="option"
        :size="size"
        :count="count"
        :formats="formats"
        :debug="debug"
        :instantly="instantly"
        @change="onChange"
        @progress="onprogress"
        @uploadEnd="onuploadEnd"
      >
        <view class="btn" :style="{ width: width, height: height }">选择附件</view>
      </UploadFile>

      <view style="margin-top: 20rpx">
        <view @click="upload" class="btn" style="width: 100px; height: 100rpx">手动上传</view>
      </view>
    </view>
  </view>
</template>

<script>
  import UploadFile from '@/components/UploadFile/UploadFile.vue';
  import { getCache } from '@/utils/catch';
  import { TOKEN_KEY } from '@/enums/cacheEnum';
  export default {
    components: {
      UploadFile,
    },
    data() {
      return {
        // 上传接口参数
        option: {
          // 上传服务器地址，需要替换为你的接口地址
          url: import.meta.env.VITE_UPLOAD_URL + '/common/upload', // 该地址非真实路径，需替换为你项目自己的接口地址
          // 上传附件的key
          name: 'file',
          // 根据你接口需求自定义请求头,默认不要写content-type,让浏览器自适配
          // header: {
          //   // 示例参数可删除
          //   Authorization: 'bearer aa',
          //   uid: '27',
          //   accountid: '27',
          // },
          header: {
            // 示例参数可删除
            Authorization: 'Bearer ' + getCache(TOKEN_KEY),
          },
          // 根据你接口需求自定义body参数
          formData: {
            // 'orderId': 1000
          },
        },
        // 选择文件后是否立即自动上传，true=选择后立即上传
        instantly: true,
        // 必传宽高且宽高应与slot宽高保持一致
        width: '180rpx',
        height: '180rpx',
        // 限制允许上传的格式，空串=不限制，默认为空
        formats: '',
        // 文件上传大小限制
        size: 30,
        // 文件数量限制
        count: 2,
        // 是否多选
        multiple: true,
        // 文件回显列表
        files: new Map(),
        // 微信小程序Map对象for循环不显示，所以转成普通数组，不要问为什么，我也不知道
        wxFiles: [],
        // 是否打印日志
        debug: true,
      };
    },
    onReady() {
      setTimeout(() => {
        // console.log('----演示动态更新参数-----');
        // this.$refs['lsjUpload'+this.tabIndex].setData('formData.orderId','动态设置的参数');
        // console.log('以下注释内容为-动态更新参数更多演示，放开后可查看演示效果');
        // 修改option对象的name属性
        // this.$refs.lsjUpload.setData('name','myFile');
        // 修改option对象的formData内的属性
        // this.$refs.lsjUpload.setData('formData.appid','1111');
        // 替换option对象的formData
        // this.$refs.lsjUpload.setData('formData',{appid:'222'});
        // option对象的formData新增属性
        // this.$refs.lsjUpload.setData('formData.newkey','新插入到formData的属性');
        // ---------演示初始化值，用于已提交后再次编辑时需带入已上传文件-------
        // 方式1=传入数组
        // let files1 = [{name: '1.png'},{name: '2.png',}];
        // 方式2=传入Map对象
        // let files2 = new Map();
        // files2.set('1.png',{name: '1.png'})
        // 此处调用setFiles设置初始files
        // this.$refs.lsjUpload.setFiles(files1);
      }, 2000);
    },
    methods: {
      // 某文件上传结束回调(成功失败都回调)
      onuploadEnd(item) {
        console.log(`${item.name}已上传结束，上传状态=${item.type}`);
        // 更新当前窗口状态变化的文件
        this.files.set(item.name, item);

        // ---可删除--演示上传完成后取服务端数据
        if (item['responseText']) {
          console.log('演示服务器返回的字符串JSON转Object对象');
          this.files.get(item.name).responseText = JSON.parse(item.responseText);
        }

        // 微信小程序Map对象for循环不显示，所以转成普通数组，
        // 如果你用不惯Map对象，也可以像这样转普通数组，组件使用Map主要是避免反复文件去重操作
        // #ifdef MP-WEIXIN
        this.wxFiles = [...this.files.values()];
        // #endif

        // 强制更新视图
        this.$forceUpdate();

        // ---可删除--演示判断是否所有文件均已上传成功
        let isAll = [...this.files.values()].find((item) => item.type !== 'success');
        if (!isAll) {
          console.log('已全部上传完毕');
        } else {
          console.log(isAll.name + '待上传');
        }
      },
      // 上传进度回调
      onprogress(item) {
        // 更新当前状态变化的文件
        this.files.set(item.name, item);
        console.log('this.files');
        console.log(this.files);

        console.log('打印对象', JSON.stringify(this.files.get(item.name)));
        // 微信小程序Map对象for循环不显示，所以转成普通数组，不要问为什么，我也不知道
        // #ifdef MP-WEIXIN
        this.wxFiles = [...this.files.values()];
        // #endif

        // 强制更新视图
        this.$forceUpdate();
      },
      // 文件选择回调
      onChange(files) {
        console.log('当前选择的文件列表：', JSON.stringify([...files.values()]));
        // 更新选择的文件
        this.files = files;
        // 强制更新视图
        this.$forceUpdate();

        // 微信小程序Map对象for循环不显示，所以转成普通数组，不要问为什么，我也不知道
        // #ifdef MP-WEIXIN
        this.wxFiles = [...this.files.values()];
        // #endif

        // ---可删除--演示重新定位覆盖层控件
        this.$nextTick(() => {
          console.log('演示重新定位');
          this.$refs.lsjUpload.show();
        });
      },
      // 手动上传
      upload() {
        // name=指定文件名，不指定则上传所有type等于waiting和fail的文件
        this.$refs['lsjUpload'].upload();
      },
      // 指定上传某个文件
      resetUpload(name) {
        this.$refs['lsjUpload'].upload(name);
      },
      // 移除某个文件
      clear(name) {
        // name=指定文件名，不传name默认移除所有文件
        this.$refs['lsjUpload'].clear(name);
      },
      /**
       * ---可删除--演示在组件上方添加新内容DOM变化
       * DOM重排演示，重排后组件内部updated默认会触发show方法,若特殊情况未能触发updated也可以手动调用一次show()
       * 什么是DOM重排？自行百度去
       */
      add() {
        this.list.push('DOM重排测试');
        // App端如在自定义组件内使用则需要页面插入新内容后调用show()来重新定位
        // this.$nextTick(()=>{
        // 	this.$refs['lsjUpload'+this.tabIndex].show();
        // })
      },
    },
  };
</script>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 130rpx;
    line-height: 130rpx;
    text-align: center;
    font-size: 32rpx;
    background-color: #3f536e;
    color: #fff;
    z-index: 9999;
  }

  .content {
    padding-top: 130rpx;
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .inputs {
    height: 100rpx;
    border-bottom: 1rpx solid #808080;
  }

  .padding {
    padding-top: 30rpx;
    padding-left: 30rpx;
    padding-bottom: 50rpx;
  }

  .tab {
    display: flex;
    padding: 30rpx;
  }

  .tab view {
    height: 100rpx;
    line-height: 100rpx;
    flex: 1;
    text-align: center;
    border: 1rpx solid #2c405a;
  }

  .btn {
    height: 80rpx;
    background-color: #007aff;
    color: #fff;
    border-radius: 10rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
  }

  .ts {
    line-height: 2em;
  }

  .nbtn {
    margin: 100rpx 50rpx;
  }
</style>
