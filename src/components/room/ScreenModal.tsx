import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import ModalPortal from '../atoms/ModalPotal';
import { ReactComponent as LeftArrow } from '../../assets/svg/arrow-left.svg';
import controlModal from '../../stores/controlModal';
import MyAvatar from '../../assets/avatar/MyAvatar';
import { useCreateMediaStream } from '../../hooks/useCreateMediaStream';
import connectedUsersStore from '../../stores/connectedUsersStore';

export default function ScreenModal() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { connectedUsers } = connectedUsersStore();
  const { uid, nickname, avatar, toggleModal } = controlModal();
  const { userMediaStream } = useCreateMediaStream();
  const newStream =
    uid === localStorage.getItem('uid')
      ? userMediaStream
      : connectedUsers.filter((user) => user.uid === uid)[0].stream;
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = newStream;
    }
  }, [videoRef, userMediaStream]);

  return (
    <ModalPortal>
      <ModalBox>
        <ModalController>
          <ArrowBox onClick={toggleModal}>
            <LeftArrow />
          </ArrowBox>
          <MyAvatar num={Number(avatar)} />
          <Nickname>{nickname}</Nickname>
        </ModalController>
        <ModalVideo ref={videoRef} autoPlay playsInline />
      </ModalBox>
    </ModalPortal>
  );
}

const ModalVideo = styled.video`
  margin-top: 1.6rem;
  width: calc(100% - 1.43rem);
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

const ModalBox = styled.div`
  position: fixed;
  top: 12rem;
  left: 4rem;
  width: calc(100% - 50rem);
  height: calc(100% - 14rem);
  background-color: #0d0e13;
  padding-left: 1.43rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  overflow: auto;
  z-index: 999;
`;
