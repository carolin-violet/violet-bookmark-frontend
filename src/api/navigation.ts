import axios from 'axios';

import type { PageResponse, PageRequest } from '@/types/global';

// 获取导航列表

export interface Navigation {
  id: number;
  categoryId: number;
  name: string;
  url: string;
  description: string;
  ladder: number;
}

export interface NavigationParam extends PageRequest {
  pageNum: number;
  pageSize: number;
  name: string;
  categoryId: number;
}

const prefix = `${import.meta.env.VITE_API_NAVIGATION_PREFIX}/bookmark-core`;

/**
 *  获取导航列表
 * @param params
 * @returns
 */
export function getNavigationList(params: Partial<NavigationParam>) {
  return axios.get<PageResponse<Navigation>>(`${prefix}/navigation/list`, {
    params,
  });
}

/**
 *  获取导航详情
 * @param id
 * @returns
 */
export function getNavigationById(id: number) {
  return axios.get<Partial<Navigation>>(`${prefix}/navigation/${id}`);
}

/**
 *  创建导航
 * @param data
 * @returns
 * */
export function createNavigation(data: Partial<Navigation>) {
  return axios.post<boolean>(`${prefix}/navigation/add`, data);
}

/**
 *  更新导航
 * @param data
 * @returns
 */
export function updateNavigation(data: Partial<Navigation>) {
  return axios.put<boolean>(`${prefix}/navigation/update`, data);
}

/**
 *  删除导航
 * @param id
 * @returns
 */
export function delNavigation(id: number) {
  return axios.delete<null>(`${prefix}/navigation/${id}`);
}
