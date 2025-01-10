import axios from 'axios';

const { CancelToken } = axios;
export const source = CancelToken.source();

const prefix = `${import.meta.env.VITE_API_NAVIGATION_PREFIX}/bookmark-core`;

export function exportData() {
  return axios.get<any>(`${prefix}/file/export`);
}

export function importData(data: any, progressHandler: any) {
  return axios.post<any>(`${prefix}/file/import`, data, {
    cancelToken: source.token,
    // onUploadProgress: (progressEvent) => progressHandler(progressEvent),
  });
}
