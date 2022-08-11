import create from 'zustand';

interface User {
  avatar: number;
  nickname: string;
  uid: string;
  setNickname: (_by: string) => void;
  setUid: (_by: string) => void;
  setAvatar: (_by: number) => void;
  setClear: () => void;
}
const UserStore = create<User>((set) => ({
  nickname: '',
  uid: '',
  avatar: 1,
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

export default UserStore;
