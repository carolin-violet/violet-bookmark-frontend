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

export function getCategoryList(parent_id: string = '-1') {
  return axios.get<CATEGORY[]>('/category/list', {
    params: {
      parent_id,
    },
  });
}

export function updateCategory(data: CATEGORY) {
  return axios.put<CATEGORY>(`/category/${data.id}`, data);
}

export function delCategory(id: String) {
  return axios.delete<null>(`/category/${id}`);
}
