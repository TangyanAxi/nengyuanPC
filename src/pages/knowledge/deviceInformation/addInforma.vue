<template>
  <tm-app ref="app" color="grey-5">
    <view class="header-space" />
    <tm-form @submit="confirm" ref="form" v-model="formData" :label-width="190" style="margin: 0%" layout="vertical">
      <tm-form-item required label="设备类别" field="pickerStr" :rules="[{ required: true, message: '请选择设备类别' }]">
        <view @click="showPicker = !showPicker" class="flex flex-row flex-row-center-between uno-px-20rpx">
          <tm-text :userInteractionEnabled="false" :label="formData.pickerStr || '请选择设备类别'" />
          <tm-icon :userInteractionEnabled="false" :font-size="24" name="tmicon-angle-right" />
        </view>
      </tm-form-item>
      <tm-form-item required label="文件上传" field="wxFiles" :rules="[{ required: true, message: '请上传文件' }]">
        <view class="padding">
          <view>已选择文件列表：</view>
          <view v-for="(item, index) in formData.wxFiles" :key="index">
            <view style="display: flex">
              <view class="fileName">{{ item.name }}</view>
              <view style="margin-top: 8rpx; margin-left: 10rpx">{{ isNaN(Math.round(item.size / 1024000)) ? '' : Math.round(item.size / 1024000) }}KB</view>
            </view>
            <view style="display: flex">
              <view style="margin-top: 8rpx">{{ item.type == 'success' ? '上传成功' : '正在上传' }}</view>
              <view style="margin-top: 8rpx; margin-left: 30rpx">进度:{{ item.progress }}%</view>
              <text v-if="item.type == 'fail'" style="margin: 10rpx 0 0 30rpx; padding: 0 10rpx; border: 1rpx solid #007aff">重新上传</text>
              <text @click="clear(item.name)" style="margin: 10rpx 0 0 30rpx; padding: 0 10rpx; border: 1rpx solid #007aff">删除</text>
            </view>
            <!-- <view style="margin-left: 10rpx" v-if="item.responseText">服务端返回演示：{{ item.responseText }}</view> -->
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
        </view>
      </tm-form-item>
      <tm-form-item :border="false">
        <view class="flex flex-row">
          <view class="flex-1 mr-32">
            <tm-button form-type="submit" label="提交" block />
          </view>
        </view>
      </tm-form-item>
    </tm-form>
    <!-- 设备类型 -->
    <tm-picker
      :columns="pickerList"
      v-model:model-str="formData.pickerStr"
      v-model:show="showPicker"
      :default-value="formData.pickerIndex"
      v-model="formData.pickerIndex"
    />
    <tm-message ref="msg" width="auto" />
  </tm-app>
</template>

<script lang="ts" setup>
  import { ref, nextTick, getCurrentInstance, ComponentInternalInstance } from 'vue';
  import tmApp from '@/tmui/components/tm-app/tm-app.vue';
  import tmForm from '@/tmui/components/tm-form/tm-form.vue';
  import tmMessage from '@/tmui/components/tm-message/tm-message.vue';
  import UploadFile from '@/components/UploadFile/UploadFile.vue';
  import { onLoad } from '@dcloudio/uni-app';
  import { deviceManagementTabs, addKnowInfo } from '@/services/api/auth';
  import { getCache } from '@/utils/catch';
  import { TOKEN_KEY } from '@/enums/cacheEnum';
  const msg = ref<InstanceType<typeof tmMessage> | null>(null);
  const app = ref<InstanceType<typeof tmApp> | null>(null);
  const form = ref<InstanceType<typeof tmForm> | null>(null);

  onLoad(() => {
    tabs();
  });
  // 是否显示添加人的Picker列表
  const showPicker = ref(false);
  // 设备类型
  const pickerList = ref([]);
  //防止表单重复提交的节流操作
  let isClick = ref(true);
  const lsjUpload = ref();
  const width = ref('140rpx'); //上传的宽度
  const height = ref('80rpx'); //上传的高度
  const size = ref(30); // 文件上传大小限制
  const count = ref(1); // 文件数量限制
  const formats = ref('doc,docx,xls,xlsx,ppt,pptx,pdf'); // 限制允许上传的格式，空串=不限制，默认为空
  const debug = ref(true); // 是否打印日志
  const instantly = ref(true); // 选择文件后是否立即自动上传，true=选择后立即上传
  // 文件回显列表
  let files = ref();
  files.value = new Map();
  //记录文件选择列表删除时用
  let wxFilesArr = ref(new Map());
  const { proxy } = getCurrentInstance() as ComponentInternalInstance;
  let option = ref({
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
  });
  const formData = ref({
    pickerIndex: [] as any[], //设备类别的下标
    pickerStr: '', //设备类别
    wxFiles: [] as any[], //上传文件地址
  });
  // 查询设备类型
  const tabs = () => {
    deviceManagementTabs({}).then((res) => {
      pickerList.value = res.data.map((item: { dictLabel: String }, index: number) => {
        return {
          text: item.dictLabel,
          id: index + 1,
        };
      });
    });
  };
  // 文件选择回调
  const onChange = (files: { values: () => any; value: any }) => {
    console.log('当前选择的文件列表：', JSON.stringify([...files.values()]));
    // 更新选择的文件
    files.value = files;
    // 强制更新视图
    // that.$forceUpdate();
    proxy!.$forceUpdate();
    formData.value.wxFiles = [...files.value.values()];
    //为了删除时做一条记录
    wxFilesArr.value = files.value;

    // ---可删除--演示重新定位覆盖层控件
    nextTick(() => {
      // console.log('演示重新定位');
      lsjUpload.value.show();
    });
  };
  // 上传进度回调
  const onprogress = (item: { name: any }) => {
    // 更新当前状态变化的文件
    files.value.set(item.name, item);
    // console.log('打印对象', JSON.stringify(files.value.get(item.name)));
    //循环上传文件对象
    formData.value.wxFiles = [files.value.values()];
    // 强制更新视图
    proxy!.$forceUpdate();
  };
  // 某文件上传结束回调(成功失败都回调)
  function onuploadEnd(item: { [x: string]: any; name: any; type: any; responseText: string }) {
    // console.log(`${item.name}已上传结束，上传状态=${item.type}`);
    files.value = wxFilesArr.value;
    // 更新当前窗口状态变化的文件
    files.value.set(item.name, item);

    // ---可删除--演示上传完成后取服务端数据
    if (item['responseText']) {
      // console.log('演示服务器返回的字符串JSON转Object对象');
      files.value.get(item.name).responseText = JSON.parse(item.responseText);
    }

    formData.value.wxFiles = [...files.value.values()];
    // 强制更新视图
    // this.$forceUpdate();
    proxy!.$forceUpdate();

    // ---可删除--演示判断是否所有文件均已上传成功
    let isAll = [...files.value.values()].find((item) => item.type !== 'success');
    if (!isAll) {
      console.log('已全部上传完毕');
    } else {
      console.log(isAll.name + '待上传');
    }
  }
  // 移除某个文件
  function clear(name: any) {
    lsjUpload.value.clear(name);
  }
  //表单提交
  const confirm = (formData: any) => {
    console.log(formData);
    let url = formData.data.wxFiles.map((item: { responseText: { fileName: any } }) => {
      return [item.responseText.fileName];
    });
    if (isClick.value) {
      isClick.value = false;
      let data = formData.data;
      const fromParams = {
        category: data.pickerIndex[0] + 1,
        type: 3,
        url: url.join(url),
      };
      if (formData.validate) {
        addKnowInfo(fromParams)
          .then((res) => {
            if (res.code == 200) {
              msg.value?.show({ model: 'success', text: '添加成功' });
              setTimeout(() => {
                uni.navigateBack();
              }, 1000);
            } else {
              msg.value?.show({ model: 'error', text: '添加失败' });
            }
          })
          .catch((err) => msg.value?.show({ model: 'error', text: err.msg }));
      } else {
        msg.value?.show({ model: 'error', text: '请完善内容' });
      }
      setTimeout(() => {
        isClick.value = true;
      }, 1000);
    }
  };
</script>

<style lang="scss" scoped>
  .drawer-content {
    height: 100%;
    padding: 10rpx 16rpx;
    .list {
      width: 100%;
      margin-top: 18rpx;
      height: 900rpx;
      box-sizing: border-box;
      padding: 0 18rpx;
      .listitem {
        width: 100%;
        height: 100rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .listitem-left {
          font-size: 28rpx;
          color: #3a3a3a;
          .bank-active {
            color: #3b5cf0;
          }
        }
        .listitem-right {
          font-size: 28rpx;
          color: #6a6a6a;
        }
      }
    }
  }

  .header-space {
    width: 100%;
    height: 34rpx;
    background-color: #f7f7f7;
  }
  .space {
    width: 100%;
    height: 5rpx;
    background-color: rgb(250, 250, 250);
  }
  .header-middle {
    width: 100%;
    height: 87rpx;
    background-color: rgb(250, 250, 250);
    .device {
      font-weight: bold;
      font-size: 30rpx;
      line-height: 87rpx;
      margin-left: 20rpx;
    }
  }

  .header {
    // position: fixed;
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
  .fileName {
    margin-top: 8rpx;
    width: 500rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }

  .inputs {
    height: 100rpx;
    border-bottom: 1rpx solid #808080;
  }

  .padding {
    // padding-top: 30rpx;
    padding-left: 30rpx;
    padding-bottom: 20rpx;
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
