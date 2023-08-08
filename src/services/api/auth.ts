import { request } from '@/utils/http';
import qs from 'qs';
enum api {
  LOGIN = '/api/user/login',
  LOGIN_OUT = '/logout',
  REGISTER = '/register',
  PAYMESSAGE = '/api/Transfer/index',
  SELECTBILL = '/api/Transfer/transferList',
  FORGET_PASSWORD = '/forgetPass',
  EXIT_PASSWORD = '/system/user/profile/updatePwd',
  EXIT_PHONE = '/system/user/profile',
  DEVICE_LIST = '/device/device/list',
  CODE = '/captchaImage',
  DEVICEMANAGEMENT_TABS = '/system/dict/data/type/dev_device_category',
  UPLOAD_FILE = '/common/upload',
  ADD_Per = '/system/user/onlySelectAllUser',
  ADD_Dep = '/system/dept/list',
}

/**
 * 注册
 * @param params
 */
export const register = (params: any) => request.post<API>(api.REGISTER, params, { custom: { auth: false } });

/**
 * 登录
 * @param params
 */
export const login = (params: any) => request.post<API>(api.LOGIN, params, { custom: { auth: false } });

/**
 * 忘记密码
 * @param params
 */
export const forgetPassword = (params: any) => request.post<API>(api.FORGET_PASSWORD, params, { custom: { auth: false } });

//修改密码
export const exitPassword = (params: any) => request.put<API>(`${api.EXIT_PASSWORD}?${qs.stringify(params)}`, params);

//修改手机号
export const exitPhone = (params: any) => request.put<API>(`${api.EXIT_PHONE}?${qs.stringify(params)}`, params);

//获取用户信息
export const getUserInfo = (params: any) => request.get<API>(`${api.EXIT_PHONE}?${qs.stringify(params)}`);

// 登出
export const logout = () => request.post<API>(api.LOGIN_OUT, {});

// 查询设备、包括特种设备
export const deviceList = (data: any) => request.get<API>(`${api.DEVICE_LIST}?${qs.stringify(data)}`);

// 获取验证码
export const code = (data: any) => request.get<API>(`${api.CODE}?${qs.stringify(data)}`, { custom: { auth: false } });

// 设备管理头部tabs
export const deviceManagementTabs = (data: any) => request.get<API>(`${api.DEVICEMANAGEMENT_TABS}?${qs.stringify(data)}`);

// 上传图片r接口
export const upLoadFile = (params: any) => request.post<API>(api.UPLOAD_FILE, params);

// 上传图片r接口
export const transPayment = (params: any) => request.post<API>(api.UPLOAD_FILE, params);

//填写缴费内容
export const payMessage = (params: any) => request.post<API>(api.PAYMESSAGE, params);

//查询缴费账单
export const selectBill = (data: any) => request.get<API>(`${api.SELECTBILL}?${qs.stringify(data)}`);
