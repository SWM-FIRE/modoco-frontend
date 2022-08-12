/* eslint-disable no-unused-vars */
import create from 'zustand';

interface VideoUserInterface {
  nickname: string;
  uid: string;
  avatar: string;
  socketId: string;
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
  findUser: (_socketId: string) => VideoUserInterface;
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
  findUser: (by) => {
    const user = get().connectedUsers.filter((user) => user.socketId === by)[0];
    return user;
  },
}));

export default connectedUsersStore;
