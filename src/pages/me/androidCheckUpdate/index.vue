<!-- <script setup lang="ts">
  import { ref } from 'vue';
  // 查询设备列表
  const username = ref();
  const password = ref();
</script> -->

<!-- <template>
  <tm-app>
    <view class="uno-w-full uno-h-100vh uno-bg-white" style="position: relative">
      <view class="content-top">
        <view class="login-img">
          <image src="/static/images/login/logoLogin.png" mode="" />
          <view class="login-word"><p>欢迎登录设备管理平台</p></view>
        </view>
      </view>
      <view style="margin-top: -180rpx">
        <tm-sheet>
          <tm-input color="primary" prefix="/static/images/login/userName.png" v-model.lazy="username" :height="100" placeholder="请输入账号" :round="20" />
          <view class="space" />
          <tm-input
            color="primary"
            prefix="/static/images/login/password.png"
            v-model.lazy="password"
            :height="100"
            placeholder="请输入密码"
            :round="20"
            password
          />
        </tm-sheet>
      </view>
      <view class="forgot-word"><span>忘记密码？</span></view>
      <tm-button style="width: 640rpx; margin-left: 60rpx; margin-top: 43rpx" round="20" height="100" block label="登录" @click="handleLogin" />
    </view>
    <tm-message ref="msg" :lines="3" width="auto" />
  </tm-app>
</template> -->
<!-- <style>
  .content-top {
    width: 750rpx;
    height: 748rpx;
    background: linear-gradient(0deg, #ffffff 11%, #e2f0ff 100%);
  }
  .space {
    height: 30rpx;
    background-color: white;
  }
  .login-img image {
    width: 251rpx;
    height: 251rpx;
    margin-top: 237rpx;
    margin-left: 250rpx;
  }
  .login-word {
    width: 340rpx;
    height: 33rpx;
    margin-left: 205rpx;
    font-size: 34rpx;
    font-weight: bold;
    color: #333333;
    line-height: 42rpx;
  }
  .forgot-word {
    width: 130rpx;
    height: 25rpx;
    font-size: 26rpx;
    font-weight: 500;
    color: #7d858e;
    line-height: 42rpx;
    margin-left: 540rpx;
    margin-top: -40rpx;
  }
</style> -->
