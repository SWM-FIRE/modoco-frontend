import { useEffect } from 'react';
import roomSocket from '../adapters/roomSocket';
import { history } from './useHistory';
import connectedUsersStore from '../stores/connectedUsersStore';
import { useCreateMediaStream } from './useCreateMediaStream';
import usePreventLeave from './usePreventLeave';
import messageStore from '../stores/messagesStore';

export default function usePopHistory(roomId: string) {
  const { setUsers } = connectedUsersStore();
  const { stopMediaStream } = useCreateMediaStream();
  const { enablePrevent, disablePrevent } = usePreventLeave();
  const { setMessages } = messageStore();

  useEffect(() => {
    enablePrevent();
    const unListenHistory = history.listen(({ action }) => {
      if (action === 'POP') {
        console.log('popping');
        setTimeout(() => {
          roomSocket.emit('leaveRoom', roomId);
          stopMediaStream();
          setMessages([]);
          setUsers([]);
        }, 100);
      }
    });
    return disablePrevent && unListenHistory;
  }, [history]);
}
