<script setup lang="ts">
  import { useAuthStore } from '@/state/modules/auth';
  import type { FormInstance, FormRules } from 'element-plus';
  import { reactive, ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import { onLoad } from '@dcloudio/uni-app';

  onLoad(() => {
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    console.log(userAgent);
    // let isOpera = userAgent.indexOf('Opera') > -1;
    // if (isOpera) {
    //   //判断是否Opera浏览器
    //   console.log('Opera');
    //   return 'Opera';
    // }
    // if (userAgent.indexOf('Firefox') > -1) {
    //   //判断是否Firefox浏览器
    //   console.log('FF');
    //   return 'FF';
    // }
    // if (userAgent.indexOf('Chrome') > -1) {
    //   //判断是否Chrome浏览器
    //   console.log('Chrome');
    //   return 'Chrome';
    // }
    // if (userAgent.indexOf('Safari') > -1) {
    //   //判断是否Safari浏览器
    //   console.log('Safari');
    //   return 'Safari';
    // }
    // if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
    //   //判断是否IE浏览器
    //   console.log('IE');
    //   return 'IE';
    // }
  });
  const ruleFormRef = ref<FormInstance>();

  const validatePass = (_rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入密码'));
    } else {
      if (ruleForm.account !== '') {
        if (!ruleFormRef.value) return;
        ruleFormRef.value.validateField('checkPass', () => null);
      }
      callback();
    }
  };
  const validatePass2 = (_rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入账号'));
    } else {
      callback();
    }
  };

  const ruleForm = reactive({
    passWord: '',
    account: '',
    rememberMe: false,
  });

  const rules = reactive<FormRules<typeof ruleForm>>({
    passWord: [{ validator: validatePass, trigger: 'blur' }],
    account: [{ validator: validatePass2, trigger: 'blur' }],
  });

  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
      if (valid) {
        const authStore = useAuthStore();
        const data = {
          username: ruleForm.account,
          password: ruleForm.passWord,
          type: 1,
        };
        authStore.login(data).then((res) => {
          if (res.code == 200) {
            ElMessage({
              message: '登陆成功',
              type: 'success',
            });
            setTimeout(() => {
              uni.switchTab({
                url: '/pages/index/index',
              });
            }, 1500);
          }
        });
        // .catch((err) => msg.value?.show({ model: 'error', text: err.msg }));
      } else {
        return false;
      }
    });
  };

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
  };
</script>

<template>
  <div class="login">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="60px" class="login-form">
      <h3 class="title">能源运维</h3>
      <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForm.account" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input v-model="ruleForm.passWord" type="password" autocomplete="off" />
      </el-form-item>
      <!-- <el-checkbox v-model="ruleForm.rememberMe" style="margin: 0px 0px 25px 20px">记住密码</el-checkbox> -->
      <div style="display: flex; justify-content: center; align-items: center">
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">登陆</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('https://nengyuan.gaopinoa.com/static/wap/img/login_bg@2x.png');
    background-size: cover;
  }
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
  }

  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 400px;
    padding: 25px 25px 5px 10px;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 33%;
    height: 38px;
    float: right;
    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }
  .el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
  }
  .login-code-img {
    height: 38px;
  }
</style>
