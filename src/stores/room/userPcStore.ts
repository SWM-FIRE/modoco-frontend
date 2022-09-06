/* eslint-disable no-unused-vars */
import create from 'zustand';

interface PC {
  pcs: { [key: string]: RTCPeerConnection | null };
  setPc: ({
    sid,
    peerConnection,
  }: {
    sid: string;
    peerConnection: RTCPeerConnection;
  }) => void;
  emptyPc: () => void;
}
const userPcStore = create<PC>((set) => ({
  pcs: {},
  setPc: (by) => {
    set((state) => ({
      pcs: {
        ...state.pcs,
        [by.sid]: by.peerConnection,
      },
    }));
  },
  emptyPc: () => {
    set(() => ({}));
  },
}));

export default userPcStore;
