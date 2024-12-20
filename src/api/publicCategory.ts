import axios from 'axios';

/** 导航分类类型 */

export interface PublicCategory {
  id: number;
  name: string;
  icon: string;
  create_time: string;
}

const prefix: string = import.meta.env.VITE_API_NAVIGATION_PREFIX;

/**
 * 获取分类列表
 * @param parentId 父级分类ID
 * @returns 分类列表
 */
export function getPublicCategoryList() {
  return axios.get<PublicCategory[]>(`${prefix}/publicCategory/list`);
}

/**
 * 获取分类详情
 * @param id 分类ID
 * @returns 分类详情
 */
export function getPublicCategoryById(id: number) {
  return axios.get<PublicCategory>(`${prefix}/publicCategory/${id}`);
}

/**
 * 创建分类
 * @param data 分类数据
 * @returns 是否创建成功
 */
export function createPublicCategory(data: PublicCategory) {
  return axios.post<boolean>(`${prefix}/publicCategory/add`, data);
}

/**
 * 更新分类
 * @param data 分类数据
 * @returns 是否更新成功
 */
export function updatePublicCategory(data: PublicCategory) {
  return axios.put<boolean>(`${prefix}/publicCategory/update`, data);
}

/**
 * 删除分类
 * @param id 分类ID
 * @returns 是否删除成功
 */
export function delPublicCategory(id: number) {
  return axios.delete<null>(`${prefix}/publicCategory/${id}`);
}
