import axios from 'axios';
import type { INavListItem } from '@/api/navigation';

/** 导航分类类型 */

export interface ICategoryListItem {
  id?: string;
  user_id?: string;
  name?: string;
  parent_id?: string | number;
  create_time?: string;
  children?: ICategoryListItem[];
  navigation?: INavListItem[];
  isLeaf?: boolean;
}

export interface CATEGORY {
  id: string;
  user_id: string;
  name: string;
  parent_id: string | number;
  create_time: string;
  children: ICategoryListItem[];
  navigation: INavListItem[];
  isLeaf: boolean;
}

export interface CategoryOption {
  id?: string;
  name?: string;
}

export function getCategoryList(parentId: string) {
  return axios.get<CATEGORY[]>('/category/list', {
    params: {
      parent_id: parentId,
    },
  });
}

export function createCategory(data: ICategoryListItem) {
  return axios.post<ICategoryListItem>('/category', data);
}

export function updateCategory(data: ICategoryListItem) {
  return axios.put<ICategoryListItem>(`/category/${data.id}`, data);
}

export function delCategory(id: string) {
  return axios.delete<null>(`/category/${id}`);
}
