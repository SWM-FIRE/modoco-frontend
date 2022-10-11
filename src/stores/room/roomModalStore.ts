import create from 'zustand';

interface Modal {
  screenModal: boolean;
  toggleScreenModal: () => void;
  settingModal: boolean;
  toggleSettingModal: () => void;
  sidebarModal: boolean;
  toggleSidebarModal: () => void;
  inviteModal: boolean;
  toggleInviteModal: () => void;
  inviteCode: string;
  setInviteCode: (_by: string) => void;
  profileUid: number;
  setProfileUid: (_by: number) => void;
  profileModal: boolean;
  toggleProfileModal: () => void;
  sideProfileModal: boolean;
  toggleSideProfileModal: () => void;
  screenUid: number;
  setScreenUid: (_uid: number) => void;
  codeModal: boolean;
  toggleCodeModal: () => void;
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
  inviteModal: false,
  toggleInviteModal: () =>
    set((state) => ({ inviteModal: !state.inviteModal })),
  inviteCode: '',
  setInviteCode: (by: string) => set(() => ({ inviteCode: by })),
  profileUid: -1,
  setProfileUid: (by: number) => set(() => ({ profileUid: by })),
  profileModal: false,
  toggleProfileModal: () =>
    set((state) => ({ profileModal: !state.profileModal })),
  sideProfileModal: false,
  toggleSideProfileModal: () =>
    set((state) => ({ sideProfileModal: !state.sideProfileModal })),
  screenUid: 0,
  setScreenUid: (by) => set(() => ({ screenUid: by })),
  codeModal: false,
  toggleCodeModal: () => set((state) => ({ codeModal: !state.codeModal })),
}));

export default roomModalStore;
