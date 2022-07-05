/* eslint-disable no-param-reassign */
import { RefObject, useEffect, useMemo, useState } from 'react';
import { createPeerConnectionContext } from '../components/PeerConnectionSession';

export const useStartPeerSession = (
  room: string,
  userMediaStream: MediaStream,
  localVideoRef: RefObject<HTMLVideoElement>,
) => {
  /**
   * @peerVideoConnection 1회 PeerConnection 생성
   * @displayMediaStream 내 mediaStream
   * @connectedUsers 접속중인 유저 목록
   */
  const peerVideoConnection = useMemo(() => createPeerConnectionContext(), []);
  const [displayMediaStream, setDisplayMediaStream] = useState<MediaStream>();
  const [connectedUsers, setConnectedUsers] = useState([]);

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

  const cancelScreenSharing = async () => {
    const senders = await peerVideoConnection.senders.filter(
      (sender) => sender.track.kind === 'video',
    );

    if (senders) {
      senders.forEach((sender) =>
        sender.replaceTrack(
          userMediaStream.getTracks().find((track) => track.kind === 'video'),
        ),
      );
    }

    if (localVideoRef?.current) {
      localVideoRef.current.srcObject = userMediaStream;
    }
    if (displayMediaStream) {
      displayMediaStream.getTracks().forEach((track) => track.stop());
    }
    setDisplayMediaStream(undefined);
  };

  const shareScreen = async () => {
    const stream =
      displayMediaStream || (await navigator.mediaDevices.getDisplayMedia());

    const senders = await peerVideoConnection.senders.filter(
      (sender) => sender.track.kind === 'video',
    );

    if (senders) {
      senders.forEach((sender) => sender.replaceTrack(stream.getTracks()[0]));
    }

    stream.getVideoTracks()[0].addEventListener('ended', () => {
      cancelScreenSharing();
      // cancelScreenSharing(stream);
    });

    if (localVideoRef?.current) {
      localVideoRef.current.srcObject = stream;
    }

    setDisplayMediaStream(stream);
  };

  return {
    connectedUsers,
    peerVideoConnection,
    shareScreen,
    cancelScreenSharing,
    isScreenShared: !!displayMediaStream,
  };
};
