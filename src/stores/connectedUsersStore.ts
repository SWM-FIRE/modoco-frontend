import create from 'zustand';
import UserInterface from '../interface/user.interface';

interface VideoUserInterface {
  user: UserInterface;
  socketId: string;
}

interface connectedUsers {
  connectedUsers: VideoUserInterface[];
  setUsers: (_users: VideoUserInterface[]) => void;
  appendUser: (_user: VideoUserInterface) => void;
  removeUser: (_user: VideoUserInterface) => void;
}
const connectedUsersStore = create<connectedUsers>((set) => ({
  connectedUsers: [],
  setUsers: (by) => set(() => ({ connectedUsers: by })),
  appendUser: (by) =>
    set((state) => ({ connectedUsers: [...state.connectedUsers, by] })),
  removeUser: (by) =>
    set((state) => ({
      connectedUsers: state.connectedUsers.filter((user) => user !== by),
    })),
}));

export default connectedUsersStore;
