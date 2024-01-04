import axios from 'axios';

const { CancelToken } = axios;
export const source = CancelToken.source();

export function exportData() {
  return axios.get<any>('/file/export', {
    responseType: 'blob',
  });
}

export function importData(data: any, progressHandler: any) {
  return axios.post<any>('/file/import', data, {
    cancelToken: source.token,
    // onUploadProgress: (progressEvent) => progressHandler(progressEvent),
  });
}
