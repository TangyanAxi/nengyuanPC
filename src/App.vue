<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
  import { useAuthStore } from '@/state/modules/auth';
  import { setupInterceptors } from '@/utils/interceptors';

  onLaunch(() => {
    setupInterceptors();
  });
  onShow(() => {
    const authStore = useAuthStore();
    authStore.initToken();
  });
  onHide(() => {});
</script>
<style lang="scss">
  @import '@/components/uni-ui/uni-scss/index.scss';
  /* #ifdef APP-NVUE */
  @import './tmui/scss/nvue.css';
  /* #endif */
  /* #ifndef APP-NVUE */
  @import './tmui/scss/noNvue.css';
  /* #endif */

  page {
    background-color: #fff;
  }
</style>
