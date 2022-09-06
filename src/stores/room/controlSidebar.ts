import create from 'zustand';

interface Sidebar {
  isOpenSidebar: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}
const SidebarStore = create<Sidebar>((set) => ({
  isOpenSidebar: false,
  openSidebar: () => set(() => ({ isOpenSidebar: true })),
  closeSidebar: () => set(() => ({ isOpenSidebar: false })),
}));

export default SidebarStore;
