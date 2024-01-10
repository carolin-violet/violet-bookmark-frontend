import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return axios.post<any>('/user/login', data);
}

export function logout() {
  return axios.post<any>('/user/logout');
}

export function getUserInfo() {
  return axios.get<any>('/user/info');
}

export function getMenuList() {
  // return axios.post<RouteRecordNormalized[]>('/user/menu');
  return axios.post<any>('/user/menu');
}
