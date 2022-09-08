import { useEffect } from 'react';
import roomSocket from '../adapters/roomSocket';
import { history } from './useHistory';
import connectedUsersStore from '../stores/room/connectedUsersStore';
import { useCreateMediaStream } from './useCreateMediaStream';
// import usePreventLeave from './usePreventLeave';
import messageStore from '../stores/room/messagesStore';
import userPcStore from '../stores/room/userPcStore';

export default function usePopHistory(roomId: string) {
  const { setUsers } = connectedUsersStore();
  const { stopMediaStream } = useCreateMediaStream();
  // const { enablePrevent, disablePrevent } = usePreventLeave();
  const { setMessages } = messageStore();
  const { emptyPc } = userPcStore();

  useEffect(() => {
    // enablePrevent();
    const unListenHistory = history.listen(({ action }) => {
      if (action === 'POP') {
        setTimeout(() => {
          roomSocket.socket.emit('leaveRoom', roomId);
          stopMediaStream();
          setMessages([]);
          setUsers([]);
          emptyPc();
        }, 100);
      }
    });
    return unListenHistory;
    // return disablePrevent && unListenHistory;
  }, [history]);
}
