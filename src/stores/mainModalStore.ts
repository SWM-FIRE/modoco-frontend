// import create from 'zustand';

// interface Modal {
//   isOpenLoginModal: boolean;
//   closeLoginModal: () => void;
//   openLoginModal: () => void;
//   isOpenProfileModal: boolean;
//   closeProfileModal: () => void;
//   openProfileModal: () => void;
//   isOpenNoticeModal: boolean;
//   closeNoticeModal: () => void;
//   openNoticeModal: () => void;
//   isOpenRoomPasswordModal: boolean;
//   closeRoomPasswordModal: () => void;
//   openRoomPasswordModal: () => void;
//   isLobbyModal: boolean;
//   closeLobbyModal: () => void;
//   openLobbyModal: () => void;
// }

// const mainModalStore = create<Modal>((set) => ({
//   isOpenLoginModal: false,
//   closeLoginModal: () => set(() => ({ isOpenLoginModal: false })),
//   openLoginModal: () => set(() => ({ isOpenLoginModal: true })),
//   isOpenProfileModal: false,
//   closeProfileModal: () => set(() => ({ isOpenProfileModal: false })),
//   openProfileModal: () => set(() => ({ isOpenProfileModal: true })),
//   isOpenNoticeModal: true,
//   closeNoticeModal: () => set(() => ({ isOpenNoticeModal: false })),
//   openNoticeModal: () => set(() => ({ isOpenNoticeModal: true })),
//   isOpenRoomPasswordModal: false,
//   closeRoomPasswordModal: () => set(() => ({ isOpenRoomPasswordModal: false })),
//   openRoomPasswordModal: () => set(() => ({ isOpenRoomPasswordModal: true })),
//   isLobbyModal: false,
//   closeLobbyModal: () => set(() => ({ isLobbyModal: false })),
//   openLobbyModal: () => set(() => ({ isLobbyModal: true })),
// }));

// export default mainModalStore;
