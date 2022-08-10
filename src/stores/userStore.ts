import create from 'zustand';

interface User {
  avatar: number;
  nickname: string;
  uid: string;
  token: string;
  setNickname: (_by: string) => void;
  setUid: (_by: string) => void;
  setAvatar: (_by: number) => void;
  setToken: (_by: string) => void;
}
const UserStore = create<User>((set) => ({
  nickname: '',
  uid: '',
  avatar: 1,
  token: '',
  setNickname: (by) => {
    set(() => ({ nickname: by }));
  },
  setUid: (by) => {
    set(() => ({ uid: by }));
  },
  setAvatar: (by) => {
    set(() => ({ avatar: by }));
  },
  setToken: (by) => {
    set(() => ({ token: by }));
  },
}));

export default UserStore;
