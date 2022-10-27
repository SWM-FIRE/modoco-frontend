import { useEffect } from 'react';
import directMessageStore from 'src/stores/directMessageStore';
import { syncFriend, recvDirectMessage } from './friendSocket';

const useDirectMessage = () => {
  const { setMessages, appendMessage } = directMessageStore();

  useEffect(() => {
    syncFriend(setMessages);
    recvDirectMessage(appendMessage);
  }, [appendMessage, setMessages]);
};

export default useDirectMessage;
