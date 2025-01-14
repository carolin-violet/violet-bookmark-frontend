import axios from 'axios';
import type { Navigation } from '@/api/navigation';
import type { PageResponse, PageRequest } from '@/types/global';

/** 导航分类类型 */

export interface Category {
  id: number;
  userId: number;
  parentId: number;
  name: string;
  icon: string;
  openness: 0 | 1;
  create_time: string;
  update_time: string;
}

export interface TreeCategoryNode extends Category {
  children: TreeCategoryNode[];
  navigation: Partial<Navigation>[];
  isLeaf: boolean;
}

export interface CategoryOption {
  id?: number;
  name?: string;
}

export interface CategoryParam extends PageRequest {
  id: number;
  userId: number;
  parentId: number;
  name: string;
  icon: string;
  openness: number;
  create_time: string;
  update_time: string;
}

const prefix = `${import.meta.env.VITE_API_BOOKMARK_PREFIX}/core`;

/**
 * 获取分类列表
 * @param params 查询条件
 * @returns 分类列表
 */
export function getCategoryList(params: Partial<CategoryParam>) {
  return axios.get<PageResponse<Category>>(`${prefix}/category/list`, {
    params,
  });
}

/**
 * 根据一级分类id获取对应的二级分类列表及所有站点导航
 * @param topCategoryId
 * @returns
 */
export function getSubCategoryAndWebsites(topCategoryId: number) {
  return axios.get<TreeCategoryNode[]>(
    `${prefix}/category/${topCategoryId}/subCategoryWebsites`
  );
}

export function getAllCategory() {
  return axios.get<TreeCategoryNode[]>(`${prefix}/category/all`);
}

/**
 * 获取分类详情
 * @param id 分类ID
 * @returns 分类详情
 */
export function getCategoryById(id: number) {
  return axios.get<Category>(`${prefix}/category/${id}`);
}

/**
 * 创建分类
 * @param data 分类数据
 * @returns 是否创建成功
 */
export function createCategory(data: Partial<Category>) {
  return axios.post<boolean>(`${prefix}/category/add`, data);
}

/**
 * 更新分类
 * @param data 分类数据
 * @returns 是否更新成功
 */
export function updateCategory(data: Partial<Category>) {
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
