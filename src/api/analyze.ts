import axios from 'axios';

export interface DashboardCounts {
  categoryNum: number;
  subCategoryNum: number;
  websiteNum: number;
}

export type DashboardWordCloudItem = [string, number];

const prefix = `${import.meta.env.VITE_API_BOOKMARK_PREFIX}`;

export function getDashboardCounts() {
  return axios.get<DashboardCounts>(`${prefix}/analyze/dashboard/counts`, {});
}

export function getDashboardWordCloud() {
  return axios.get<Array<DashboardWordCloudItem>>(
    `${prefix}/analyze/dashboard/wordCloud`,
    {}
  );
}
