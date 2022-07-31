import create from 'zustand';

interface MediaStreamInterface {
  userMediaStream: MediaStream | null;
  setUserMediaStream: (_by: MediaStream | null) => void;
  userMic: boolean;
  setUserMic: () => void;
  userVideo: boolean;
  setUserVideo: () => void;
  userSpeaker: boolean;
  setUserSpeaker: () => void;
}

const UserMediaStreamStore = create<MediaStreamInterface>((set) => ({
  userMediaStream: null,
  setUserMediaStream: (by) => {
    set(() => ({ userMediaStream: by }));
  },
  userMic: true,
  setUserMic: () => {
    set((state) => ({ userMic: !state.userMic }));
  },
  userVideo: false,
  setUserVideo: () => {
    set((state) => ({ userVideo: !state.userVideo }));
  },
  userSpeaker: true,
  setUserSpeaker: () => {
    set((state) => ({ userSpeaker: !state.userSpeaker }));
  },
}));

export default UserMediaStreamStore;
