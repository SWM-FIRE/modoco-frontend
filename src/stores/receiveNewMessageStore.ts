import create from 'zustand';

interface receiveNew {
  isReceiveNewMessage: boolean;
  setIsReceiveNewMessage: (_state: boolean) => void;
}
const receiveNewMessageStore = create<receiveNew>((set) => ({
  isReceiveNewMessage: false,
  setIsReceiveNewMessage: (state: boolean) =>
    set(() => ({ isReceiveNewMessage: state })),
}));

export default receiveNewMessageStore;
