import create from 'zustand';

interface Tag {
  tag: string;
  setTag: (_by: string) => void;
}
const TagStore = create<Tag>((set) => ({
  tag: '',
  setTag: (by) => {
    set(() => ({ tag: by }));
  },
}));

export default TagStore;
