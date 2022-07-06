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

  /**
   * @brief 최초 useStartPeerSession시
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

  /**
   * @brief screenShare 멈춰!
   * 1. 내가 video 공유를 진행 하고 있는 애들 납치
   * 2. 모든 senders에 대해 track 변경
   * 3. 내 모든 track stop
   */
  const cancelScreenSharing = async () => {
    const senders = await peerVideoConnection.senders.filter(
      (sender) => sender.track.kind === 'video',
    );

    if (senders) {
      senders.forEach((sender) =>
        sender.replaceTrack(
          // console.log로 뭐하는 놈인지 확인필요
          userMediaStream.getTracks().find((track) => track.kind === 'video'),
        ),
      );
    }

    // 필요?
    if (localVideoRef?.current) {
      localVideoRef.current.srcObject = userMediaStream;
    }
    if (displayMediaStream) {
      displayMediaStream.getTracks().forEach((track) => track.stop());
    }
    setDisplayMediaStream(undefined);
  };

  /**
   * @breif screenShare 해!
   * 1. 나 공유하고 있니?
   * 2. 보내야 되는 애들 확인 후 video로 보낼거라고 알려줌
   * 3. 비디오 보낼거라도 트랙 변경
   * 4. ended 라면 cancel 하게 EventListner 설정
   */
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
    shareScreen,
    cancelScreenSharing,
    peerVideoConnection,
    isScreenShared: !!displayMediaStream,
  };
};
