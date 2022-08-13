import create from 'zustand';

interface User {
  avatar: number;
  nickname: string;
  uid: string;
  time: number;
  setNickname: (_by: string) => void;
  setTime: (_by: number) => void;
  setUid: (_by: string) => void;
  setAvatar: (_by: number) => void;
  setClear: () => void;
}
const userStore = create<User>((set) => ({
  nickname: '',
  uid: '',
  avatar: 1,
  time: 0,
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
      uid: '',
      avatar: 1,
    }));
  },
}));

export default userStore;
