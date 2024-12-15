import axios from 'axios';
import type { INavListItem } from '@/api/navigation';

/** 导航分类类型 */

export interface ICategoryListItem {
  id?: string;
  user_id?: string;
  name?: string;
  parentId?: number;
  create_time?: string;
  children?: ICategoryListItem[];
  navigation?: INavListItem[];
  isLeaf?: boolean;
}

export interface CATEGORY {
  id: string;
  user_id: string;
  name: string;
  parentId: string | number;
  create_time: string;
  children: ICategoryListItem[];
  navigation: INavListItem[];
  isLeaf: boolean;
}

export interface CategoryOption {
  id?: string;
  name?: string;
}

export interface CategoryRes {
  code: number;
  message: string;
  success: boolean;
  data?: ICategoryListItem;
}

const prefix: string = import.meta.env.VITE_API_NAVIGATION_PREFIX;

export function getCategoryList(parentId: string) {
  return axios.get<CATEGORY[]>(`${prefix}/category/list`, {
    params: {
      parentId,
    },
  });
}

export function createCategory(data: ICategoryListItem) {
  return axios.post<CategoryRes>(`${prefix}/category/add`, data);
}

export function updateCategory(data: ICategoryListItem) {
  return axios.put<CategoryRes>(`${prefix}/category/update`, data);
}

export function delCategory(id: string) {
  return axios.delete<null>(`${prefix}/category/delete/${id}`);
}
