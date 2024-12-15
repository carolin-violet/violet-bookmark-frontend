import axios from 'axios';

export interface Navigation {
  id: string;
  categoryId: string;
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
  categoryId?: string;
}

export interface NavigationRes {
  list: Navigation[];
  total: number;
}

const prefix: string = import.meta.env.VITE_API_NAVIGATION_PREFIX;

export function getNavigationList(params: NavigationParam) {
  return axios.get<NavigationRes>(`${prefix}/navigation/list`, { params });
}

export function createNavigation(data: Navigation) {
  return axios.post<any>(`${prefix}/navigation/add`, data);
}

export function updateNavigation(data: Navigation) {
  return axios.put<any>(`${prefix}/navigation/update`, data);
}

export function delNavigation(id: string) {
  return axios.delete<null>(`${prefix}/navigation/delete/${id}`);
}
