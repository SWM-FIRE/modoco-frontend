import create from 'zustand';

interface Modal {
  isOpenLoginModal: boolean;
  closeModal: () => void;
  openModal: () => void;
}
const LoginModalStore = create<Modal>((set) => ({
  isOpenLoginModal: false,
  closeModal: () => set(() => ({ isOpenLoginModal: false })),
  openModal: () => set(() => ({ isOpenLoginModal: true })),
}));

export default LoginModalStore;
