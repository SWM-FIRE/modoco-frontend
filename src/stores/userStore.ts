import create from 'zustand';

interface User {
  avatar: number;
  nickname: string;
  uid: string;
  setNickname: (_by: string) => void;
  setUid: (_by: string) => void;
  setAvatar: (_by: number) => void;
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
}));

export default UserStore;
