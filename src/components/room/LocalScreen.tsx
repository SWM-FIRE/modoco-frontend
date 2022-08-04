import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import MyAvatar from '../../assets/avatar/MyAvatar';
import UserStore from '../../stores/userStore';
import controlModal from '../../stores/controlModal';
import { useCreateMediaStream } from '../../hooks/useCreateMediaStream';
import messageStore from '../../stores/messagesStore';

export default function LocalScreen() {
  const { nickname, avatar, uid } = UserStore();
  const { messages } = messageStore();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const { userMediaStream } = useCreateMediaStream();
  const { toggleModal, setNickname, setAvatar, setUid } = controlModal();

  const videoRef = useRef<HTMLVideoElement>(null);
  const OpenModal = () => {
    setNickname(nickname);
    setAvatar(avatar);
    setUid(uid);
    toggleModal();
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = userMediaStream;
    }
  }, [videoRef, userMediaStream]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 250);
    return () => clearInterval(timer);
  }, []);

  const newMessages = messages.filter(
    (message) =>
      message.uid === uid &&
      new Date(message.createdAt).getTime() > currentTime.getTime() - 5000,
  );
  return (
    <Container onClick={OpenModal}>
      <Video ref={videoRef} autoPlay playsInline muted />
      <ControlBar>
        <ChatContainer>
          <ChatInner>
            {newMessages.map((message) => (
              <Chats key={message.createdAt}>{message.message}</Chats>
            ))}
          </ChatInner>
        </ChatContainer>
        <AvatarPosition>
          <MyAvatar num={Number(avatar)} />
          <NameContainer>{nickname}</NameContainer>
        </AvatarPosition>
      </ControlBar>
    </Container>
  );
}

const Container = styled.div`
  background-color: #4a4a4a;
  cursor: pointer;
  display: flex;
  justify-content: center;
  @media (max-width: 900px) {
    width: 90%;
    height: 0;
    padding-bottom: 60%;
  }
  width: 48%;
  height: 0;
  border-radius: 1rem;
  padding-bottom: 28%;
  position: relative;
`;

const ControlBar = styled.div`
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChatInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0;
  gap: 1rem;
`;

const ChatContainer = styled.div`
  width: calc(100% - 3rem);
  height: calc(95% - 3rem);
  position: absolute;
  bottom: calc(5% + 3rem);
  overflow: hidden;
  margin-left: 1.2rem;
`;

const Chats = styled.div`
  align-self: flex-start;
  padding: 1.6rem;
  background-color: rgba(53, 69, 122, 0.8);
  font-family: IBMPlexSansKRRegular;
  font-weight: 400;
  border-radius: 0.8rem;
  font-size: 15px;
  line-height: 22px;
  color: #ffffff;
`;

const NameContainer = styled.div`
  padding: 1%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-family: IBMPlexSansKRRegular;
  color: #f9fafb;
`;

const AvatarPosition = styled.div`
  bottom: calc(-5% - 3rem);
  height: calc(10% + 6rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  position: absolute;
  svg {
    height: 100%;
  }
`;

const Video = styled.video`
  z-index: 0;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  position: absolute;
`;
