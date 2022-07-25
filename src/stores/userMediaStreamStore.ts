import create from 'zustand';

interface MediaStreamInterface {
  userMediaStream: MediaStream | null;
  setUserMediaStream: (_by: MediaStream | null) => void;
}
const UserMediaStreamStore = create<MediaStreamInterface>((set) => ({
  userMediaStream: null,
  setUserMediaStream: (by) => {
    set(() => ({ userMediaStream: by }));
  },
}));

export default UserMediaStreamStore;
