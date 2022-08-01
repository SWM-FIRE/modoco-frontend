/* eslint-disable no-unused-vars */
import create from 'zustand';

interface VideoUserInterface {
  nickname: string;
  uid: string;
  avatar: string;
  socketId: string;
  stream: MediaStream | null;
}

interface connectedUsers {
  connectedUsers: VideoUserInterface[];
  setUsers: (_users: VideoUserInterface[]) => void;
  appendUser: (_user: VideoUserInterface) => void;
  removeUser: (_user: string) => void;
  updateMediaStream: ({
    socketId,
    stream,
  }: {
    socketId: string;
    stream: MediaStream;
  }) => void;
}
const connectedUsersStore = create<connectedUsers>((set) => ({
  connectedUsers: [],
  setUsers: (by) => set(() => ({ connectedUsers: by })),
  appendUser: (by) =>
    set((state) => ({ connectedUsers: [...state.connectedUsers, by] })),
  removeUser: (by) =>
    set((state) => ({
      connectedUsers: state.connectedUsers.filter(
        (user) => user.socketId !== by,
      ),
    })),
  updateMediaStream: (by) =>
    set((state) => ({
      connectedUsers: state.connectedUsers.map((user) => {
        if (user.socketId === by.socketId) {
          const newUser = user;
          return {
            nickname: newUser.nickname,
            uid: newUser.uid,
            avatar: newUser.avatar,
            socketId: newUser.socketId,
            stream: by.stream,
          };
        }
        return user;
      }),
    })),
}));

export default connectedUsersStore;
