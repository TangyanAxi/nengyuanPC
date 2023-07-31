<template>
  <view>
    <template v-for="(item, index) in options" :key="index">
      <template v-if="values.includes(item.value)">
        <span v-if="item.elTagType == 'default' || item.elTagType == ''" :key="item.value" :index="index">{{ item.text }}</span>
        <tm-tag v-else :key="item.value + ''" :index="index" :size="size" :color="item.elTagType === 'primary' ? '#409EFF' : 'green'" :label="item.text" />
      </template>
    </template>
  </view>
</template>

<script lang="ts" setup>
  import { computed, PropType } from 'vue';
  import tmTag from '@/tmui/components/tm-tag/tm-tag.vue';
  interface DictTagOption {
    value: string | number;
    text: string;
    elTagType: 'default' | 'primary' | 'success' | '';
  }

  const props = defineProps({
    // 数据
    options: {
      type: Array as PropType<DictTagOption[]>,
      default: null,
    },
    // 当前的值
    value: [Number, String, Array],

    // tag大小
    size: {
      type: String,
      default: 'm',
    },
  });

  const values = computed(() => {
    if (props.value !== null && typeof props.value !== 'undefined') {
      return Array.isArray(props.value) ? props.value : [String(props.value)];
    } else {
      return [];
    }
  });
</script>
