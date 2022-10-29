import { useEffect } from 'react';
import directMessageStore from 'src/stores/directMessageStore';
import userStore from 'src/stores/userStore';
import friendSocket, { generateFriend, syncFriend } from './friendSocket';

const useDirectMessage = () => {
  const { setMessages } = directMessageStore();
  const { uid, isLogin } = userStore();

  useEffect(() => {
    generateFriend();
    syncFriend(setMessages);
    return () => {
      friendSocket.socket?.off('friend:sync-all');
    };
  }, [setMessages, uid, isLogin]);
};

export default useDirectMessage;
