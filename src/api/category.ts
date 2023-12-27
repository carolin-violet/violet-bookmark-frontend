import axios from 'axios';

/** 导航分类类型 */
export interface CATEGORY {
  id: string;
  user_id: string;
  name: string;
  parent_id: string;
  create_time: string;
}
export type ICategoryListItem = Partial<CATEGORY>;

export interface CategoryOption {
  id: string;
  name: string;
}

export function getCategoryList(parentId: string) {
  return axios.get<CATEGORY[]>('/category/list', {
    params: {
      parent_id: parentId,
    },
  });
}

export function createCategory(data: CategoryOption) {
  return axios.post<CATEGORY>('/category', data);
}

export function updateCategory(data: CATEGORY) {
  return axios.put<CATEGORY>(`/category/${data.id}`, data);
}

export function delCategory(id: string) {
  return axios.delete<null>(`/category/${id}`);
}
