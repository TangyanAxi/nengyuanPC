<template>
  <view class="content">
    <view style="background-color: #f8f8f8; width: 100%; height: 10px" />
    <view class="header">
      <view style="color: #00b590; width: 120px">查看转账列表</view>
    </view>
    <view class="warn">您承诺知悉且同意将您转账时使用的付款银行账户信息(如账户名、账号)授权于【创翔公司】知晓并用于转账收款查询，而无需再征得您的同意。</view>
    <div>
      <div class="app-container" style="padding: 20px">
        <el-table :data="dataList" style="width: 100%" row-key="id" border lazy :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
          <el-table-column prop="create_time" label="创建时间" :show-overflow-tooltip="true" />
          <el-table-column prop="paymentMoney" label="转账金额" :show-overflow-tooltip="true" />
          <el-table-column prop="payeeaccountname" label="收款账户名称" :show-overflow-tooltip="true" />
          <el-table-column prop="payeeaccount" label="订单收款账号" :show-overflow-tooltip="true" />
          <el-table-column prop="payeebankname" label="收款银行名称" :show-overflow-tooltip="true" />
          <el-table-column prop="payeebanksiteno" label="收款银行网点号/分行" :show-overflow-tooltip="true" />
          <el-table-column prop="payeebanksitename" label="收款银行网点名称/分行名称" :show-overflow-tooltip="true" />
          <el-table-column prop="feeType" label="缴费类型" :show-overflow-tooltip="true" />
          <el-table-column prop="status" label="交易状态" :show-overflow-tooltip="true" />
        </el-table>
        <!-- <pagination v-show="total > 0" :total="total" v-model:page="pageNum" v-model:limit="pageSize" /> -->
      </div>
      <el-pagination style="float: right; margin-right: 20px" background layout="prev, pager, next" :total="total" @current-change="sizeChange" />
    </div>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '@/state/modules/auth';
  import { selectBill } from '@/services/api/auth';
  import { onLoad } from '@dcloudio/uni-app';

  onLoad(() => {
    const authStore = useAuthStore();
    id.value = authStore.userinfo.id;
    selectBillArr();
  });
  let id = ref();
  let dataList = ref([] as any[]);
  let pageNum = ref(1);
  let pageSize = ref(10);
  let total = ref();
  const sizeChange = (Num: any) => {
    dataList.value = [];
    pageNum.value = Num;
    selectBillArr();
  };
  const selectBillArr = () => {
    selectBill({
      user_id: id.value,
      page: pageNum.value,
      limit: pageSize.value,
      // payeeaccount: '220020952571000002744',
    }).then((res) => {
      dataList.value = res.data.data.map((item: { [x: string]: any; status: number }) => {
        return {
          create_time: item.create_time,
          paymentMoney: item.paymentMoney,
          payeeaccountname: item.payeeaccountname,
          payeeaccount: item.payeeaccount,
          payeebankname: item.payeebankname,
          payeebanksiteno: item.payeebanksiteno,
          payeebanksitename: item.payeebanksitename,
          feeType: item.feeType == 1 ? '电费' : item.feeType == 2 ? '水费' : '物业费',
          status: item.status == 1 ? '交易成功' : '等待交易',
        };
      });
      total.value = res.data.total;
    });
  };
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
  ::v-deep .el-pagination .btn-prev {
    width: 32px;
    height: 32px;
    border-radius: var(--el-pagination-border-radius);
  }
  ::v-deep .el-pagination .btn-next {
    width: 32px;
    height: 32px;
    border-radius: var(--el-pagination-border-radius);
  }
  ::v-deep .el-icon {
    float: left;
    margin-left: -7px;
  }
</style>
