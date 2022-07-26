// import create from 'zustand';
// import User from '../interface/user.interface';

// interface UserInterface {
//   uid: User;
// }

// interface connectUsers {
//   connectedUsers: UserInterface[];
//   setUsers: (_users: UserInterface[]) => void;
//   appendUser: (_user: UserInterface) => void;
//   removeUser: (_user: string) => void;
// }

// const connectUsersStore = create<connectUsers>((set) => ({
//   connectedUsers: [],
//   setUsers: (by) => set(() => ({ connectedUsers: by })),
//   appendUser: (by) =>
//     set((state) => ({ connectedUsers: [...state.connectedUsers, by] })),
//   removeUser: (by) =>
//     set((state) => ({
//       connectedUsers: state.connectedUsers.filter(
//         (user) => user.socketId !== by,
//       ),
//     })),
// }));

// export default connectUsersStore;
