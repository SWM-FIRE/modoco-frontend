import create from 'zustand';

interface User {
  avatar: number;
  nickname: string;
  uid: number;
  time: number;
  isLogin: boolean;
  setNickname: (_by: string) => void;
  setTime: (_by: number) => void;
  setUid: (_by: number) => void;
  setAvatar: (_by: number) => void;
  setClear: () => void;
  setLogin: (_by: boolean) => void;
}
const userStore = create<User>((set) => ({
  nickname: '',
  uid: -1,
  avatar: 1,
  time: 0,
  description: 'this is description test',
  group: ['soma'],
  badge: ['씨앗1'],
  isLogin: false,
  setTime: (_by: number) => set(() => ({ time: _by })),
  setNickname: (by) => {
    set(() => ({ nickname: by }));
  },
  setUid: (by) => {
    set(() => ({ uid: by }));
  },
  setAvatar: (by) => {
    set(() => ({ avatar: by }));
  },
  setClear: () => {
    set(() => ({
      nickname: '',
      uid: 0,
      avatar: 1,
    }));
  },
  setLogin: (by) => {
    set(() => ({ isLogin: by }));
  },
}));

export default userStore;
