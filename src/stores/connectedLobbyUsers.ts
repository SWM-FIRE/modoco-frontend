/* eslint-disable no-unused-vars */
import create from 'zustand';

interface User {
  nickname: string;
  uid: number;
  avatar: number;
  socketId: string;
}

interface connectedUsers {
  connectedUsers: User[];
  setUsers: (_users: User[]) => void;
  appendUser: (_user: User) => void;
  removeUser: (_user: string) => void;
  findUserBySid: (_socketId: string) => User;
  findUserByUid: (_uid: number) => User;
}
const connectedLobbyUsers = create<connectedUsers>((set, get) => ({
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

export default connectedLobbyUsers;
