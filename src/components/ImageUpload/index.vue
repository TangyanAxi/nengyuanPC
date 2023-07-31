<template>
  <div class="component-upload-image">
    <tm-upload
      ref="upload"
      :width="width"
      :imageHeight="imageHeight"
      :rows="rows"
      :url="uploadImgUrl"
      :maxFile="limit"
      :formData="formData"
      @success="handleUpload"
      @remove="handleRemove"
      @fail="handleFailUpload"
      :chooesefileAfter="handleChooeseFileAfter"
      :header="headers"
      :defaultValue="uploadList"
      v-model="uploadList"
      :transprent="true"
      :disabled="disabled"
    >
      <template #icon>
        <image src="@/static/images/upload.png" mode="scaleToFill" style="width: 130rpx; height: 130rpx" />
      </template>
    </tm-upload>
    <tm-message ref="msg" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { getCache } from '@/utils/catch';
  import { TOKEN_KEY } from '@/enums/cacheEnum';
  import tmUpload from '@/tmui/components/tm-upload/tm-upload.vue';
  import { file } from '@/tmui/components/tm-upload/upload';
  import tmMessage from '@/tmui/components/tm-message/tm-message.vue';
  const msg = ref<InstanceType<typeof tmMessage> | null>(null);

  const props = defineProps({
    modelValue: {
      type: [String, Array],
      required: true,
      default: '',
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 图片数量限制
    limit: {
      type: Number,
      default: 1,
    },
    // 每行显示多少个
    rows: {
      type: Number,
      default: 5,
    },
    //  组件宽度
    width: {
      type: Number,
      default: 700,
    },
    // 图片高度
    imageHeight: {
      type: Number,
      default: 130,
    },
    formData: {
      type: Object,
      default: () => ({}),
    },
  });
  const emit = defineEmits(['update:modelValue', 'uploadEvent']);
  const uploadList: any = ref([]);
  const baseUrl = import.meta.env.VITE_IMAGE_URL;
  const uploadImgUrl = ref(import.meta.env.VITE_UPLOAD_URL + '/common/upload');
  const headers = ref({ Authorization: 'Bearer ' + getCache(TOKEN_KEY) });

  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        // 首先将值转为数组
        const list = Array.isArray(val) ? val : val.split(',');
        // 然后将数组转为对象数组
        uploadList.value = list.map((item: any) => {
          if (typeof item === 'string') {
            if (item.indexOf(baseUrl) === -1) {
              item = { name: item, url: baseUrl + item };
            } else {
              item = { name: item, url: item };
            }
          }
          return item;
        });
      } else {
        uploadList.value = [];
        return [];
      }
    },
    { deep: true, immediate: true },
  );

  // 选择文件回调
  const number = ref(0);
  function handleChooeseFileAfter(files: file[]) {
    number.value = files.length;
    number.value > 1 && msg.value?.show({ model: 'load', text: '正在上传图片,请稍后...' });
    return files;
  }

  // 上传成功回调
  const fileList: any = ref([]);
  function handleUpload(item: any, list: any) {
    fileList.value.push(item);
    if (number.value > 0 && fileList.value.length === number.value) {
      const value = listToString(list);
      fileList.value = [];
      number.value = 0;
      emit('update:modelValue', value);
      emit('uploadEvent', value);
      msg.value?.hide();
    }
  }

  // 删除
  function handleRemove(item: any) {
    // 只有当图片上传成功的时候删除才去更改 modalValue,否则没有意义
    if (item.statusCode === 3) {
      const value = listToString(uploadList.value);
      emit('update:modelValue', value);
      emit('uploadEvent', value);
    }
  }

  // 上传失败
  function handleFailUpload(_item: any, _list: any) {
    msg.value?.hide();
    msg.value?.show({ model: 'error', text: '上传图片失败,请重试' });
  }

  // 对象转成指定字符串分隔
  function listToString(list: any, separator = ',') {
    let strs = '';
    for (let i in list) {
      if (list[i].response) {
        let result = JSON.parse(list[i].response);
        strs += result?.fileName ? result.fileName + separator : '';
      }
      if (!list[i].response && list[i].statusCode === 3) {
        strs += list[i].name + separator;
      }
    }
    return strs != '' ? strs.substr(0, strs.length - 1) : null;
  }
</script>
