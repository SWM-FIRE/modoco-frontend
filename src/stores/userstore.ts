/* eslint-disable no-unused-vars */
import create from 'zustand';

interface User {
  nickname: string;
  uid: string;
  setNickname: (by: string) => void;
  setUid: (by: string) => void;
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
