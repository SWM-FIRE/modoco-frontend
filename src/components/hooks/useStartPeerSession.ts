/* eslint-disable no-param-reassign */
import { useEffect, useMemo, useState } from 'react';
import { createPeerConnectionContext } from '../room/rtc/PeerConnectionSession';
import peerSessionInterface from '../../interface/useStartPeerSession.interface';

export const useStartPeerSession = ({
  room,
  userMediaStream,
  localVideoRef,
}: peerSessionInterface) => {
  const peerVideoConnection: any = useMemo(
    () => createPeerConnectionContext(),
    [],
  );

  const [displayMediaStream, setDisplayMediaStream] = useState<MediaStream>();
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    if (userMediaStream) {
      peerVideoConnection.joinRoom(room);
      peerVideoConnection.onAddUser((user: any) => {
        setConnectedUsers((users: any): any => [...users, user]);
        peerVideoConnection.addPeerConnection(
          `${user}`,
          userMediaStream,
          (_stream: any) => {
            if (user) {
              const box = <HTMLVideoElement>document.getElementById(user);
              box.srcObject = _stream;
              // document.getElementById(user).srcObject = _stream;
            }
          },
        );
        peerVideoConnection.callUser(user);
      });

      peerVideoConnection.onRemoveUser((socketId: string) => {
        setConnectedUsers((users) => users.filter((user) => user !== socketId));
        peerVideoConnection.removePeerConnection(socketId);
      });

      peerVideoConnection.onUpdateUserList(async (users: any) => {
        setConnectedUsers(users);
        users.forEach((user: any) => {
          peerVideoConnection.addPeerConnection(
            `${user}`,
            userMediaStream,
            (_stream: any) => {
              if (user) {
                const box = <HTMLVideoElement>document.getElementById(user);
                box.srcObject = _stream;
              }
            },
          );
        });
      });

      peerVideoConnection.onAnswerMade((socket: any) =>
        peerVideoConnection.callUser(socket),
      );
    }

    return () => {
      if (userMediaStream) {
        peerVideoConnection.clearConnections();
        userMediaStream?.getTracks()?.forEach((track: any) => track.stop());
      }
    };
  }, [peerVideoConnection, room, userMediaStream]);

  const cancelScreenSharing = async () => {
    const senders = await peerVideoConnection.senders.filter(
      (sender: any) => sender.track.kind === 'video',
    );

    if (senders) {
      senders.forEach((sender: any) =>
        sender.replaceTrack(
          userMediaStream
            .getTracks()
            .find((track: any) => track.kind === 'video'),
        ),
      );
    }

    if (localVideoRef?.current) {
      localVideoRef.current.srcObject = userMediaStream;
    }
    if (displayMediaStream) {
      displayMediaStream.getTracks().forEach((track: any) => track.stop());
    }
    setDisplayMediaStream(undefined);
  };

  const shareScreen = async () => {
    const stream =
      displayMediaStream || (await navigator.mediaDevices.getDisplayMedia());

    const senders = await peerVideoConnection.senders.filter(
      (sender: any) => sender.track.kind === 'video',
    );

    if (senders) {
      senders.forEach((sender: any) =>
        sender.replaceTrack(stream.getTracks()[0]),
      );
    }

    stream.getVideoTracks()[0].addEventListener('ended', () => {
      cancelScreenSharing();
      // cancelScreenSharing(stream);
    });

    if (localVideoRef?.current) {
      // eslint-disable-next-line no-param-reassign
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
