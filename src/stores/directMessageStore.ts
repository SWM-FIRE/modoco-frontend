/* eslint-disable no-unused-vars */
import create from 'zustand';

export interface message {
  from: number;
  to: number;
  message: string;
  createdAt: string;
}

interface directMessage {
  messages: { [key: string]: message[] };
  setMessages: ({
    uid,
    messages,
  }: {
    uid: number;
    messages: message[];
  }) => void;
  appendMessage: ({ uid, message }: { uid: number; message: message }) => void;
}

const directMessageStore = create<directMessage>((set) => ({
  messages: {},
  setMessages: (by) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [by.uid]: by.messages,
      },
    }));
  },
  appendMessage: (by) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [by.uid]: [...state.messages[by.uid], by.message],
      },
    })),
}));

export default directMessageStore;
