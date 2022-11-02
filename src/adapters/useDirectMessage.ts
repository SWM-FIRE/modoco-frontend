import { useEffect } from 'react';
import directMessageStore from 'src/stores/directMessageStore';
import userStore from 'src/stores/userStore';
import friendSocket, {
  generateFriend,
  syncFriend,
  recvDirectMessage,
} from './friendSocket';

const useDirectMessage = () => {
  const { uid, isLogin } = userStore();
  const { setMessages, messages } = directMessageStore();

  useEffect(() => {
    generateFriend();
    syncFriend(setMessages);
    return () => {
      friendSocket.socket?.off('friend:sync-all');
    };
  }, [setMessages, uid, isLogin]);

  useEffect(() => {
    recvDirectMessage(setMessages, uid, messages);
    return () => {
      friendSocket.socket?.off('directMessage');
    };
  }, [setMessages, uid, messages]);
};

export default useDirectMessage;
