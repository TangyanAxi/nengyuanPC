<script setup lang="ts">
  import { ref, reactive } from 'vue';
  // import { router } from '@/utils/router';
  // import { useAuthStore } from '@/state/modules/auth';
  import { exitPassword } from '@/services/api/auth';
  import tmMessage from '@/tmui/components/tm-message/tm-message.vue';
  const msg = ref<InstanceType<typeof tmMessage> | null>(null);

  // 验证码倒计时
  // const isClick = ref<boolean>(false);
  // const isCountDown = ref<boolean>(false);
  // const countDown = ref<number>(60);
  // const timer = ref<any>(null);
  // const handleCountDown = () => {
  //   if (isClick.value) return;
  //   if (!form.phone) {
  //     msg.value?.show({ model: 'error', text: '请输入手机号' });
  //     return;
  //   }
  //   isClick.value = true;
  //   verificationCode({ phone: form.phone, name: 'forget_password' })
  //     .then(() => {
  //       isClick.value = false;
  //       isCountDown.value = true;
  //       timer.value = setInterval(() => {
  //         countDown.value--;
  //         if (countDown.value === 0) {
  //           clearInterval(timer.value);
  //           isCountDown.value = false;
  //           countDown.value = 60;
  //         }
  //       }, 1000);
  //     })
  //     .catch((err) => {
  //       isClick.value = false;
  //       console.log(err);
  //       msg.value?.show({ model: 'error', text: err.msg });
  //     });
  // };

  // 表单
  interface FORM {
    orPassword: number | null;
    password: string | null;
    checkPassword: string | null;
  }
  const form: FORM = reactive({
    orPassword: null,
    password: null,
    checkPassword: null,
  });
  const handleModifyPassword = () => {
    // if (!form.phone) {
    //   msg.value?.show({ model: 'error', text: '请输入手机号' });
    //   return;
    // }
    // if (!form.code) {
    //   msg.value?.show({ model: 'error', text: '请输入验证码' });
    //   return;
    // }
    if (!form.orPassword) {
      msg.value?.show({ model: 'error', text: '请输入原密码' });
      return;
    }
    if (!form.password) {
      msg.value?.show({ model: 'error', text: '请输入密码' });
      return;
    }
    if (!form.checkPassword) {
      msg.value?.show({ model: 'error', text: '请确认密码' });
      return;
    }
    if (form.password !== form.checkPassword) {
      msg.value?.show({ model: 'error', text: '两次密码不一致' });
      return;
    }

    exitPassword({
      oldPassword: form.orPassword,
      newPassword: form.password,
    })
      .then((res) => {
        if (res.code == 200) {
          msg.value?.show({ model: 'success', text: '修改成功' });
          setTimeout(() => {
            uni.navigateBack({
              delta: 1,
            });
          }, 1000);
        } else {
          msg.value?.show({ model: 'error', text: '修改失败' });
        }
      })
      .catch((err) => msg.value?.show({ model: 'error', text: err.msg }));
    // updateUser({ type: 1, phone: form.phone, new_pass: form.password, confirm_pass: form.checkPassword, code: form.code })
    //   .then(() => {
    //     msg.value?.show({ model: 'success', text: '修改成功' });
    //     setTimeout(() => {
    //       handleLoginOut();
    //     }, 1000);
    //   })
    //   .catch((err) => msg.value?.show({ model: 'error', text: err.msg }));
  };

  // 退出登录
  // const authStore = useAuthStore();
  // const handleLoginOut = () => {
  //   authStore.loginOut().then(() => {
  //     router.replaceAll('/pages/login/index');
  //   });
  // };
</script>

<template>
  <view class="content">
    <!-- <view class="phone"> <view>手机号</view> <input type="number" maxlength="11" v-model.trim="form.phone" placeholder="请输入手机号" /> </view>
    <view class="top">
      <view>验证码</view> <input type="number" v-model.trim="form.code" placeholder="请输入验证码" />
      <view class="code" @click="handleCountDown" v-if="!isCountDown">获取验证码</view>
      <view class="code" v-if="isCountDown">{{ countDown }}s</view>
    </view> -->
    <view class="top"> <view>原始密码</view> <input type="password" maxlength="12" v-model.trim="form.orPassword" placeholder="请输入原密码" /> </view>
    <view class="top"> <view>重设密码</view> <input type="password" maxlength="12" v-model.trim="form.password" placeholder="请输入新密码" /> </view>
    <view class="top"> <view>确认密码</view> <input type="password" maxlength="12" v-model.trim="form.checkPassword" placeholder="请确认密码" /> </view>
    <view class="button" @click="handleModifyPassword">确定</view>
    <tm-message ref="msg" width="auto" />
  </view>
</template>

<style>
  page {
    background: #f8f9fb;
  }
</style>

<style lang="scss" scoped>
  .top {
    padding: 54rpx 35rpx 50rpx;
    background: white;
    border-bottom: 2rpx solid #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    input {
      width: 50%;
      font-size: 28rpx;
      color: #999999;
      height: 100%;
    }
    & > view:nth-child(1) {
      font-size: 30rpx;
      width: 25%;
    }
    .code {
      width: 175rpx;
      height: 75rpx;
      background: #4a87fa;
      border-radius: 10rpx;
      font-size: 26rpx;
      color: #ffffff;
      text-align: center;
      line-height: 75rpx;
    }
  }
  .button {
    width: 580rpx;
    height: 95rpx;
    background: #4069e8;
    border-radius: 48rpx;
    margin: 100rpx auto 0;
    text-align: center;
    line-height: 95rpx;
    color: white;
    font-size: 28rpx;
  }
  .phone {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 38rpx 0 34rpx;
    height: 124rpx;
    background: white;
    border-bottom: 2rpx solid #f5f5f5;
    margin-top: 2rpx;
    & > view {
      font-size: 30rpx;
      width: 25%;
    }
    input {
      flex: 1;
      font-size: 28rpx;
      text-align: left;
    }
  }
</style>
