export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  token?: string;
  id: string;
  userAvatar?: string;
  userName?: string;
  userProfile?: string;
  userRole: string;
  phone: string;
  email: string;
  createTime: string;
}
