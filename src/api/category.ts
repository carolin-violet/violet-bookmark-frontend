import axios from 'axios';
import type { Navigation } from '@/api/navigation';

/** 导航分类类型 */

export interface ICategoryListItem {
  id: number;
  userId: number;
  name: string;
  parentId: number;
  create_time: string;
  children: ICategoryListItem[];
  navigation: Partial<Navigation>[];
  isLeaf: boolean;
}

export interface CategoryOption {
  id?: number;
  name?: string;
}

const prefix: string = import.meta.env.VITE_API_NAVIGATION_PREFIX;

/**
 * 获取分类列表
 * @param parentId 父级分类ID
 * @returns 分类列表
 */
export function getCategoryList(parentId: number) {
  return axios.get<ICategoryListItem[]>(`${prefix}/category/list`, {
    params: {
      parentId,
    },
  });
}

/**
 * 获取分类详情
 * @param id 分类ID
 * @returns 分类详情
 */
export function getCategoryById(id: number) {
  return axios.get<ICategoryListItem>(`${prefix}/category/${id}`);
}

/**
 * 创建分类
 * @param data 分类数据
 * @returns 是否创建成功
 */
export function createCategory(data: ICategoryListItem) {
  return axios.post<boolean>(`${prefix}/category/add`, data);
}

/**
 * 更新分类
 * @param data 分类数据
 * @returns 是否更新成功
 */
export function updateCategory(data: ICategoryListItem) {
  return axios.put<boolean>(`${prefix}/category/update`, data);
}

/**
 * 删除分类
 * @param id 分类ID
 * @returns 是否删除成功
 */
export function delCategory(id: number) {
  return axios.delete<null>(`${prefix}/category/${id}`);
}
