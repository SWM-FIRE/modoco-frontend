import create from 'zustand';

interface SearchInput {
  searchInput: string;
  setSearchInput: (_by: string) => void;
}
const SearchInputStore = create<SearchInput>((set) => ({
  searchInput: '',
  setSearchInput: (by) => {
    set(() => ({ searchInput: by }));
  },
}));

export default SearchInputStore;
