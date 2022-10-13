import create from 'zustand';

interface Modal {
  isOpenLoginModal: boolean;
  closeLoginModal: () => void;
  openLoginModal: () => void;
  isOpenProfileModal: boolean;
  closeProfileModal: () => void;
  openProfileModal: () => void;
  isOpenNoticeModal: boolean;
  closeNoticeModal: () => void;
  openNoticeModal: () => void;
}

const mainModalStore = create<Modal>((set) => ({
  isOpenLoginModal: false,
  closeLoginModal: () => set(() => ({ isOpenLoginModal: false })),
  openLoginModal: () => set(() => ({ isOpenLoginModal: true })),
  isOpenProfileModal: false,
  closeProfileModal: () => set(() => ({ isOpenProfileModal: false })),
  openProfileModal: () => set(() => ({ isOpenProfileModal: true })),
  isOpenNoticeModal: true,
  closeNoticeModal: () => set(() => ({ isOpenNoticeModal: false })),
  openNoticeModal: () => set(() => ({ isOpenNoticeModal: true })),
}));

export default mainModalStore;
