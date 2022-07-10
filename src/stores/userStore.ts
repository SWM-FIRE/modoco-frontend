import create from 'zustand';

interface User {
  nickname: string;
  uid: string;
  setNickname: (_by: string) => void;
  setUid: (_by: string) => void;
}
const UserStore = create<User>((set) => ({
  nickname: '',
  uid: '',
  setNickname: (by) => {
    set(() => ({ nickname: by }));
  },
  setUid: (by) => {
    set(() => ({ uid: by }));
  },
}));

export default UserStore;
