import create from 'zustand';

interface Modal {
  isOpenLoginModal: boolean;
  closeLoginModal: () => void;
  openLoginModal: () => void;
  isOpenProfileModal: boolean;
  closeProfileModal: () => void;
  openProfileModal: () => void;
}
const mainModalStore = create<Modal>((set) => ({
  isOpenLoginModal: false,
  closeLoginModal: () => set(() => ({ isOpenLoginModal: false })),
  openLoginModal: () => set(() => ({ isOpenLoginModal: true })),
  isOpenProfileModal: false,
  closeProfileModal: () => set(() => ({ isOpenProfileModal: false })),
  openProfileModal: () => set(() => ({ isOpenProfileModal: true })),
}));

export default mainModalStore;
