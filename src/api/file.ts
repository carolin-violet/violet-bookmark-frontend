import axios from 'axios';

const { CancelToken } = axios;
export const source = CancelToken.source();

const prefix: string = import.meta.env.VITE_API_NAVIGATION_PREFIX;

export function exportData() {
  return axios.get<any>(`${prefix}/file/export`);
}

export function importData(data: any, progressHandler: any) {
  return axios.post<any>(`${prefix}/file/import`, data, {
    cancelToken: source.token,
    // onUploadProgress: (progressEvent) => progressHandler(progressEvent),
  });
}
