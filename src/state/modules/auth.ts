import { defineStore } from 'pinia';
import { getCache, removeCache, setCache, clearCache } from '@/utils/catch';
import { TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum';
import { login, register } from '@/services/api/auth';

interface AuthState {
  token?: string;
  userinfo?: any;
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    token: undefined,
    userinfo: undefined,
  }),
  getters: {
    getToken: (state) => {
      return state.token;
    },
    isLogin: (state): boolean => {
      return !!state.token;
    },
    isUserInfo: (state) => {
      return state.userinfo;
    },
  },
  actions: {
    initToken() {
      this.token = getCache<string>(TOKEN_KEY) || undefined;
      this.userinfo = getCache<any>(USER_INFO_KEY) || undefined;
    },
    setToken(token: string | undefined) {
      setCache(TOKEN_KEY, token);
      this.token = token;
    },
    setUserInfo(userinfo: object | undefined) {
      setCache(USER_INFO_KEY, userinfo);
      this.userinfo = userinfo;
    },

    /**
     * @description 登录
     */
    async login(params: any): Promise<any> {
      try {
        const data = await login(params);
        this.setToken(data.data.token);
        this.setUserInfo(data.data);
        return Promise.resolve(data);
      } catch (err: any) {
        return Promise.reject(err);
      }
    },

    /**
     * @description 注册
     */
    async register(params: any): Promise<any> {
      try {
        const { data } = await register(params);
        this.setToken(data.token);
        this.setUserInfo(data.user_info);
        return Promise.resolve(data);
      } catch (err: any) {
        return Promise.reject(err);
      }
    },

    /**
     * @description 登出
     */
    async loginOut(): Promise<any> {
      try {
        // const res = await logout();
        removeCache(TOKEN_KEY);
        clearCache();
        this.setToken(undefined);
        return Promise.resolve();
      } catch (err: any) {
        return Promise.reject(err);
      }
    },
    /**
     * @description 刷新token
     */
    // async refreshToken(): Promise<any> {
    //   try {
    //     const { data } = await refreshToken();
    //     this.setToken(data.token);
    //     return Promise.resolve(data);
    //   } catch (err: any) {
    //     return Promise.reject(err);
    //   }
    // },
  },
});
