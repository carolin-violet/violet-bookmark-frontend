/** 导航站点类型 */
export interface INavListItem {
  id?: string;
  cat_id?: String;
  name?: string;
  url?: string;
  description?: string;
  ladder?: boolean;
}

/** 导航分类类型 */
export interface ICategoryListItem {
  id?: string;
  user_id?: string;
  name?: string;
  parent_id?: string;
  create_time?: string;
}

/** 树节点类型 */
export interface INodeDataItem {
  id?: string;
  name?: string;
  user_id?: string;
  parent_id?: string;
  create_time?: string;
  children?: INodeDataItem[];
  navigation?: INavListItem[];
}
