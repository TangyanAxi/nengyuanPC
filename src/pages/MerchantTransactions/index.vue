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
        <el-form-item label="商户id" prop="merid">
          <el-input v-model="ruleForm.merid" autocomplete="off" placeholder="请输入商户id" />
        </el-form-item>
        <el-form-item label="交易金额" prop="tranamt">
          <el-input v-model="ruleForm.tranamt" autocomplete="off" placeholder="请输入交易金额">
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="服务器通知地址码" prop="serverurl">
          <el-input v-model="ruleForm.serverurl" autocomplete="off" placeholder="请输入服务器通知地址码" />
        </el-form-item>
        <el-form-item label="平台手续费" prop="patfee">
          <el-input v-model="ruleForm.patfee" autocomplete="off" placeholder="请输入平台手续费">
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="分账类型" prop="profittype">
          <el-select v-model="ruleForm.profittype" placeholder="请选择分账类型">
            <el-option label="按比例账" value="00" />
            <el-option label="按金额分账" value="01" />
          </el-select>
        </el-form-item>
        <view>
          <view style="display: flex">
            <el-form-item label="商品名称" prop="productlist[0].productname">
              <el-select v-model="ruleForm.productlist[0].productname" placeholder="请选择商品" style="width: 150px">
                <el-option label="按比例账" value="00" />
                <el-option label="按金额分账" value="01" />
              </el-select>
            </el-form-item>
            <el-form-item label-width="80px" label="商品数量" prop="productlist[0].productnum">
              <el-input v-model="ruleForm.productlist[0].productnum" class="w-50 m-2" placeholder="Please Input" style="width: 150px" />
            </el-form-item>
            <el-form-item label-width="80px" label="商品金额" prop="productlist[0].productamt">
              <el-input v-model="ruleForm.productlist[0].productamt" class="w-50 m-2" placeholder="Please Input" style="width: 120px">
                <template #append>元</template>
              </el-input>
            </el-form-item>
          </view>
        </view>
        <el-form-item label-width="20px" label="">
          <el-button type="primary" style="margin-left: 100px">
            添加<el-icon class="el-icon--right"><Plus /></el-icon>
          </el-button>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="ruleForm.remark" autocomplete="off" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';

  const ruleFormRef = ref<FormInstance>();
  // const validatePass = (_rule: any, value: any, callback: any) => {
  //   if (value === '') {
  //     callback(new Error('请输入金额'));
  //   } else {
  //     callback();
  //   }
  // };
  const validatePass2 = (_rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入商户id'));
    } else {
      callback();
    }
  };
  const validatePass3 = (_rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入交易金额'));
    } else {
      callback();
    }
  };
  const validatePass4 = (_rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入服务器通知地址码'));
    } else {
      callback();
    }
  };
  const validatePass5 = (_rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入平台手续费'));
    } else {
      callback();
    }
  };
  const validatePass6 = (_rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请选择分账类型'));
    } else {
      callback();
    }
  };
  const validatePass7 = (_rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入备注'));
    } else {
      callback();
    }
  };

  const ruleForm = reactive({
    // amountMoney: '',
    merid: '',
    tranamt: '',
    serverurl: '',
    patfee: '',
    profittype: '',
    remark: '',
    productlist: [{ productname: '牙刷', productnum: '2', productamt: '0.5' }],
  });

  const rules = reactive<FormRules<typeof ruleForm>>({
    // amountMoney: [{ validator: validatePass, trigger: 'blur' }],
    merid: [{ validator: validatePass2, trigger: 'blur' }],
    tranamt: [{ validator: validatePass3, trigger: 'blur' }],
    serverurl: [{ validator: validatePass4, trigger: 'blur' }],
    patfee: [{ validator: validatePass5, trigger: 'blur' }],
    profittype: [{ validator: validatePass6, trigger: 'blur' }],
    remark: [{ validator: validatePass7, trigger: 'blur' }],
  });

  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
      if (valid) {
        console.log('submit!');
      } else {
        console.log('error submit!');
        return false;
      }
    });
  };

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
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
