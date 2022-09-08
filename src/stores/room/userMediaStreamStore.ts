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
  userAudioInputDevice: MediaDeviceInfo | null;
  setUserAudioInputDevice: (_by: MediaDeviceInfo | null) => void;
  userAudioOutputDevice: MediaDeviceInfo | null;
  setUserAudioOutputDevice: (_by: MediaDeviceInfo | null) => void;
  userVideoInputDevice: MediaDeviceInfo | null;
  setUserVideoInputDevice: (_by: MediaDeviceInfo | null) => void;
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
  userAudioInputDevice: null,
  setUserAudioInputDevice: (by) => {
    set(() => ({ userAudioInputDevice: by }));
  },
  userAudioOutputDevice: null,
  setUserAudioOutputDevice: (by) => {
    set(() => ({ userAudioOutputDevice: by }));
  },
  userVideoInputDevice: null,
  setUserVideoInputDevice: (by) => {
    set(() => ({ userVideoInputDevice: by }));
  },
}));

export default UserMediaStreamStore;
