/* eslint-disable no-param-reassign */
import { useEffect, useMemo, useState } from 'react';
import { createPeerConnectionContext } from '../components/PeerConnectionSession';

export const useStartPeerSession = (
  room: string,
  userMediaStream: MediaStream,
) => {
  /**
   * @peerVideoConnection 1회 PeerConnection 생성
   * @displayMediaStream 내 mediaStream
   * @connectedUsers 접속중인 유저 목록
   */

  const peerVideoConnection = useMemo(() => createPeerConnectionContext(), []);
  const [connectedUsers, setConnectedUsers] = useState([]);

  /**
   * @brief 최초 useStartPeerSession시 useEffect
   * @joinRoom
   * @onAddUser -> @setConnectedUsers 추가 -> @addPeerConnection -> @callUser
   * @onRemoveUser -> @setConnectedUsers 삭제 -> @removePeerConnection
   * @onUpdateUserList -> @setConnectedUsers유지 -> user마다 @addPeerConnection
   * @onAnswerMade -> @callUser
   * @return -> mediaStream 삭제하며 disconnect
   *
   */
  useEffect(() => {
    if (userMediaStream) {
      peerVideoConnection.joinRoom(room);

      peerVideoConnection.onAddUser((user: string) => {
        setConnectedUsers((users) => [...users, user]);
        peerVideoConnection.addPeerConnection(
          user,
          userMediaStream,
          (_stream: MediaStream) => {
            if (user) {
              const box = <HTMLVideoElement>document.getElementById(user);
              box.srcObject = _stream;
            }
          },
        );
        peerVideoConnection.callUser(user);
      });

      peerVideoConnection.onRemoveUser((socketId: string) => {
        setConnectedUsers((users) => users.filter((user) => user !== socketId));
        peerVideoConnection.removePeerConnection(socketId);
      });

      peerVideoConnection.onUpdateUserList(async (users) => {
        setConnectedUsers(users);
        users.forEach((user: string) => {
          peerVideoConnection.addPeerConnection(
            `${user}`,
            userMediaStream,
            (_stream) => {
              if (user) {
                const box = <HTMLVideoElement>document.getElementById(user);
                box.srcObject = _stream;
              }
            },
          );
        });
      });

      peerVideoConnection.onAnswerMade((socket) =>
        peerVideoConnection.callUser(socket),
      );
      console.log(peerVideoConnection);
    }

    return () => {
      if (userMediaStream) {
        peerVideoConnection.clearConnections();
        userMediaStream?.getTracks()?.forEach((track) => track.stop());
      }
    };
  }, [peerVideoConnection, room, userMediaStream]);

  return {
    connectedUsers,
    peerVideoConnection,
  };
};
