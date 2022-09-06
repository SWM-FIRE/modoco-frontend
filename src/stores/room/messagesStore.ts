import create from 'zustand';

interface MessageInterface {
  uid: number;
  nickname: string;
  avatar: number;
  message: string;
  createdAt: string;
  type: string; // 'message' || 'join' || 'leave'
  isHideTime: boolean;
  isHideNicknameAndAvatar: boolean;
}

interface Messages {
  messages: MessageInterface[];
  setMessages: (_messages: MessageInterface[]) => void;
  appendMessages: (_message: MessageInterface) => void;
}

const MessageStore = create<Messages>((set) => ({
  messages: [],
  setMessages: (by) => set(() => ({ messages: by })),
  appendMessages: (by) =>
    set((state) => ({ messages: [...state.messages, by] })),
}));

export default MessageStore;
