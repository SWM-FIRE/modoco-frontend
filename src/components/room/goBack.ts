import { useEffect } from 'react';
import roomSocket from '../../adapters/roomSocket';
import { history } from '../../hooks/useHistory';
import connectedUsersStore from '../../stores/connectedUsersStore';
import { useCreateMediaStream } from '../../hooks/useCreateMediaStream';
import usePreventLeave from '../../hooks/usePreventLeave';
import messageStore from '../../stores/messagesStore';

export default function goBack(roomId: string) {
  const { setUsers } = connectedUsersStore();
  const { stopMediaStream } = useCreateMediaStream();
  const { enablePrevent, disablePrevent } = usePreventLeave();
  const { setMessages } = messageStore();

  useEffect(() => {
    enablePrevent();
    const unlistenHistoryEvent = history.listen(({ action }) => {
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
    return disablePrevent && unlistenHistoryEvent;
  }, [history]);
}
