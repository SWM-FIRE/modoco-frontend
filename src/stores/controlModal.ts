import create from 'zustand';

interface Modal {
  nickname: string;
  avatar: string;
  setNickname: (_by: string) => void;
  setAvatar: (_by: string) => void;
  isOpen: boolean;
  toggleModal: () => void;
}
const ModalStore = create<Modal>((set) => ({
  nickname: '',
  avatar: '',
  setNickname: (by) => set(() => ({ nickname: by })),
  setAvatar: (by) => set(() => ({ avatar: by })),
  isOpen: false,
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default ModalStore;
