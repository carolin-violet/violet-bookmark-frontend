export interface AnyObject {
  [key: string]: unknown;
}

export interface Options {
  value: unknown;
  label: string;
}

export interface NodeOptions extends Options {
  children?: NodeOptions[];
}

export interface GetParams {
  body: null;
  type: string;
  url: string;
}

export interface PostData {
  body: string;
  type: string;
  url: string;
}

export interface Pagination {
  current: number;
  pageSize: number;
  total?: number;
}

export type TimeRanger = [string, string];

export interface GeneralChart {
  xAxis: string[];
  data: Array<{ name: string; value: number[] }>;
}

export interface PageResponse<T> {
  total: number;
  size: number;
  current: number;
  pages: number;
  orders: string[];
  optimizeCountSql: boolean;
  searchCount: boolean;
  countId: number;
  maxLimit: number;
  records: T[];
}

export interface PageRequest {
  current: number;
  pageSize: number;
  sortFields: string;
  sortOrder: 'ascend' | 'descend';
}
