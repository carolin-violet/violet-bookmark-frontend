import axios from 'axios';

export interface LoginData {
  userAccount: string;
  userPassword: string;
}

const prefix: string = import.meta.env.VITE_API_USER_CENTER_PREFIX;
// const prefix: string = import.meta.env.VITE_API_NAVIGATION_PREFIX;

/**
 * 登录
 * @param data
 * @returns
 */
export function ssoLogin(data: LoginData) {
  return axios.post<any>(`${prefix}/sso/doLogin`, data);
}
/**
 * 退出登录
 * @returns
 */
export function ssoLogout() {
  return axios.post<Partial<LoginData>>(`${prefix}/sso/logoutByDevice`);
}
