import create from 'zustand';

interface receiveNew {
  isReceiveNewMessage: boolean;
  isAlarmToggle: boolean;
  setIsReceiveNewMessage: (_by: boolean) => void;
  setIsAlarmToggle: () => void;
}
const receiveNewMessageStore = create<receiveNew>((set) => ({
  isReceiveNewMessage: false,
  isAlarmToggle: false,
  setIsReceiveNewMessage: (state: boolean) =>
    set(() => ({ isReceiveNewMessage: state })),
  setIsAlarmToggle: () =>
    set((state) => ({ isAlarmToggle: !state.isAlarmToggle })),
}));

export default receiveNewMessageStore;
