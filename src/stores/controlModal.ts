import create from 'zustand';

interface Modal {
  nickname: string;
  avatar: string;
  uid: string;
  setNickname: (_by: string) => void;
  setAvatar: (_by: string) => void;
  setUid: (_by: string) => void;
  isOpen: boolean;
  toggleModal: () => void;
}
const ModalStore = create<Modal>((set) => ({
  nickname: '',
  avatar: '',
  uid: '',
  setNickname: (by) => set(() => ({ nickname: by })),
  setAvatar: (by) => set(() => ({ avatar: by })),
  setUid: (by) => set(() => ({ uid: by })),
  isOpen: false,
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default ModalStore;
