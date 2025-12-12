import axios from 'axios';

import type { PageResponse, PageRequest } from '@/types/global';

// 获取导航列表

export interface Website {
  id: number;
  categoryId: number;
  name: string;
  url: string;
  description: string;
  ladder: number;
}

export interface WebsiteParam extends PageRequest {
  pageNum: number;
  pageSize: number;
  name: string;
  categoryId: number;
}

const prefix = `${import.meta.env.VITE_API_BOOKMARK_PREFIX}`;

/**
 *  获取导航列表
 * @param params
 * @returns
 */
export function getWebsiteList(params: Partial<WebsiteParam>) {
  return axios.get<PageResponse<Website>>(`${prefix}/website/list`, {
    params,
  });
}

/**
 *  获取导航详情
 * @param id
 * @returns
 */
export function getWebsiteById(id: number) {
  return axios.get<Partial<Website>>(`${prefix}/website/${id}`);
}

/**
 *  创建导航
 * @param data
 * @returns
 * */
export function createWebsite(data: Partial<Website>) {
  return axios.post<boolean>(`${prefix}/website/add`, data);
}

/**
 * 创建导航(通过url)
 * @param data
 * @returns
 * */
export function createWebsiteByUrl(data: Partial<Website>) {
  return axios.post<boolean>(`${prefix}/website/add/parse`, data);
}

/**
 *  更新导航
 * @param data
 * @returns
 */
export function updateWebsite(data: Partial<Website>) {
  return axios.put<boolean>(`${prefix}/website/update`, data);
}

/**
 *  删除导航
 * @param id
 * @returns
 */
export function delWebsite(id: number) {
  return axios.delete<null>(`${prefix}/website/${id}`);
}
