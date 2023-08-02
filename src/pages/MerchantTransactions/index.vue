<template>
  <view class="content">
    <view style="background-color: #f8f8f8; width: 100%; height: 10px" />
    <view class="header">
      <view style="color: #00b590; width: 120px">转账支付收银台</view>
    </view>
    <view class="warn">您承诺知悉且同意将您转账时使用的付款银行账户信息(如账户名、账号)授权于【创翔公司】知晓并用于转账收款查询，而无需再征得您的同意。</view>
    <view style="width: 800px; margin: 10px auto">
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="转账金额" prop="amountMoney">
          <el-input v-model="ruleForm.amountMoney" autocomplete="off" placeholder="请输入转账金额">
            <template #append>元</template>
          </el-input>
          <p style="color: #ef7216; font-size: 10px; height: auto">请务必完全按照该转账金额进行转则</p>
        </el-form-item>
        <el-form-item label="收款账户名称" prop="amountName">
          <el-input v-model="ruleForm.amountName" autocomplete="off" placeholder="请输入收款账户名称" />
        </el-form-item>
        <el-form-item label="订单收款账号" prop="collecMoneyName">
          <el-input v-model="ruleForm.collecMoneyName" autocomplete="off" placeholder="请输入订单收款账号" />
        </el-form-item>
        <el-form-item label="收款银行名称" prop="collecBankName">
          <el-input v-model="ruleForm.collecBankName" autocomplete="off" placeholder="请输入收款银行名称" />
          <p style="color: #ef7216; font-size: 10px; height: auto">请务必选择该信息为“收款银行”信息</p>
        </el-form-item>
        <el-form-item label="收款银行网点号/分行号" prop="collecBankNunber">
          <el-input v-model="ruleForm.collecBankNunber" autocomplete="off" placeholder="请输入收款银行网点号/分行号" />
          <p style="color: #ef7216; font-size: 10px; height: auto">转账时银行将提示您选择网点或分行信息</p>
        </el-form-item>
        <el-form-item label="收款银行网点名称/分行名称" prop="collecBankNick">
          <el-input v-model="ruleForm.collecBankNick" autocomplete="off" placeholder="请输入收款银行网点名称/分行名称" />
          <p style="color: #ef7216; font-size: 10px; height: auto">转账时银行将提示您选择网点或分行信息</p>
        </el-form-item>
        <el-form-item label="收款银行开户地" prop="collecBankLocat">
          <el-input v-model="ruleForm.collecBankLocat" autocomplete="off" placeholder="请输入收款银行开户地" />
          <p style="color: #ef7216; font-size: 10px; height: auto">转账时银行将提示您选择网点或分行信息</p>
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
  const validatePass = (_rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入金额'));
    } else {
      callback();
    }
  };
  const validatePass2 = (_rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入收款账户名称'));
    } else {
      callback();
    }
  };
  const validatePass3 = (_rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入订单收款账号'));
    } else {
      callback();
    }
  };
  const validatePass4 = (_rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入收款银行名称'));
    } else {
      callback();
    }
  };
  const validatePass5 = (_rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入收款银行网点号/分行号'));
    } else {
      callback();
    }
  };
  const validatePass6 = (_rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入收款银行网点名称/分行名称'));
    } else {
      callback();
    }
  };
  const validatePass7 = (_rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入收款银行开户地'));
    } else {
      callback();
    }
  };

  const ruleForm = reactive({
    amountMoney: '',
    amountName: '',
    collecMoneyName: '',
    collecBankName: '',
    collecBankNunber: '',
    collecBankNick: '',
    collecBankLocat: '',
  });

  const rules = reactive<FormRules<typeof ruleForm>>({
    amountMoney: [{ validator: validatePass, trigger: 'blur' }],
    amountName: [{ validator: validatePass2, trigger: 'blur' }],
    collecMoneyName: [{ validator: validatePass3, trigger: 'blur' }],
    collecBankName: [{ validator: validatePass4, trigger: 'blur' }],
    collecBankNunber: [{ validator: validatePass5, trigger: 'blur' }],
    collecBankNick: [{ validator: validatePass6, trigger: 'blur' }],
    collecBankLocat: [{ validator: validatePass7, trigger: 'blur' }],
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
