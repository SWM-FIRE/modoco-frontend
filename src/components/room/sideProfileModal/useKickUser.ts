import React from 'react';
import roomSocket from '../../../adapters/roomSocket';
import connectedUsersStore from '../../../stores/room/connectedUsersStore';

const useKickUser = ({
  roomId,
  targetUid,
}: {
  roomId: string;
  targetUid: number;
}) => {
  const newSocket = roomSocket.socket;
  const { findUserByUid } = connectedUsersStore();

  const kickUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const targetSid = findUserByUid(targetUid)?.sid;
    const userToKick = {
      uid: targetUid,
      sid: targetSid,
    };
    newSocket.emit('kickUser', { room: roomId, userToKick });
    console.log('kicked user');
  };
  return { kickUser };
};

export default useKickUser;
