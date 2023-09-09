<template>
  <view class="content">
    <view style="background-color: #f8f8f8; width: 100%; height: 10px" />
    <view class="header">
      <view style="color: #00b590; width: 120px">转账支付收银台</view>
    </view>
    <view style="float: right; margin-top: -30px; margin-right: 20px">
      <el-button type="danger" @click="exit">退出</el-button>
    </view>
    <view class="warn">您承诺知悉且同意将您转账时使用的付款银行账户信息(如账户名、账号)授权于【创翔公司】知晓并用于转账收款查询，而无需再征得您的同意。</view>
    <view style="width: 500px; margin: 10px auto">
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
        <!-- <el-form-item label="转账金额" prop="amountMoney">
          <el-input v-model="ruleForm.amountMoney" autocomplete="off">
            <template #append>元</template>
          </el-input>
          <p style="color: #ef7216; font-size: 10px; height: auto">请务必完全按照该转账金额进行转则</p>
        </el-form-item> -->
        <!-- <el-form-item label="商户id">
          <el-input v-model="ruleForm.merid" autocomplete="off" placeholder="请输入商户id" disabled style="width: 170px" />
        </el-form-item> -->
        <el-form-item label="交易金额" prop="paymentMoney">
          <el-input v-model="ruleForm.paymentMoney" autocomplete="off" placeholder="输入金额" type="number" style="width: 170px">
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="缴费类型">
          <el-radio-group v-model="ruleForm.fee_type">
            <el-radio label="1">电费</el-radio>
            <el-radio label="2">水费</el-radio>
            <el-radio label="3">物业费</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="服务器通知地址码" prop="serverurl">
          <el-input v-model="ruleForm.serverurl" autocomplete="off" placeholder="请输入服务器通知地址码" />
        </el-form-item> -->
        <!-- <el-form-item label="平台手续费" prop="patfee">
          <el-input v-model="ruleForm.patfee" autocomplete="off" placeholder="输入手续费" style="width: 150px">
            <template #append>元</template>
          </el-input>
        </el-form-item> -->
        <!-- <el-form-item label="分账类型" prop="profittype">
          <el-select v-model="ruleForm.profittype" placeholder="请选择分账类型">
            <el-option label="按比例账" value="00" />
            <el-option label="按金额分账" value="01" />
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item v-for="(item, index) in ruleForm.productlist" :key="index" label-width="0px">
          <view style="display: flex">
            <el-form-item label="商品名称" :prop="'productlist.' + index + '.productname'">
              <el-input v-model="item.productname" autocomplete="off" placeholder="请输入商品名称" style="width: 80px" disabled />
            </el-form-item>
            <el-form-item label-width="80px" label="商品数量" :prop="'productlist.' + index + '.productnum'" :rules="{ required: true, message: '请输入数量' }">
              <el-input v-model="item.productnum" class="w-50 m-2" placeholder="请输入数量" style="width: 150px" />
            </el-form-item>
            <el-form-item label-width="80px" label="商品金额" :prop="'productlist.' + index + '.productamt'" :rules="{ required: true, message: '请输入金额' }">
              <el-input v-model="item.productamt" class="w-50 m-2" placeholder="金额" style="width: 120px">
                <template #append>元</template>
              </el-input>
            </el-form-item>
            <el-button type="danger" :icon="Delete" circle style="margin-left: 10px" @click="deleteProductList(index)" />
          </view>
        </el-form-item> -->
        <!-- <el-form-item label-width="20px" label="">
          <el-button type="primary" style="margin-left: 100px" @click="addProductList">
            添加<el-icon class="el-icon--right"><Plus /></el-icon>
          </el-button>
        </el-form-item> -->
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="ruleForm.remark"
            autocomplete="off"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="请输入备注"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef, ruleForm)">提交</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          <el-button type="warning" @click="selectList">查看转账列表</el-button>
        </el-form-item>
      </el-form>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  // import { Delete } from '@element-plus/icons-vue';
  import { payMessage } from '@/services/api/auth';
  import { useAuthStore } from '@/state/modules/auth';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { router } from '@/utils/router';
  import { onLoad } from '@dcloudio/uni-app';
  import { removeCache } from '@/utils/catch';
  import { TOKEN_KEY, USER_INFO_KEY, BILL_MESSAGE_KEY } from '@/enums/cacheEnum';
  onLoad(() => {
    const authStore = useAuthStore();
    token.value = authStore.token;
    if (token.value == undefined) {
      // token不存在跳转到登录页
      router.replaceAll('/pages/login/index');
    }
  });

  let token = ref();
  const message = ref(); //成功后提示消息
  const ruleFormRef = ref<FormInstance>();
  const validatePass = (_rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入交易金额'));
    } else if (value < 20) {
      callback(new Error('请输入大于20的金额'));
    } else {
      callback();
    }
  };
  const validatePass1 = (_rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入备注'));
    } else {
      callback();
    }
  };
  const validatePass2 = (_rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入缴费类型'));
    } else {
      callback();
    }
  };
  interface RuleForm {
    merid: string; //商户id
    paymentMoney: Number; //交易金额
    serverurl: string; //服务通知地址码
    fee_type: string; //缴费类型 1电费 2水费 3物业费
    patfee: Number; //平台手续费
    remark: string; //备注
    productlist: any[]; //商品名称
    profitlist: any[]; //分账列表
    type: Number;
    pay_type: Number;
  }
  let ruleForm = reactive<RuleForm>({
    merid: 'CF2002061977', //商户id
    paymentMoney: 0, //交易金额
    serverurl: 'https://nengyuan.gaopinoa.com/umbpay/notify/TransferNotify', //服务通知地址码
    fee_type: '1', //缴费类型 1电费 2水费 3物业费
    patfee: 10, //平台手续费
    remark: '', //备注
    productlist: [{ productname: '生活缴费', productnum: 1, productamt: 1.0 }], //商品名称
    profitlist: [{ merid: 'CF2002061977', proportion: '', prno: '' }], //分账列表
    type: 1,
    pay_type: 4,
  });

  const rules = reactive<FormRules<typeof ruleForm>>({
    paymentMoney: [{ validator: validatePass, trigger: 'blur', required: true }], //交易金额
    remark: [{ validator: validatePass1, trigger: 'blur', required: true }], //备注
    fee_type: [{ validator: validatePass2, trigger: 'blur', required: true }], //缴费类型 1电费 2水费 3物业费
  });
  const selectList = () => {
    uni.navigateTo({
      url: '/pages/transferAccounts/index',
    });
  };

  //增加商品列表
  // const addProductList = () => {
  //   console.log(ruleForm.productlist);
  //   ruleForm.productlist.push({ productname: '', productnum: '', productamt: '' });
  // };
  //减少商品列表
  // const deleteProductList = (index: any) => {
  //   ruleForm.productlist.splice(index, 1);
  // };

  const submitForm = (formEl: FormInstance | undefined, ruleForm: any) => {
    if (!formEl) return;
    formEl.validate((valid) => {
      const authStore = useAuthStore();
      if (authStore.userinfo == undefined || authStore.userinfo == null) {
        ElMessage.error('请先登录');
        // id不存在跳转到登录页
        router.replaceAll('/pages/login/index');
      } else {
        let id = authStore.userinfo.id;
        if (valid) {
          let data = {
            user_id: id, //用户id
            merid: ruleForm.merid, //商户id
            paymentMoney: ruleForm.paymentMoney, //交易金额
            serverurl: ruleForm.serverurl, //服务器通知地址码
            patfee: ruleForm.patfee, //平台手续费
            productlist: ruleForm.productlist, //商品信息
            profitlist: ruleForm.profitlist, //分账列表
            remark: ruleForm.remark, //备注
            fee_type: Number(ruleForm.fee_type),
            type: ruleForm.type,
            pay_type: ruleForm.pay_type,
            device_type: 3,
          };
          payMessage(data).then((res) => {
            message.value = res.msg;
            let data = res.data;
            authStore.setBillMessage(data, 43200);
            // res.data = message.value;
            if (res.code == 200) {
              authStore.setBillMessage(res.data, 43200);
              ElMessage({
                message: message.value,
                type: 'success',
              });
              setTimeout(() => {
                uni.navigateTo({
                  url: '/pages/MerchantTransactions/index',
                });
              }, 1000);
            } else {
              ElMessage({
                message: message.value,
                type: 'error',
              });
            }
          });
        } else {
          // ElMessage.error('创建订单失败');
          return false;
        }
      }
    });
  };
  const exit = () => {
    ElMessageBox.confirm('确定要退出嘛', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        ElMessage({
          type: 'success',
          message: '退出成功',
        });
        removeCache(TOKEN_KEY);
        removeCache(USER_INFO_KEY);
        removeCache(BILL_MESSAGE_KEY);
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/login/index',
          });
        }, 100);
      })
      .catch(() => {
        console.log('取消成功');
      });
  };

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl?.resetFields();
  };
</script>

<style>
  .content {
    overflow-x: auto;
  }
  .content .header {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
  .warn {
    margin-top: 10px;
    width: 100vw;
    text-align: center;
    line-height: 30px;
    color: #ef7216;
    /* white-space: nowrap; */
    background-color: #fffbe8;
    height: auto;
  }
</style>
