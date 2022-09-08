import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as LeftArrow } from '../../assets/svg/arrow-left.svg';
import connectedUsersStore from '../../stores/room/connectedUsersStore';
import MyAvatar from '../../assets/avatar/MyAvatar';
import userStore from '../../stores/userStore';
import userMediaStreamStore from '../../stores/room/userMediaStreamStore';
import roomModalStore from '../../stores/room/roomModalStore';
import findStream from './findStream';

export default function ScreenModal() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { uid, avatar, nickname } = userStore();
  const { screenUid, toggleScreenModal, sidebarModal } = roomModalStore();
  const { userMediaStream } = userMediaStreamStore();
  const { connectedUsers, userStream, findUserByUid } = connectedUsersStore();

  const user = findUserByUid(screenUid);
  const isMe = uid === screenUid;
  const newStream = isMe
    ? userMediaStream
    : findStream({ sid: user.socketId, connectedUsers, userStream });
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = newStream;
    }
  }, [videoRef, userMediaStream]);

  return (
    <ModalBox isOpen={sidebarModal}>
      <ModalController>
        <ArrowBox onClick={toggleScreenModal}>
          <LeftArrow />
        </ArrowBox>
        {isMe ? (
          <>
            <MyAvatar num={avatar} />
            <Nickname>{nickname}</Nickname>
          </>
        ) : (
          <>
            <MyAvatar num={Number(user.avatar)} />
            <Nickname>{user.nickname}</Nickname>
          </>
        )}
      </ModalController>
      {isMe ? (
        <ModalVideo ref={videoRef} autoPlay playsInline muted />
      ) : (
        <ModalVideo ref={videoRef} autoPlay playsInline />
      )}
    </ModalBox>
  );
}

const ModalVideo = styled.video`
  margin-top: 1.6rem;
  width: calc(100% - 1.43rem);
  overflow-y: auto;
`;

const Nickname = styled.div`
  font-family: IBMPlexSansKRRegular;
  font-weight: 400;
  font-size: 16px;
  align-self: center;
  color: #f8fafc;
`;

const ModalController = styled.div`
  svg {
    height: 100%;
    width: 3.2rem;
  }
  height: 3.2rem;
  display: flex;
  flex-direction: center;
  margin-top: 3.2rem;
  gap: 1rem;
`;

const ArrowBox = styled.div`
  cursor: pointer;
`;

const ModalBox = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 12rem;
  left: 4rem;
  width: ${(props) =>
    props.isOpen ? 'calc(100% - 45rem)' : 'calc(90% - 5rem)'};
  max-height: calc(100% - 14rem);
  background-color: #0d0e13;
  padding-left: 1.43rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  z-index: 2;
  padding-bottom: 2rem;
`;
