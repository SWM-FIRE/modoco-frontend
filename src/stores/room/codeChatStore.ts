import create from 'zustand';

interface Code {
  code: string;
  setCode: (_by: string) => void;
}

const codeChatStore = create<Code>((set) => ({
  code: '',
  setCode: (by) => {
    set(() => ({ code: by }));
  },
}));

export default codeChatStore;
