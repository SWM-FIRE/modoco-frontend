import create from 'zustand';

interface Modal {
  isOpenCreateRoomModal: boolean;
  closeModal: () => void;
  openModal: () => void;
}
const ModalStore = create<Modal>((set) => ({
  isOpenCreateRoomModal: false,
  closeModal: () => set(() => ({ isOpenCreateRoomModal: false })),
  openModal: () => set(() => ({ isOpenCreateRoomModal: true })),
}));

export default ModalStore;
