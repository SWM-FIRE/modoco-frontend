/* eslint-disable no-unused-vars */
import create from 'zustand';
import { newMessageInterface } from 'src/interface/directMessage.interface';

export interface message {
  from: number;
  to: number;
  message: string;
  createdAt: string;
}

interface directMessage {
  messages: { [key: string]: newMessageInterface[] };
  setMessages: ({
    uid,
    messages,
  }: {
    uid: number;
    messages: newMessageInterface[];
  }) => void;
  appendMessage: ({
    uid,
    message,
  }: {
    uid: number;
    message: newMessageInterface;
  }) => void;
}

const directMessageStore = create<directMessage>((set, get) => ({
  messages: {},
  setMessages: (by) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [by.uid]: by.messages,
      },
    }));
  },
  appendMessage: (by) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [by.uid]: [by.message, ...state.messages[by.uid]],
      },
    }));
  },
}));

export default directMessageStore;
