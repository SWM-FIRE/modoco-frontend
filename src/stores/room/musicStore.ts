import create from 'zustand';

interface youtube {
  id: string;
  title: string;
}

interface Music {
  type: string;
  setType: (_type: 'youtube' | 'theme') => void;
  playlist: youtube[];
  addPlaylist: (_item: youtube) => void;
}

const MusicStore = create<Music>((set) => ({
  type: 'theme',
  setType: (by) => set(() => ({ type: by })),
  playlist: [{ id: 'default', title: 'default' }],
  addPlaylist: (by) => set((state) => ({ playlist: [...state.playlist, by] })),
}));

export default MusicStore;
