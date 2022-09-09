/* eslint-disable no-unused-vars */
import create from 'zustand';

interface VideoUserInterface {
  nickname: string;
  uid: number;
  avatar: number;
  socketId: string;
  enabledVideo: boolean;
  enabledAudio: boolean;
  isAlreadyEntered: boolean;
}

interface connectedUsers {
  connectedUsers: VideoUserInterface[];
  userStream: { [key: string]: MediaStream | null };
  setUserStream: ({
    sid,
    stream,
  }: {
    sid: string;
    stream: MediaStream;
  }) => void;
  setUsers: (_users: VideoUserInterface[]) => void;
  appendUser: (_user: VideoUserInterface) => void;
  removeUser: (_user: string) => void;
  findUserBySid: (_socketId: string) => VideoUserInterface;
  findUserByUid: (_uid: number) => VideoUserInterface;
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
      connectedUsers: state.connectedUsers.filter(
        (user) => user.socketId !== by,
      ),
    })),
  findUserBySid: (by) => {
    const returnUser = get().connectedUsers.find(
      (user) => user.socketId === by,
    );
    return returnUser;
  },
  findUserByUid: (by) => {
    const returnUser = get().connectedUsers.find((user) => user.uid === by);
    return returnUser;
  },
}));

export default connectedUsersStore;
