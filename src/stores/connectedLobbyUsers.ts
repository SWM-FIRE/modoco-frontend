/* eslint-disable no-unused-vars */
import create from 'zustand';
import { ConnectedUserInterface } from 'src/interface/user.interface';

interface connectedUsers {
  connectedUsers: ConnectedUserInterface[];
  setUsers: (_users: ConnectedUserInterface[]) => void;
  appendUser: (_user: ConnectedUserInterface) => void;
  removeUser: (_user: string) => void;
  findUserBySid: (_sid: string) => ConnectedUserInterface;
  findUserByUid: (_uid: number) => ConnectedUserInterface;
}
const connectedLobbyUsers = create<connectedUsers>((set, get) => ({
  connectedUsers: [],
  setUsers: (by) => set(() => ({ connectedUsers: by })),
  appendUser: (by) =>
    set((state) => ({ connectedUsers: [...state.connectedUsers, by] })),
  removeUser: (by) =>
    set((state) => ({
      connectedUsers: state.connectedUsers.filter((user) => user.sid !== by),
    })),
  findUserBySid: (by) => {
    const returnUser = get().connectedUsers.find((user) => user.sid === by);
    if (returnUser) return returnUser;
    return null;
  },
  findUserByUid: (by) => {
    const returnUser = get().connectedUsers.find((user) => user.uid === by);
    if (returnUser) return returnUser;
    return null;
  },
}));

export default connectedLobbyUsers;
