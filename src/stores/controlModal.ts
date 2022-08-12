import create from 'zustand';

interface Modal {
  nickname: string;
  avatar: number;
  uid: string;
  setNickname: (_by: string) => void;
  setAvatar: (_by: number) => void;
  setUid: (_by: string) => void;
  isOpen: boolean;
  toggleModal: () => void;
}
const ModalStore = create<Modal>((set) => ({
  nickname: '',
  avatar: 1,
  uid: '',
  setNickname: (by) => set(() => ({ nickname: by })),
  setAvatar: (by) => set(() => ({ avatar: by })),
  setUid: (by) => set(() => ({ uid: by })),
  isOpen: false,
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default ModalStore;
