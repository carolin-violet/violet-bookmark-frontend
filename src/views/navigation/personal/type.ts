import type { INavListItem } from '@/api/navigation';

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
