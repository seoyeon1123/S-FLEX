import { atom } from 'recoil';

export interface User {
  email: string;
  name: string;
  password: string;
  success?: boolean;
}

export const userState = atom<User[]>({
  key: 'userState',
  default: [],
});
