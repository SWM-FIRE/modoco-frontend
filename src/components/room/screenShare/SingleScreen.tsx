import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import MyAvatar from '../../../assets/avatar/MyAvatar';
import controlModal from '../../../stores/controlModal';
import messageStore from '../../../stores/messagesStore';

export default function SingleScreen({ connectedUser, stream }) {
  const { messages } = messageStore();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const { toggleModal, setNickname, setAvatar, setUid, setSid } =
    controlModal();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const OpenModal = () => {
    setNickname(connectedUser.nickname);
    setAvatar(connectedUser.avatar);
    setUid(connectedUser.uid);
    setSid(connectedUser.socketId);
    toggleModal();
  };

  useEffect(() => {
    console.log('stream is ', stream);
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, videoRef]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 250);
    return () => clearInterval(timer);
  }, []);

  const newMessages = messages.filter(
    (message) =>
      message.uid === connectedUser.uid &&
      new Date(message.createdAt).getTime() > currentTime.getTime() - 5000,
  );

  return (
    <Container onClick={OpenModal}>
      <Video ref={videoRef} autoPlay playsInline />
      <ControlBar>
        <ChatContainer>
          <ChatInner>
            {newMessages.map((message) => (
              <Chats key={message.createdAt}>{message.message}</Chats>
            ))}
          </ChatInner>
        </ChatContainer>
        <AvatarPosition>
          <AvatarSize>
            <MyAvatar num={Number(connectedUser.avatar)} />
          </AvatarSize>
          <NameContainer>{connectedUser.nickname}</NameContainer>
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
  font-size: 1.6rem;
  font-family: IBMPlexSansKRRegular;
  color: #f9fafb;
`;

const AvatarPosition = styled.div`
  width: 100%;
  position: absolute;
  bottom: calc(-5% - 8rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
`;

const Video = styled.video`
  z-index: 0;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  position: absolute;
`;

const AvatarSize = styled.div`
  height: calc(10% + 6rem);
  svg {
    height: 100%;
  }
`;
