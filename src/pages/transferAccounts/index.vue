<template>
  <view class="content">
    <view style="background-color: #f8f8f8; width: 100%; height: 10px" />
    <view class="header">
      <view style="color: #00b590; width: 120px">查看转账列表</view>
    </view>
    <view class="warn">您承诺知悉且同意将您转账时使用的付款银行账户信息(如账户名、账号)授权于【创翔公司】知晓并用于转账收款查询，而无需再征得您的同意。</view>
    <div class="app-container" style="padding: 20px">
      <el-table :data="dataList" style="width: 100%" row-key="id" border lazy :load="load" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column prop="merid" label="商户id" :show-overflow-tooltip="true" />
        <el-table-column prop="name" label="转账金额" :show-overflow-tooltip="true" />
        <el-table-column prop="address" label="收款账户名称" :show-overflow-tooltip="true" />
        <el-table-column prop="address" label="订单收款账号" :show-overflow-tooltip="true" />
        <el-table-column prop="address" label="收款银行名称" :show-overflow-tooltip="true" />
        <el-table-column prop="address" label="收款银行网点号/分行" :show-overflow-tooltip="true" />
        <el-table-column prop="address" label="收款银行网点名称/分行名称" :show-overflow-tooltip="true" />
        <el-table-column prop="address" label="收款银行开户地" :show-overflow-tooltip="true" />
      </el-table>
    </div>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '@/state/modules/auth';
  import { selectBill } from '@/services/api/auth';
  import { onShow } from '@dcloudio/uni-app';

  onShow(() => {
    console.log(222);
    const authStore = useAuthStore();
    // payeeaccount.value = authStore.isBillMessage.payeeaccount;
    id.value = authStore.userinfo.id;
    selectBill({
      user_id: id.value,
      // payeeaccount: payeeaccount.value,
      payeeaccount: '220020952571000002744',
    }).then((res) => {
      console.log(res);
      dataList.value = res.data;
    });
  });
  // let payeeaccount = ref();
  let id = ref();
  let dataList = ref();
</script>

<style scoped>
  .content {
    width: 100vw;
    overflow-x: auto;
  }
  .content .header {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
  .warn {
    margin-top: 10px;
    width: 100%;
    text-align: center;
    line-height: 30px;
    color: #ef7216;
    /* white-space: nowrap; */
    background-color: #fffbe8;
    height: auto;
  }
</style>
