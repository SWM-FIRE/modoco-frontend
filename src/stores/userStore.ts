import create from 'zustand';

interface User {
  avatar: number;
  nickname: string;
  uid: number;
  time: number;
  company: string;
  group: [string];
  badge: [string];
  setNickname: (_by: string) => void;
  setTime: (_by: number) => void;
  setUid: (_by: number) => void;
  setAvatar: (_by: number) => void;
  setCompany: (_by: string) => void;
  setGroup: (_by: []) => void;
  setBadge: (_by: []) => void;
  setClear: () => void;
}
const userStore = create<User>((set) => ({
  nickname: '',
  uid: -1,
  avatar: 1,
  time: 0,
  company: 'naver',
  group: ['soma'],
  badge: ['씨앗1'],
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
  setCompany: (by) => {
    set(() => ({ company: by }));
  },
  setGroup: (by) => {
    set((state) => ({ group: [...state.group], by }));
  },
  setBadge: (by) => {
    set((state) => ({ badge: [...state.badge], by }));
  },
  setClear: () => {
    set(() => ({
      nickname: '',
      uid: 0,
      avatar: 1,
    }));
  },
}));

export default userStore;
