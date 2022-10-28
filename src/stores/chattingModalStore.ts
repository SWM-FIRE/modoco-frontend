import create from 'zustand';

interface Modal {
  chattingFriend: number;
  setChattingFriend: (_by: number) => void;
  isChattingModal: boolean;
  closeChattingModal: () => void;
  openChattingModal: () => void;
}

const chattingModalStore = create<Modal>((set) => ({
  chattingFriend: -1,
  setChattingFriend: (by) => set(() => ({ chattingFriend: by })),
  isChattingModal: false,
  closeChattingModal: () => set(() => ({ isChattingModal: false })),
  openChattingModal: () => set(() => ({ isChattingModal: true })),
}));

export default chattingModalStore;
