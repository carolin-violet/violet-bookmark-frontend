import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';

export interface LoginData {
  userAccount: string;
  userPassword: string;
}

export interface UserState {
  token: string;
  id: string;
  userAvatar: string;
  userName: string;
  userProfile: string;
  userRole: string;
  phone: string;
  email: string;
  createTime: string;
}

export interface DeleteData {
  id: string;
}

export interface UserQueryRequest {
  id: string;
  userName?: string;
  userProfile?: string;
  userRole: string;
}

const prefix: string = import.meta.env.VITE_API_USER_CENTER_PREFIX;
// const prefix: string = import.meta.env.VITE_API_NAVIGATION_PREFIX;

/**
 * 登录
 * @param data
 * @returns
 */
export function login(data: LoginData) {
  return axios.post<Partial<UserState>>(`${prefix}/user/login`, data);
}

/**
 * 注册
 * @param data
 * @returns
 */
export function register(data: Partial<UserState>) {
  return axios.post<number>(`${prefix}/user/register`, data);
}

/**
 * 退出登录
 * @returns
 */
export function logout() {
  return axios.post<Partial<UserState>>(`${prefix}/user/logout`);
}

/**
 * 获取当前登录用户信息
 * @returns
 */
export function getUserInfo() {
  return axios.get<Partial<UserState>>(`${prefix}/user/info`);
}

export function getMenuList() {
  return axios.get<RouteRecordNormalized[]>(`${prefix}/user/menu`);
}

/**
 * 用户更新自己的信息
 * @param data
 * @returns
 */
export function updatePersonalInfo(data: UserState) {
  return axios.put<boolean>(`${prefix}/user/update/my`, data);
}

/**
 * 用户更新自己的密码
 * @param data
 * @returns
 */
export function updatePersonalPassword(data: UserState) {
  return axios.put<boolean>(`${prefix}/user/edit/password/my`, data);
}
