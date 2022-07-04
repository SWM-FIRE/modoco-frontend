/* eslint-disable no-unused-vars */
import create from 'zustand';

interface ID {
  id: string;
  uid: string;
  setId: (by: string) => void;
  setUid: (by: string) => void;
}
const IdStore = create<ID>((set) => ({
  id: '',
  uid: '',
  setId: (by) => {
    set(() => ({ id: by }));
  },
  setUid: (by) => {
    set(() => ({ uid: by }));
  },
}));

export default IdStore;
