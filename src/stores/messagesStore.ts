import create from 'zustand';

interface MessageInterface {
  uid: string;
  nickname: string;
  avatar: string;
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

// setMessages((message) => [
//   ...message.map((m) => {
//     if (
//       m.uid === receiveMsg.sender &&
//       m.createdAt === receiveMsg.createdAt
//     ) {
//       return {
//         uid: m.uid,
//         nickname: m.nickname,
//         avatar: m.avatar,
//         message: m.message,
//         createdAt: m.createdAt,
//         type: 'message',
//         isHideTime: true,
//         isHideNicknameAndAvatar: m.isHideNicknameAndAvatar,
//       };
//     }
//     return m;
//   }),
//   {
//     uid: receiveMsg.sender,
//     nickname: res.data.nickname,
//     avatar: res.data.avatar,
//     message: receiveMsg.message,
//     createdAt: receiveMsg.createdAt,
//     type: 'message',
//     isHideTime: false,
//     isHideNicknameAndAvatar: isHide(message, receiveMsg),
//   },
// ]);
export default MessageStore;
