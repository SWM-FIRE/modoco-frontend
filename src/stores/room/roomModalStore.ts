import create from 'zustand';

interface Modal {
  screenModal: boolean;
  toggleScreenModal: () => void;
  settingModal: boolean;
  toggleSettingModal: () => void;
  sidebarModal: boolean;
  toggleSidebarModal: () => void;
  profileModal: boolean;
  toggleProfileModal: () => void;
  sideProfileModal: boolean;
  toggleSideProfileModal: () => void;
  screenUid: number;
  setScreenUid: (_uid: number) => void;
}

const roomModalStore = create<Modal>((set) => ({
  screenModal: false,
  toggleScreenModal: () =>
    set((state) => ({ screenModal: !state.screenModal })),
  settingModal: false,
  toggleSettingModal: () =>
    set((state) => ({ settingModal: !state.settingModal })),
  sidebarModal: false,
  toggleSidebarModal: () =>
    set((state) => ({ sidebarModal: !state.sidebarModal })),
  profileModal: false,
  toggleProfileModal: () =>
    set((state) => ({ profileModal: !state.profileModal })),
  sideProfileModal: false,
  toggleSideProfileModal: () =>
    set((state) => ({ sideProfileModal: !state.sideProfileModal })),
  screenUid: 0,
  setScreenUid: (by) => set(() => ({ screenUid: by })),
}));

export default roomModalStore;
