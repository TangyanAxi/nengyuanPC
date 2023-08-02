<template>
  <view class="content">
    <view style="background-color: #f8f8f8; width: 100%; height: 10px" />
    <view class="header">
      <view style="color: #00b590; width: 120px">转账支付收银台</view>
    </view>
    <view class="warn">您承诺知悉且同意将您转账时使用的付款银行账户信息(如账户名、账号)授权于【创翔公司】知晓并用于转账收款查询，而无需再征得您的同意。</view>
    <view style="width: 800px; margin: 10px auto">
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
        <!-- <el-form-item label="转账金额" prop="amountMoney">
          <el-input v-model="ruleForm.amountMoney" autocomplete="off">
            <template #append>元</template>
          </el-input>
          <p style="color: #ef7216; font-size: 10px; height: auto">请务必完全按照该转账金额进行转则</p>
        </el-form-item> -->
        <el-form-item label="商户id">
          <el-input v-model="ruleForm.merid" autocomplete="off" placeholder="请输入商户id" disabled style="width: 150px" />
        </el-form-item>
        <el-form-item label="交易金额" prop="tranamt">
          <el-input v-model="ruleForm.tranamt" autocomplete="off" placeholder="输入金额" style="width: 150px">
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="服务器通知地址码" prop="serverurl">
          <el-input v-model="ruleForm.serverurl" autocomplete="off" placeholder="请输入服务器通知地址码" />
        </el-form-item> -->
        <el-form-item label="平台手续费" prop="patfee">
          <el-input v-model="ruleForm.patfee" autocomplete="off" placeholder="输入手续费" style="width: 150px">
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="分账类型" prop="profittype">
          <el-select v-model="ruleForm.profittype" placeholder="请选择分账类型">
            <el-option label="按比例账" value="00" />
            <el-option label="按金额分账" value="01" />
          </el-select>
        </el-form-item> -->
        <el-form-item v-for="(item, index) in ruleForm.productlist" :key="index" label-width="0px">
          <view style="display: flex">
            <el-form-item label="商品名称" :prop="'productlist.' + index + '.productname'">
              <el-input v-model="item.productname" autocomplete="off" placeholder="请输入商品名称" style="width: 80px" disabled />
            </el-form-item>
            <!-- <el-form-item label-width="80px" label="商品数量" :prop="'productlist.' + index + '.productnum'" :rules="{ required: true, message: '请输入数量' }">
              <el-input v-model="item.productnum" class="w-50 m-2" placeholder="请输入数量" style="width: 150px" />
            </el-form-item>
            <el-form-item label-width="80px" label="商品金额" :prop="'productlist.' + index + '.productamt'" :rules="{ required: true, message: '请输入金额' }">
              <el-input v-model="item.productamt" class="w-50 m-2" placeholder="金额" style="width: 120px">
                <template #append>元</template>
              </el-input>
            </el-form-item> -->
            <!-- <el-button type="danger" :icon="Delete" circle style="margin-left: 10px" @click="deleteProductList(index)" /> -->
          </view>
        </el-form-item>
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

  const ruleFormRef = ref<FormInstance>();
  // const validatePass = (_rule: any, value: any, callback: any) => {
  //   if (value === '') {
  //     callback(new Error('请输入金额'));
  //   } else {
  //     callback();
  //   }
  // };
  // const validatePass2 = (_rule: any, value: any, callback: any) => {
  //   if (value === '') {
  //     callback(new Error('请输入商户id'));
  //   } else {
  //     callback();
  //   }
  // };
  const validatePass3 = (_rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入交易金额'));
    } else {
      callback();
    }
  };
  // const validatePass4 = (_rule: any, value: any, callback: any) => {
  //   if (value === '') {
  //     callback(new Error('请输入服务器通知地址码'));
  //   } else {
  //     callback();
  //   }
  // };
  const validatePass5 = (_rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入平台手续费'));
    } else {
      callback();
    }
  };
  // const validatePass6 = (_rule: any, value: any, callback: any) => {
  //   if (value === '') {
  //     callback(new Error('请选择分账类型'));
  //   } else {
  //     callback();
  //   }
  // };
  const validatePass7 = (_rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入备注'));
    } else {
      callback();
    }
  };
  interface RuleForm {
    merid: string;
    tranamt: Number;
    serverurl: string;
    patfee: Number;
    remark: string;
    profitlist: any[];
    productlist: any[];
  }
  let ruleForm = reactive<RuleForm>({
    // amountMoney: '',
    merid: 'CF2002061977',
    tranamt: 0,
    serverurl: 'https://nengyuan.gaopinoa.com/umbpay/notify/TransferNotify',
    // profittype: '',
    patfee: 0,
    remark: '',
    profitlist: [{ merid: 'CF2002061977', proportion: '', prno: '' }],
    productlist: [{ productname: '生活缴费', productnum: 1, productamt: 1.0 }],
  });

  const rules = reactive<FormRules<typeof ruleForm>>({
    // amountMoney: [{ validator: validatePass, trigger: 'blur' }],
    // merid: [{ validator: validatePass2, trigger: 'blur', required: true }],
    tranamt: [{ validator: validatePass3, trigger: 'blur', required: true }],
    // serverurl: [{ validator: validatePass4, trigger: 'blur', required: true }],
    patfee: [{ validator: validatePass5, trigger: 'blur', required: true }],
    // profittype: [{ validator: validatePass6, trigger: 'blur', required: true }],
    remark: [{ validator: validatePass7, trigger: 'blur', required: true }],
  });

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
      if (valid) {
        let data = {
          merid: ruleForm.merid, //商户id
          tranamt: ruleForm.tranamt, //交易金额
          serverurl: ruleForm.serverurl, //服务器通知地址码
          patfee: ruleForm.patfee, //平台手续费
          productlist: ruleForm.productlist, //商品信息
          profitlist: ruleForm.profitlist, //分账列表
          remark: ruleForm.remark, //备注
        };
        payMessage(data).then((res) => {
          console.log(res);
        });
      } else {
        console.log('error submit!');
        console.log(ruleForm);
        return false;
      }
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
    width: 100%;
    text-align: center;
    line-height: 30px;
    color: #ef7216;
    /* white-space: nowrap; */
    background-color: #fffbe8;
    height: auto;
  }
</style>
