import create from 'zustand';

interface MediaStreamInterface {
  userMediaStream: MediaStream | null;
  setUserMediaStream: (_by: MediaStream | null) => void;
  userMic: boolean;
  setUserMic: (_by: boolean) => void;
  userVideo: boolean;
  setUserVideo: (_by: boolean) => void;
  userSpeaker: boolean;
  setUserSpeaker: () => void;
}

const UserMediaStreamStore = create<MediaStreamInterface>((set) => ({
  userMediaStream: null,
  setUserMediaStream: async (by) => {
    set(() => ({ userMediaStream: by }));
  },
  userMic: true,
  setUserMic: (by) => {
    set(() => ({ userMic: by }));
  },
  userVideo: false,
  setUserVideo: (by) => {
    set(() => ({ userVideo: by }));
  },
  userSpeaker: true,
  setUserSpeaker: () => {
    set((state) => ({ userSpeaker: !state.userSpeaker }));
  },
}));

export default UserMediaStreamStore;
