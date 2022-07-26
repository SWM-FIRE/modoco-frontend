import create from 'zustand';

interface VideoUserInterface {
  nickname: string;
  uid: string;
  avatar: string;
  socketId: string;
}

interface connectedUsers {
  connectedUsers: VideoUserInterface[];
  setUsers: (_users: VideoUserInterface[]) => void;
  appendUser: (_user: VideoUserInterface) => void;
  removeUser: (_user: string) => void;
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
}));

export default connectedUsersStore;
