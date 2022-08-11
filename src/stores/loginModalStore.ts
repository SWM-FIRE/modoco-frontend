import create from 'zustand';

interface Modal {
  isOpenLoginModal: boolean;
  closeLoginModal: () => void;
  openLoginModal: () => void;
}
const LoginModalStore = create<Modal>((set) => ({
  isOpenLoginModal: false,
  closeLoginModal: () => set(() => ({ isOpenLoginModal: false })),
  openLoginModal: () => set(() => ({ isOpenLoginModal: true })),
}));

export default LoginModalStore;
