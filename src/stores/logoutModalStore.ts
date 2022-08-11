import create from 'zustand';

interface Modal {
  isOpenLogoutModal: boolean;
  toggleLogoutModal: () => void;
}
const LogoutModalStore = create<Modal>((set) => ({
  isOpenLogoutModal: false,
  toggleLogoutModal: () =>
    set((state) => ({ isOpenLogoutModal: !state.isOpenLogoutModal })),
}));

export default LogoutModalStore;
