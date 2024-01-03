import axios from 'axios';

export function exportData() {
  return axios.get<any>('/file/export', {
    responseType: 'blob',
  });
}

export function importData(data: any) {
  return axios.post<any>('/file/import', data);
}
