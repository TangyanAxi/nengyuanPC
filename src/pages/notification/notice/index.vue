<script setup lang="ts">
  import { ref } from 'vue';
  import { onLoad, onBackPress } from '@dcloudio/uni-app';
  // import { router } from '@/utils/router';
  // import { noticeList } from '@/services/api/notice';
  import tmMessage from '@/tmui/components/tm-message/tm-message.vue';
  import { addPer, notify, sureHandle } from '@/services/api/auth';
  const msg = ref<InstanceType<typeof tmMessage> | null>(null);

  onLoad((option) => {
    id.value = option?.id;
    data.value = JSON.parse(option?.data);
    addPers();
    notifyList();
  });
  // 添加人的Picker列表
  let addPres = ref([]);
  let id = ref(); //消息事件id
  let data = ref(); //消息事件id
  let isClick = ref(true); //消息事件id
  const formData = ref({
    title: '', //消息标题
    addPres: '', //添加人
    addPresId: [], //添加人Id
    info: '', //消息信息
    switch: true, //开关
  });
  // 查询添加人
  const addPers = () => {
    addPer({}).then((res) => {
      addPres.value = res.rows.map((item: { nickName: string; userId: number }) => {
        return {
          text: item.nickName,
          id: item.userId,
        };
      });
    });
  };
  //查询事件详情
  const notifyList = () => {
    notify(id.value).then((res) => {
      console.log(res);
      let data = res.data;
      formData.value.title = data.title;
      formData.value.info = data.content;
      formData.value.addPresId = data.sendBy;
      formData.value.switch = data.needDeal == 'Y' ? true : false;
    });
  };
  //点击左上角返回
  onBackPress(() => {
    uni.$emit('refreshData', 1);
  });

  // 表单提交
  const confirm = (formData: any) => {
    console.log(formData);
    if (isClick.value) {
      sureHandle({
        id: data.value.itemId,
        status: 2,
      })
        .then((res) => {
          if (res.code == 200) {
            msg.value?.show({ model: 'success', text: '办理成功' });
            setTimeout(() => {
              uni.$emit('refreshData', 1);
              uni.navigateBack({
                delta: 1,
              });
            }, 1000);
          } else {
            msg.value?.show({ model: 'error', text: '失败成功' });
          }
        })
        .catch((err) => msg.value?.show({ model: 'error', text: err.msg }));
      setTimeout(() => {
        isClick.value = true;
      }, 1000);
    }
  };
</script>

<template>
  <tm-app ref="app" color="grey-5">
    <view class="header-space" />
    <tm-form @submit="confirm" ref="form" v-model="formData" :label-width="190" style="margin: 0%" layout="vertical">
      <tm-form-item label="标题" field="title">
        <!-- 不要问我为什么用v-model.lazy，我很受伤。 -->
        <tm-input disabled :inputPadding="[0, 0]" v-model.lazy="formData.title" :transprent="true" :showBottomBotder="false" />
      </tm-form-item>
      <!-- 责任人 -->
      <tm-form-item label="发送人" field="addPres">
        <view class="flex flex-row flex-row-center-between">
          <tm-text :userInteractionEnabled="false" :label="formData.addPres || '请选择发送人'" style="margin-left: 26rpx; width: 400rpx" />
          <!-- <tm-button @click="showPer = !showPer" :margin="[10]" :shadow="0" text size="normal" outlined label="添加人" /> -->
        </view>
      </tm-form-item>
      <tm-form-item label="发送内容" field="title">
        <!-- 不要问我为什么用v-model.lazy，我很受伤。 -->
        <tm-input disabled :inputPadding="[0, 0]" v-model.lazy="formData.info" :transprent="true" :showBottomBotder="false" />
      </tm-form-item>
      <tm-form-item label="需要办理" field="switch">
        <tm-switch disabled v-model="formData.switch" :default-value="formData.switch" :selected="true" />
      </tm-form-item>
      <tm-form-item :border="false">
        <view class="flex flex-row">
          <view class="flex-1 mr-32">
            <tm-button color="green" form-type="submit" label="已办理" block />
          </view>
        </view>
      </tm-form-item>
    </tm-form>
    <!-- 责任人 -->
    <tm-picker v-model="formData.addPresId" :columns="addPres" selectedModel="id" v-model:model-str="formData.addPres" />
    <tm-message ref="msg" width="auto" />
  </tm-app>
</template>

<style lang="scss">
  page {
    background-color: #f8f9fb;
  }
</style>
