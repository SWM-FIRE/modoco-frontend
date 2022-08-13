import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import ModalPortal from '../atoms/ModalPortal';
import { ReactComponent as LeftArrow } from '../../assets/svg/arrow-left.svg';
import controlModal from '../../stores/controlModal';
import MyAvatar from '../../assets/avatar/MyAvatar';
import userStore from '../../stores/userStore';
import userMediaStreamStore from '../../stores/userMediaStreamStore';
import connectedUsersStore from '../../stores/connectedUsersStore';
import findStream from './findStream';
import controlSidebar from '../../stores/controlSidebar';

export default function ScreenModal() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { uid: myUid } = userStore();
  const { sid, uid, nickname, avatar, toggleModal } = controlModal();
  const { userMediaStream } = userMediaStreamStore();
  const { connectedUsers, userStream } = connectedUsersStore();
  const { isOpenSidebar } = controlSidebar();

  const newStream =
    myUid === uid
      ? userMediaStream
      : findStream({ sid, connectedUsers, userStream });
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = newStream;
    }
  }, [videoRef, userMediaStream]);

  return (
    <ModalPortal>
      <ModalBox isOpen={isOpenSidebar}>
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
  overflow: auto;
  z-index: 999;
`;
