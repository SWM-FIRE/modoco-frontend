import create from 'zustand';
import youtubeSearch from '../../interface/youtubeSearch.interface';

interface Music {
  type: string;
  setType: (_type: 'youtube' | 'theme') => void;
  playlist: youtubeSearch[];
  nowPlaying: number;
  setNowPlaying: (_nowPlaying: number) => void;
  addPlaylist: (_item: youtubeSearch) => void;
  removePlaylist: (_item: youtubeSearch) => void;
  isInPlaylist: (_item: youtubeSearch) => boolean;
  searchList: youtubeSearch[];
  setSearchList: (_searchList: youtubeSearch[]) => void;
  initPlaylist: () => void;
  initSearchList: () => void;
}

const MusicStore = create<Music>((set, get) => ({
  type: 'theme',
  setType: (by) => set(() => ({ type: by })),
  playlist: [],
  nowPlaying: 0,
  setNowPlaying: (by) => set(() => ({ nowPlaying: by })),
  addPlaylist: (item) =>
    set((state) => ({ playlist: [...state.playlist, item] })),
  removePlaylist: (item) =>
    set((state) => ({
      playlist: state.playlist.filter((i) => i.id !== item.id),
    })),
  isInPlaylist: (item) => {
    return (
      get().playlist.findIndex((i) => i.id.videoId === item.id.videoId) !== -1
    );
  },
  searchList: [],
  setSearchList: (by) => set(() => ({ searchList: [...by] })),
  initPlaylist: () => set(() => ({ playlist: [] })),
  initSearchList: () => set(() => ({ searchList: [] })),
}));

export default MusicStore;
