import create from 'zustand';

interface Modal {
  isOpenLoginModal: boolean;
  setLoginModal: (_type: boolean) => void;
}

const loginModalStore = create<Modal>((set) => ({
  isOpenLoginModal: false,
  setLoginModal: (type) => {
    set({
      isOpenLoginModal: type,
    });
  },
}));

export default loginModalStore;
