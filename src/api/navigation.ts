import axios from 'axios';

export interface Navigation {
  id: string;
  cat_id: string;
  name: string;
  url: string;
  description: string;
  ladder: number;
}

// 将Navigation所有字段定义为可选
export type INavListItem = Partial<Navigation>;

export interface NavigationParam {
  pageNum?: number;
  pageSize?: number;
  name?: string;
}

export interface NavigationRes {
  list: Navigation[];
  total: number;
}

export function getNavigationList(params: NavigationParam) {
  return axios.get<NavigationRes>('/navigation/list', { params });
}

export function getNavigation(id: string) {
  return axios.get<Navigation>(`/navigation/${id}`);
}

export function updateNavigation(data: Navigation) {
  return axios.put<Navigation>(`/navigation/${data.id}`, data);
}

export function delNavigation(id: string) {
  return axios.delete<null>(`/navigation/${id}`);
}
