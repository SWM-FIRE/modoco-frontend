import create from 'zustand';
import MessageInterface from '../interface/message.interface';

interface Messages {
  messages: MessageInterface[];
  setMessages: (_messages: MessageInterface[]) => void;
  appendMessages: (_message: MessageInterface) => void;
}

const lobbyMessageStore = create<Messages>((set) => ({
  messages: [],
  setMessages: (by) => set(() => ({ messages: by })),
  appendMessages: (by) =>
    set((state) => ({ messages: [...state.messages, by] })),
}));

export default lobbyMessageStore;
