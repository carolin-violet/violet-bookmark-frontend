export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  id?: string;
  username?: string;
  password?: string;
  role: RoleType;
  gender?: number;
  email?: string;
  open?: number;
  create_time?: string;
}
