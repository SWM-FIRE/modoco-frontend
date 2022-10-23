import create from 'zustand';
import youtubeSearch from '../../interface/youtubeSearch.interface';

interface Music {
  type: string;
  setType: (_type: 'youtube' | 'theme') => void;
  playlist: youtubeSearch[];
  addPlaylist: (_item: youtubeSearch) => void;
  removePlaylist: (_item: youtubeSearch) => void;
  isInPlaylist: (_item: youtubeSearch) => boolean;
  searchList: youtubeSearch[];
  setSearchList: (_searchList: youtubeSearch[]) => void;
}

const MusicStore = create<Music>((set, get) => ({
  type: 'theme',
  setType: (by) => set(() => ({ type: by })),
  playlist: [],
  addPlaylist: (item) =>
    set((state) => ({ playlist: [...state.playlist, item] })),
  removePlaylist: (item) =>
    set((state) => ({
      playlist: state.playlist.filter((i) => i.id !== item.id),
    })),
  isInPlaylist: (item) => {
    return get().playlist.findIndex((i) => i.id === item.id) !== -1;
  },
  searchList: [],
  setSearchList: (by) => set(() => ({ searchList: [...by] })),
}));

export default MusicStore;
