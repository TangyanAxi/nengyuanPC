<script setup lang="ts">
  import { ref } from 'vue';
  import tmApp from '@/tmui/components/tm-app/tm-app.vue';
  import tmMessage from '@/tmui/components/tm-message/tm-message.vue';
  const msg = ref<InstanceType<typeof tmMessage> | null>(null);
</script>

<template>
  <tm-app>
    <view class="uno-w-full uno-h-100vh">
      <tm-message ref="msg" width="auto" />
    </view>
  </tm-app>
</template>
