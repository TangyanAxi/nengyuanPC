import Request from './core/Request';
import { assign } from 'lodash-es';
import { HttpSuccess } from '@/types/http';
import { getEnvValue } from '@/utils/env';
import { useAuthStore } from '@/state/modules/auth';
import { ResultEnum } from '@/enums/httpEnum';
import { router } from '@/utils/router';
import { ElMessage } from 'element-plus';
const BASE_URL = getEnvValue<string>('VITE_BASE_URL');
const HEADER = {
  'Content-Type': 'application/json;charset=UTF-8;',
  Accept: 'application/json, text/plain, */*',
};

function createRequest() {
  return new Request({
    baseURL: BASE_URL,
    header: HEADER,
    custom: {
      auth: true,
    },
  });
}

const request = createRequest();
/**
 * 请求拦截器
 */
request.interceptors.request.use(
  (options) => {
    const { config } = options;
    // if(config.custom?.auth)
    if (config.custom?.auth) {
      const authStore = useAuthStore();
      if (!authStore.isLogin) {
        ElMessage.error('请先登录');
        // token不存在跳转到登录页
        router.replaceAll('/pages/login/index');
        return Promise.reject(options);
      }
      config.header = assign(config.header, {
        authorization: `Bearer ${authStore.getToken}`,
      });
    }
    return options;
  },
  (options) => {
    return Promise.reject(options);
  },
);

/**
 * 响应拦截器
 */
request.interceptors.response.use(
  (response: HttpSuccess<API>) => {
    const authStore = useAuthStore();
    const { data } = response;
    const { code } = data;
    if (code === ResultEnum.SUCCESS) {
      return data;
    }

    if (code === ResultEnum.UNAUTHORIZED) {
      //  handleRefreshToken(response);
      authStore.loginOut().then(() => {
        // token过期跳转到登录页 1秒后跳转
        setTimeout(() => {
          router.replaceAll('/pages/login/index');
        }, 1000);
      });
    }
    return Promise.reject(data);
  },
  (response) => {
    const authStore = useAuthStore();
    if (response?.data?.code === ResultEnum.UNAUTHORIZED) {
      //  handleRefreshToken(response);
      authStore.loginOut().then(() => {
        // token过期跳转到登录页 1秒后跳转
        setTimeout(() => {
          router.replaceAll('/pages/login/index');
        }, 1000);
      });
    }
    return Promise.reject(response.data);
  },
);

// // 是否正在刷新的标记
// let isRefreshing = false;
// // 重试队列，每一项将是一个待执行的函数形式
// const requests: any[] = [];
// // 刷新 token
// const handleRefreshToken = async (response: any) => {
//   const authStore = useAuthStore();
//   const { config } = response;

//   if (!isRefreshing) {
//     isRefreshing = true;
//     await authStore
//       .refreshToken()
//       .then((res) => {
//         if (res.code === ResultEnum.SUCCESS) {
//           const { token } = res.data;
//           authStore.setToken(token);

//           // 执行队列中的请求
//           requests.forEach((cb) => cb(token));
//           requests.splice(0, requests.length);

//           // 重试当前请求
//           return new Promise((resolve) => {
//             config.header = assign(config.header, {
//               authorization: `Bearer ${token}`,
//             });
//             resolve(request.request(config));
//           });
//         }
//         isRefreshing = false;
//       })
//       .catch(() => {
//         isRefreshing = false;
//         authStore.loginOut().then(() => {
//           // token过期跳转到登录页 1秒后跳转
//           setTimeout(() => {
//             router.replaceAll('/pages/login/index');
//           }, 1000);
//         });
//         return Promise.reject({ message: '登录过期，请重新登录' });
//       });
//   } else {
//     return new Promise((resolve) => {
//       requests.push((token: string) => {
//         config.header = assign(config.header, {
//           authorization: `Bearer ${token}`,
//         });
//         resolve(request.request(config));
//       });
//     });
//   }
// };

export { request };
