/* eslint-disable no-unused-vars */
import create from 'zustand';
import videoUserInterface from 'src/interface/videoUser';

interface connectedUsers {
  connectedUsers: videoUserInterface[];
  userStream: { [key: string]: MediaStream | null };
  setUserStream: ({
    sid,
    stream,
  }: {
    sid: string;
    stream: MediaStream;
  }) => void;
  setUsers: (_users: videoUserInterface[]) => void;
  appendUser: (_user: videoUserInterface) => void;
  removeUser: (_user: string) => void;
  findUserBySid: (_sid: string) => videoUserInterface | null;
  findUserByUid: (_uid: number) => videoUserInterface | null;
  setEnabledAudioByUid: (_uid: number, _enabled: boolean) => void;
  setVolumeByUid: (_uid: number, _volume: number) => void;
  setNicknameByUid: (_uid: number, _nickname: string) => void;
  setAvatarByUid: (_uid: number, _avatar: number) => void;
  setSidByUid: (_uid: number, _sid: string) => void;
}
const connectedUsersStore = create<connectedUsers>((set, get) => ({
  connectedUsers: [],
  userStream: {},
  setUserStream: (by) => {
    set((state) => ({
      userStream: {
        ...state.userStream,
        [by.sid]: by.stream,
      },
    }));
  },
  setUsers: (by) => set(() => ({ connectedUsers: by })),
  appendUser: (by) =>
    set((state) => ({ connectedUsers: [...state.connectedUsers, by] })),
  removeUser: (by) =>
    set((state) => ({
      connectedUsers: state.connectedUsers.filter((user) => user.sid !== by),
    })),
  findUserBySid: (by) => {
    const returnUser = get().connectedUsers.find((user) => user.sid === by);
    if (!returnUser) return null;
    return returnUser;
  },
  findUserByUid: (by) => {
    const returnUser = get().connectedUsers.find((user) => user.uid === by);
    if (!returnUser) return null;
    return returnUser;
  },
  setEnabledAudioByUid: (uid, enabled) => {
    set((state) => ({
      connectedUsers: state.connectedUsers.map((user) => {
        if (user.uid === uid) {
          return { ...user, enabledAudio: enabled };
        }
        return user;
      }),
    }));
  },
  setVolumeByUid: (uid, volume) => {
    set((state) => ({
      connectedUsers: state.connectedUsers.map((user) => {
        if (user.uid === uid) {
          return { ...user, volume };
        }
        return user;
      }),
    }));
  },
  setNicknameByUid: (uid, nickname) => {
    set((state) => ({
      connectedUsers: state.connectedUsers.map((user) => {
        if (user.uid === uid) {
          return { ...user, nickname };
        }
        return user;
      }),
    }));
  },
  setAvatarByUid: (uid, avatar) => {
    set((state) => ({
      connectedUsers: state.connectedUsers.map((user) => {
        if (user.uid === uid) {
          return { ...user, avatar };
        }
        return user;
      }),
    }));
  },
  setSidByUid: (uid, sid) => {
    set((state) => ({
      connectedUsers: state.connectedUsers.map((user) => {
        if (user.uid === uid) {
          return { ...user, sid };
        }
        return user;
      }),
    }));
  },
}));

export default connectedUsersStore;
